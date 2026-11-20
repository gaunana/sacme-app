'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Heart,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Palette,
  ShoppingBag,
  Crown,
  Gem,
  Sun,
  Snowflake,
  Flower2,
  Leaf,
  Search,
  SlidersHorizontal,
  Camera,
  Upload,
  VideoOff,
  Pipette,
  Eye,
  PlusCircle,
} from 'lucide-react';
import {
  SURVEY_QUESTIONS,
  SEASON_PROFILES,
  SeasonKey,
} from './data';

const SEASON_ICONS: Record<SeasonKey, React.ReactNode> = {
  spring: <Flower2 className="w-5 h-5 text-rose-500" />,
  summer: <Sun className="w-5 h-5 text-pink-400" />,
  autumn: <Leaf className="w-5 h-5 text-amber-600" />,
  winter: <Snowflake className="w-5 h-5 text-fuchsia-600" />,
};

interface SampledSkinInfo {
  hex: string;
  r: number;
  g: number;
  b: number;
  warmthScore: number; // dương: ấm, âm: lạnh
  luminance: number; // 0 - 255
  suggestedSeason: SeasonKey;
  toneLabel: string;
  undertoneLabel: string;
  xPercent: number;
  yPercent: number;
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)]
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

function analyzeSkinRgb(
  r: number,
  g: number,
  b: number,
  xPercent = 50,
  yPercent = 48
): SampledSkinInfo {
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  // Chỉ số sắc ấm/lạnh ước lượng: đỏ + vàng cao hơn xanh dương thường thiên ấm
  const warmthScore = (r - b) * 0.75 + (r - g) * 0.45;

  let suggestedSeason: SeasonKey = 'spring';
  if (warmthScore >= 12) {
    suggestedSeason = luminance >= 158 ? 'spring' : 'autumn';
  } else {
    suggestedSeason = luminance >= 158 ? 'summer' : 'winter';
  }

  let toneLabel = 'Da sáng tự nhiên';
  if (luminance >= 182) toneLabel = 'Da trắng sáng';
  else if (luminance >= 155) toneLabel = 'Da sáng vừa';
  else if (luminance >= 125) toneLabel = 'Da trung bình / mật ong';
  else toneLabel = 'Da ngăm / trầm ấm';

  let undertoneLabel = 'Trung tính cân bằng';
  if (warmthScore >= 22) undertoneLabel = 'Undertone Ấm rõ nét';
  else if (warmthScore >= 8) undertoneLabel = 'Undertone Ấm dịu';
  else if (warmthScore <= -6) undertoneLabel = 'Undertone Lạnh rõ nét';
  else undertoneLabel = 'Undertone Lạnh dịu';

  return {
    hex: rgbToHex(r, g, b),
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
    warmthScore: Math.round(warmthScore),
    luminance: Math.round(luminance),
    suggestedSeason,
    toneLabel,
    undertoneLabel,
    xPercent,
    yPercent,
  };
}

export default function SacmeApp() {
  const [step, setStep] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedSeasonOverride, setSelectedSeasonOverride] = useState<SeasonKey | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Photo & Camera states
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [sampledSkin, setSampledSkin] = useState<SampledSkinInfo | null>(null);
  const [drapeColor, setDrapeColor] = useState<string>('#F7A8B8');
  const [photoBonusApplied, setPhotoBonusApplied] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const photoImageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const startCamera = async () => {
    setCameraError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(
        'Trình duyệt hoặc môi trường hiện tại chưa hỗ trợ camera trực tiếp. Bạn hãy bấm "Tải ảnh khuôn mặt" để chọn ảnh từ máy nhé!'
      );
      return;
    }

    try {
      setIsCameraOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 720 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      }, 60);
    } catch {
      setIsCameraOpen(false);
      setCameraError(
        'Không thể truy cập camera (có thể do chưa cấp quyền camera hoặc thiết bị không có webcam). Bạn có thể dùng nút "Tải ảnh khuôn mặt" bên cạnh!'
      );
    }
  };

  const sampleSkinAtPercent = useCallback((xPct: number, yPct: number) => {
    const img = photoImageRef.current;
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const offscreen = document.createElement('canvas');
    offscreen.width = img.naturalWidth;
    offscreen.height = img.naturalHeight;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);
    const centerX = Math.max(
      0,
      Math.min(offscreen.width - 1, Math.round((xPct / 100) * offscreen.width))
    );
    const centerY = Math.max(
      0,
      Math.min(offscreen.height - 1, Math.round((yPct / 100) * offscreen.height))
    );

    const radius = Math.max(
      4,
      Math.round(Math.min(offscreen.width, offscreen.height) * 0.025)
    );
    const x0 = Math.max(0, centerX - radius);
    const y0 = Math.max(0, centerY - radius);
    const w = Math.min(offscreen.width - x0, radius * 2);
    const h = Math.min(offscreen.height - y0, radius * 2);

    const imageData = ctx.getImageData(x0, y0, w, h).data;
    let sumR = 0;
    let sumG = 0;
    let sumB = 0;
    let count = 0;

    for (let i = 0; i < imageData.length; i += 4) {
      sumR += imageData[i];
      sumG += imageData[i + 1];
      sumB += imageData[i + 2];
      count++;
    }

    if (count > 0) {
      const info = analyzeSkinRgb(sumR / count, sumG / count, sumB / count, xPct, yPct);
      setSampledSkin(info);
    }
  }, []);

  const capturePhotoFromVideo = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const w = video.videoWidth || 640;
    const h = video.videoHeight || 640;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Lật ngang ảnh cho giống gương selfie tự nhiên
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, w, h);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedPhoto(dataUrl);
    setPhotoBonusApplied(false);
    stopCamera();

    setTimeout(() => {
      sampleSkinAtPercent(46, 54);
    }, 120);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    stopCamera();

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCapturedPhoto(reader.result);
        setPhotoBonusApplied(false);
        setTimeout(() => {
          sampleSkinAtPercent(48, 52);
        }, 150);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageClickToSample = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    sampleSkinAtPercent(xPct, yPct);
  };

  const handleSelectOption = (optionIndex: number) => {
    const questionId = SURVEY_QUESTIONS[currentQuestionIdx].id;
    const updatedAnswers = { ...answers, [questionId]: optionIndex };
    setAnswers(updatedAnswers);

    if (currentQuestionIdx < SURVEY_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIdx((prev) => prev + 1);
      }, 180);
    } else {
      setTimeout(() => {
        setSelectedSeasonOverride(null);
        setSelectedCategory('Tất cả');
        setSearchQuery('');
        setStep('result');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 220);
    }
  };

  const calculatedResult = useMemo(() => {
    const totals: Record<SeasonKey, number> = {
      spring: 0,
      summer: 0,
      autumn: 0,
      winter: 0,
    };

    SURVEY_QUESTIONS.forEach((q) => {
      const chosenIdx = answers[q.id];
      if (chosenIdx !== undefined && q.options[chosenIdx]) {
        const scores = q.options[chosenIdx].scores;
        totals.spring += scores.spring;
        totals.summer += scores.summer;
        totals.autumn += scores.autumn;
        totals.winter += scores.winter;
      }
    });

    if (photoBonusApplied && sampledSkin) {
      totals[sampledSkin.suggestedSeason] += 6;
    }

    const sorted = (Object.keys(totals) as SeasonKey[]).sort(
      (a, b) => totals[b] - totals[a]
    );
    const totalPoints =
      totals.spring + totals.summer + totals.autumn + totals.winter || 1;

    return {
      primary: sorted[0],
      secondary: sorted[1],
      totals,
      percentages: {
        spring: Math.round((totals.spring / totalPoints) * 100),
        summer: Math.round((totals.summer / totalPoints) * 100),
        autumn: Math.round((totals.autumn / totalPoints) * 100),
        winter: Math.round((totals.winter / totalPoints) * 100),
      },
    };
  }, [answers, photoBonusApplied, sampledSkin]);

  const activeSeasonKey =
    selectedSeasonOverride ||
    (Object.keys(answers).length > 0 || photoBonusApplied
      ? calculatedResult.primary
      : sampledSkin?.suggestedSeason || 'spring');

  const activeProfile = SEASON_PROFILES[activeSeasonKey];

  useEffect(() => {
    if (activeProfile.palette[0]) {
      setDrapeColor(activeProfile.palette[0]);
    }
  }, [activeProfile]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(activeProfile.products.map((p) => p.category)));
    return ['Tất cả', ...cats];
  }, [activeProfile]);

  const filteredProducts = useMemo(() => {
    return activeProfile.products.filter((product) => {
      const matchCat =
        selectedCategory === 'Tất cả' || product.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.shade.toLowerCase().includes(q) ||
        product.note.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeProfile, selectedCategory, searchQuery]);

  const totalProductsAllSeasons = useMemo(() => {
    return (Object.keys(SEASON_PROFILES) as SeasonKey[]).reduce(
      (sum, key) => sum + SEASON_PROFILES[key].products.length,
      0
    );
  }, []);

  const resetQuiz = () => {
    stopCamera();
    setAnswers({});
    setCurrentQuestionIdx(0);
    setSelectedSeasonOverride(null);
    setSelectedCategory('Tất cả');
    setSearchQuery('');
    setPhotoBonusApplied(false);
    setStep('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPercent = Math.round(
    ((currentQuestionIdx + 1) / SURVEY_QUESTIONS.length) * 100
  );

  const renderFacePhotoStudio = (compact = false) => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-pink-100 shadow-md shadow-pink-100/50 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 mb-1">
            <Camera className="w-4 h-4" />
            Studio Chụp Mặt &amp; Ướm Bảng Màu Trực Tiếp
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#3D1E28]">
            Phân Tích Sắc Tố Da Từ Ảnh &amp; Thử Màu Lên Khuôn Mặt
          </h2>
          <p className="text-xs sm:text-sm text-[#7A5260]">
            Chụp ảnh selfie hoặc tải ảnh lên, bấm vào vùng da trên ảnh để lấy mẫu sắc độ và ướm thử từng màu sắc quanh khuôn mặt.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isCameraOpen ? (
            <button
              type="button"
              onClick={startCamera}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#EC407A] to-[#D81B60] hover:from-[#D81B60] hover:to-[#C2185B] text-white text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              Chụp ảnh mặt
            </button>
          ) : (
            <button
              type="button"
              onClick={stopCamera}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs sm:text-sm font-semibold transition cursor-pointer"
            >
              <VideoOff className="w-4 h-4" />
              Tắt camera
            </button>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Tải ảnh lên
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {cameraError && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-700">
          {cameraError}
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <div className={`grid grid-cols-1 ${compact ? 'lg:grid-cols-12' : 'md:grid-cols-12'} gap-6 items-center`}>
        {/* Left: Camera / Draping Preview */}
        <div className={`${compact ? 'lg:col-span-5' : 'md:col-span-6'} flex flex-col items-center`}>
          {isCameraOpen ? (
            <div className="w-full max-w-sm space-y-3">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-pink-950/5 border-2 border-pink-200 shadow-inner">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover -scale-x-100"
                />
                {/* Khung căn chỉnh mặt oval */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="w-44 h-56 sm:w-52 sm:h-64 rounded-full border-2 border-dashed border-white/90 shadow-[0_0_0_9999px_rgba(61,30,40,0.22)]" />
                </div>
                <div className="pointer-events-none absolute bottom-3 inset-x-3 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-black/55 text-white text-[11px]">
                    Đặt khuôn mặt vào khung oval dưới ánh sáng tự nhiên
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={capturePhotoFromVideo}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#EC407A] to-[#D81B60] hover:from-[#D81B60] hover:to-[#C2185B] text-white font-semibold text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Chụp bức ảnh này
              </button>
            </div>
          ) : capturedPhoto ? (
            <div className="w-full max-w-sm space-y-3">
              {/* Khung ướm màu Draping trực tiếp quanh khuôn mặt */}
              <div
                onClick={handleImageClickToSample}
                title="Bấm vào vùng da má hoặc trán để lấy mẫu sắc tố da"
                className="relative aspect-square rounded-[2rem] overflow-hidden cursor-crosshair transition-all duration-300 shadow-lg"
                style={{
                  padding: '18px',
                  backgroundColor: drapeColor,
                }}
              >
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-white shadow-inner">
                  <img
                    ref={photoImageRef}
                    src={capturedPhoto}
                    alt="Ảnh khuôn mặt phân tích sắc tố"
                    onLoad={() => {
                      if (!sampledSkin) {
                        sampleSkinAtPercent(48, 52);
                      }
                    }}
                    className="w-full h-full object-cover select-none"
                  />
                  {sampledSkin && (
                    <div
                      className="pointer-events-none absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md ring-2 ring-pink-500/70"
                      style={{
                        left: `${sampledSkin.xPercent}%`,
                        top: `${sampledSkin.yPercent}%`,
                        backgroundColor: sampledSkin.hex,
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-pink-600 px-1">
                <span className="inline-flex items-center gap-1">
                  <Pipette className="w-3.5 h-3.5" />
                  Chạm vào vùng da trên ảnh để đổi điểm lấy mẫu
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCapturedPhoto(null);
                    setSampledSkin(null);
                    setPhotoBonusApplied(false);
                  }}
                  className="underline hover:text-pink-800 cursor-pointer"
                >
                  Đổi ảnh khác
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full max-w-sm aspect-square rounded-3xl border-2 border-dashed border-pink-200 bg-pink-50/50 hover:bg-pink-50 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-pink-100 flex items-center justify-center shadow-xs mb-3 group-hover:scale-105 transition">
                <Eye className="w-7 h-7 text-pink-500" />
              </div>
              <p className="text-sm font-bold text-[#3D1E28] mb-1">
                Chưa có ảnh khuôn mặt nào
              </p>
              <p className="text-xs text-[#7A5260] max-w-[230px] leading-relaxed">
                Bấm <strong>Chụp ảnh mặt</strong> để dùng webcam hoặc bấm vào đây để chọn ảnh chân dung từ máy tính.
              </p>
            </div>
          )}
        </div>

        {/* Right: Skin Analysis & Color Draping Controls */}
        <div className={`${compact ? 'lg:col-span-7' : 'md:col-span-6'} space-y-4`}>
          {sampledSkin ? (
            <div className="bg-gradient-to-br from-[#FFF6F9] to-[#FCE4EC]/60 rounded-2xl p-4 sm:p-5 border border-pink-100 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="w-11 h-11 rounded-2xl border-2 border-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: sampledSkin.hex }}
                  />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-pink-500">
                      Sắc tố da vừa đo ({sampledSkin.hex})
                    </div>
                    <div className="text-base font-bold text-[#3D1E28]">
                      {sampledSkin.toneLabel} • {sampledSkin.undertoneLabel}
                    </div>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-white text-pink-700 border border-pink-200 text-xs font-bold">
                  Gợi ý: {SEASON_PROFILES[sampledSkin.suggestedSeason].name}
                </span>
              </div>

              <p className="text-xs text-[#6D4754] leading-relaxed">
                Chỉ số đo được từ điểm ảnh bạn chọn: độ sáng (Luminance) <strong>{sampledSkin.luminance}/255</strong> và sắc ấm/lạnh <strong>{sampledSkin.warmthScore >= 0 ? `+${sampledSkin.warmthScore}` : sampledSkin.warmthScore}</strong>. Bạn có thể áp dụng kết quả từ ảnh này hoặc bấm chọn các màu dưới đây để ướm thử quanh khuôn mặt.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setPhotoBonusApplied(true);
                    setSelectedSeasonOverride(sampledSkin.suggestedSeason);
                    if (step !== 'result') {
                      setStep('result');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  {photoBonusApplied
                    ? 'Đã áp dụng sắc tố ảnh vào kết quả'
                    : `Dùng gợi ý từ ảnh (${SEASON_PROFILES[sampledSkin.suggestedSeason].name})`}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-pink-50/60 rounded-2xl p-4 border border-pink-100 text-xs text-[#6D4754] space-y-1.5">
              <div className="font-bold text-[#3D1E28]">Mẹo chụp &amp; thử màu chuẩn nhất:</div>
              <p>• Chụp ở nơi có ánh sáng ban ngày đều màu, hạn chế ánh đèn vàng gắt hoặc ngược sáng.</p>
              <p>• Sau khi có ảnh, bấm vào vùng da gò má hoặc trán để xem mã màu da và ướm thử từng tông màu.</p>
            </div>
          )}

          {/* Bảng màu ướm thử trực tiếp lên ảnh */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#3D1E28]">
                Ướm thử màu sắc quanh khuôn mặt ({activeProfile.name}):
              </span>
              <span className="text-pink-500 font-medium">Màu đang thử: {drapeColor}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {activeProfile.palette.map((hex, i) => {
                const active = drapeColor.toUpperCase() === hex.toUpperCase();
                return (
                  <button
                    key={hex + i}
                    type="button"
                    onClick={() => setDrapeColor(hex)}
                    className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                      active
                        ? 'border-pink-600 bg-pink-50 text-pink-900 ring-2 ring-pink-200'
                        : 'border-pink-100 bg-white text-[#5C3A46] hover:border-pink-300'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                      style={{ backgroundColor: hex }}
                    />
                    <span>{activeProfile.paletteNames[i]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFEBF0] to-[#FCE4EC] text-[#4A2C36] font-sans selection:bg-pink-200 selection:text-pink-900">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/75 border-b border-pink-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F48FB1] to-[#F8BBD0] flex items-center justify-center shadow-sm group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-[#C2185B] to-[#EC407A] bg-clip-text text-transparent">
                SẮCME
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-pink-400 font-medium">
                Personal Color &amp; Beauty Studio
              </span>
            </div>
          </button>

          <div className="flex items-center gap-3">
            {step !== 'welcome' && (
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-pink-600 hover:text-pink-800 bg-pink-50 hover:bg-pink-100 px-3.5 py-2 rounded-full transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Làm lại khảo sát
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* WELCOME VIEW */}
        {step === 'welcome' && (
          <div className="max-w-5xl mx-auto space-y-10 py-2 sm:py-6">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200 text-pink-600 text-xs sm:text-sm font-medium shadow-xs">
                <Sparkles className="w-4 h-4 text-pink-500" />
                Phân tích 4 mùa sắc thái cá nhân chuyên sâu ({SURVEY_QUESTIONS.length} tiêu chí + Chụp mặt)
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-[#3D1E28]">
                Khám phá{' '}
                <span className="bg-gradient-to-r from-[#D81B60] via-[#EC407A] to-[#F06292] bg-clip-text text-transparent">
                  Bảng Màu Bản Sắc
                </span>{' '}
                &amp; Chu Trình Trang Điểm Dành Riêng Cho Bạn
              </h1>

              <p className="text-base sm:text-lg text-[#6D4754] max-w-2xl mx-auto leading-relaxed">
                Kết hợp chụp ảnh khuôn mặt / ướm thử bảng màu trực tiếp cùng {SURVEY_QUESTIONS.length} câu hỏi phân tích sắc tố da, SẮCME gợi ý mùa phù hợp và hơn{' '}
                <strong className="text-pink-700">{totalProductsAllSeasons}+ sản phẩm mỹ phẩm</strong> từ dưỡng ẩm, kem lót, kem nền đến son môi &amp; xịt khóa nền.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => setStep('quiz')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#EC407A] to-[#D81B60] hover:from-[#D81B60] hover:to-[#C2185B] text-white font-semibold text-base shadow-lg shadow-pink-200 hover:shadow-xl hover:-translate-y-0.5 transition cursor-pointer"
                >
                  Bắt đầu phân tích ngay
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    setSelectedSeasonOverride('spring');
                    setStep('result');
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/85 hover:bg-white text-pink-700 font-medium text-sm border border-pink-200 shadow-xs transition cursor-pointer"
                >
                  <Palette className="w-4 h-4 text-pink-500" />
                  Khám phá kho {totalProductsAllSeasons}+ mỹ phẩm 4 mùa
                </button>
              </div>
            </div>

            {/* Studio Chụp Mặt & Ướm Màu ngay trên trang chủ */}
            {renderFacePhotoStudio(false)}

            {/* 4 Seasons Preview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-left">
              {(Object.keys(SEASON_PROFILES) as SeasonKey[]).map((key) => {
                const item = SEASON_PROFILES[key];
                return (
                  <div
                    key={key}
                    onClick={() => {
                      setSelectedSeasonOverride(key);
                      setStep('result');
                    }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-300 transition cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="p-2 rounded-xl bg-pink-50 group-hover:bg-pink-100 transition">
                        {SEASON_ICONS[key]}
                      </span>
                      <span className="text-xs font-medium text-pink-400">
                        {item.products.length} sản phẩm
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#3D1E28] mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-pink-500 font-medium mb-3">
                      {item.englishName}
                    </p>
                    <div className="flex items-center gap-1.5">
                      {item.palette.map((hex, i) => (
                        <span
                          key={i}
                          className="w-5 h-5 rounded-full border border-white shadow-xs"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* QUIZ VIEW */}
        {step === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-pink-100 shadow-xs">
              <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-pink-700 mb-2">
                <span>
                  Câu hỏi {currentQuestionIdx + 1} / {SURVEY_QUESTIONS.length}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs">
                  {SURVEY_QUESTIONS[currentQuestionIdx].category}
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-pink-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#F48FB1] to-[#D81B60] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-lg shadow-pink-100/60">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D1E28] leading-snug mb-2">
                {SURVEY_QUESTIONS[currentQuestionIdx].question}
              </h2>
              <p className="text-sm text-[#7A5260] mb-6">
                {SURVEY_QUESTIONS[currentQuestionIdx].description}
              </p>

              <div className="space-y-3">
                {SURVEY_QUESTIONS[currentQuestionIdx].options.map((option, idx) => {
                  const isSelected =
                    answers[SURVEY_QUESTIONS[currentQuestionIdx].id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-pink-50/90 border-pink-400 shadow-sm ring-2 ring-pink-200'
                          : 'bg-white hover:bg-pink-50/50 border-pink-100 hover:border-pink-300'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm sm:text-base text-[#3D1E28]">
                          {option.label}
                        </div>
                        {option.sublabel && (
                          <div className="text-xs text-pink-500 mt-1">
                            {option.sublabel}
                          </div>
                        )}
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex-shrink-0 mt-0.5 flex items-center justify-center ${
                          isSelected
                            ? 'border-pink-500 bg-pink-500 text-white'
                            : 'border-pink-200'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-pink-100">
                <button
                  onClick={() =>
                    setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentQuestionIdx === 0}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-pink-600 disabled:opacity-40 hover:text-pink-800 px-3 py-2 rounded-xl transition cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Câu trước
                </button>

                <div className="flex items-center gap-1.5">
                  {SURVEY_QUESTIONS.map((q, i) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIdx(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        i === currentQuestionIdx
                          ? 'w-5 bg-pink-500'
                          : answers[q.id] !== undefined
                          ? 'w-2 bg-pink-300'
                          : 'w-2 bg-pink-100'
                      }`}
                      title={`Câu ${i + 1}`}
                    />
                  ))}
                </div>

                {answers[SURVEY_QUESTIONS[currentQuestionIdx].id] !== undefined && (
                  <button
                    onClick={() => {
                      if (currentQuestionIdx < SURVEY_QUESTIONS.length - 1) {
                        setCurrentQuestionIdx((prev) => prev + 1);
                      } else {
                        setStep('result');
                      }
                    }}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-pink-600 hover:text-pink-800 px-3 py-2 rounded-xl transition cursor-pointer"
                  >
                    {currentQuestionIdx === SURVEY_QUESTIONS.length - 1
                      ? 'Xem kết quả'
                      : 'Tiếp theo'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* RESULT VIEW */}
        {step === 'result' && (
          <div className="space-y-8">
            {/* Season Switcher Tabs */}
            <div className="bg-white/80 backdrop-blur-sm p-2 rounded-2xl border border-pink-100 shadow-xs flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-pink-500 px-3">
                Chuyển xem bảng màu 4 mùa:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(SEASON_PROFILES) as SeasonKey[]).map((key) => {
                  const isActive = activeSeasonKey === key;
                  const isRecommended =
                    (Object.keys(answers).length > 0 || photoBonusApplied) &&
                    calculatedResult.primary === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedSeasonOverride(key);
                        setSelectedCategory('Tất cả');
                      }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#EC407A] to-[#D81B60] text-white shadow-sm'
                          : 'bg-pink-50/70 text-pink-700 hover:bg-pink-100'
                      }`}
                    >
                      {SEASON_PROFILES[key].name}
                      {isRecommended && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/25 text-white'
                              : 'bg-pink-200 text-pink-800'
                          }`}
                        >
                          Của bạn
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Studio Chụp Mặt & Ướm Màu trong trang Kết quả */}
            {renderFacePhotoStudio(true)}

            {/* Hero Profile Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-lg shadow-pink-100/50">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold">
                    <Crown className="w-3.5 h-3.5 text-pink-500" />
                    {(Object.keys(answers).length > 0 || photoBonusApplied) &&
                    activeSeasonKey === calculatedResult.primary
                      ? `Kết quả phân tích phù hợp nhất (${calculatedResult.percentages[activeSeasonKey]}%)`
                      : 'Hồ sơ sắc thái cá nhân'}
                  </div>

                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#3D1E28]">
                      {activeProfile.name}
                    </h1>
                    <p className="text-sm sm:text-base font-medium text-pink-500 mt-1">
                      {activeProfile.englishName} — {activeProfile.subtitle}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#5C3A46] leading-relaxed">
                    {activeProfile.description}
                  </p>

                  {/* Color Swatches */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-3">
                      Bảng màu trang phục &amp; trang điểm chân ái (bấm để ướm lên ảnh)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {activeProfile.palette.map((hex, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setDrapeColor(hex)}
                          className="flex items-center gap-2.5 bg-pink-50/60 hover:bg-pink-100/70 p-2 rounded-xl border border-pink-100 text-left transition cursor-pointer"
                        >
                          <span
                            className="w-7 h-7 rounded-lg shadow-xs border border-white flex-shrink-0"
                            style={{ backgroundColor: hex }}
                          />
                          <span className="text-xs font-medium text-[#4A2C36]">
                            {activeProfile.paletteNames[idx]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Summary Box */}
                <div className="bg-gradient-to-b from-[#FFF5F8] to-[#FCE4EC]/60 rounded-2xl p-5 border border-pink-100 space-y-4">
                  <h3 className="font-bold text-sm text-[#3D1E28] flex items-center gap-2">
                    <Gem className="w-4 h-4 text-pink-500" />
                    Đặc điểm nhận diện &amp; Gợi ý phối
                  </h3>

                  <ul className="space-y-2 text-xs text-[#5C3A46]">
                    {activeProfile.characteristics.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Heart className="w-3.5 h-3.5 text-pink-400 flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-pink-200/60 space-y-2.5 text-xs">
                    <div>
                      <span className="font-semibold text-pink-700 block">
                        Trang sức tôn da:
                      </span>
                      <span className="text-[#5C3A46]">
                        {activeProfile.bestJewelry}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-pink-700 block">
                        Màu tóc gợi ý:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {activeProfile.hairColors.map((hair, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-white text-pink-700 border border-pink-100"
                          >
                            {hair}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-rose-600 block">
                        Gam màu nên tiết chế:
                      </span>
                      <span className="text-[#7A5260]">
                        {activeProfile.avoidColors.join(' • ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Makeup Looks Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3D1E28]">
                    Gợi ý Layout Trang Điểm Đa Dạng
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7A5260]">
                    3 phong cách trang điểm thiết kế riêng cho sắc tố {activeProfile.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeProfile.makeupLooks.map((look, idx) => (
                  <div
                    key={idx}
                    className="bg-white/85 backdrop-blur-sm rounded-2xl p-5 border border-pink-100 shadow-sm space-y-3"
                  >
                    <div className="inline-block px-2.5 py-1 rounded-lg bg-pink-50 text-pink-600 text-xs font-semibold">
                      Layout 0{idx + 1}
                    </div>
                    <h3 className="font-bold text-base text-[#3D1E28]">
                      {look.title}
                    </h3>
                    <p className="text-xs text-pink-500 italic">{look.style}</p>
                    <div className="space-y-2 pt-2 border-t border-pink-50 text-xs text-[#5C3A46]">
                      <p>
                        <strong className="text-[#3D1E28]">Lớp nền:</strong>{' '}
                        {look.base}
                      </p>
                      <p>
                        <strong className="text-[#3D1E28]">Đôi mắt:</strong>{' '}
                        {look.eyes}
                      </p>
                      <p>
                        <strong className="text-[#3D1E28]">Phấn má:</strong>{' '}
                        {look.cheeks}
                      </p>
                      <p>
                        <strong className="text-[#3D1E28]">Đôi môi:</strong>{' '}
                        {look.lips}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Recommendations Catalog */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-lg shadow-pink-100/40 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 mb-1">
                    <ShoppingBag className="w-4 h-4" />
                    Tủ Đồ Mỹ Phẩm Chuẩn Sắc Độ ({activeProfile.products.length} sản phẩm mùa này / {totalProductsAllSeasons} toàn hệ thống)
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3D1E28]">
                    Danh Sách Mỹ Phẩm Đề Xuất Cho {activeProfile.name}
                  </h2>
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm hãng, tên son, phấn, mã màu..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-full bg-pink-50/70 border border-pink-200 text-xs sm:text-sm text-[#3D1E28] placeholder:text-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <SlidersHorizontal className="w-4 h-4 text-pink-400 flex-shrink-0" />
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count =
                    cat === 'Tất cả'
                      ? activeProfile.products.length
                      : activeProfile.products.filter((p) => p.category === cat)
                          .length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                        isSelected
                          ? 'bg-pink-600 text-white shadow-xs'
                          : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-sm text-pink-500">
                  Không tìm thấy sản phẩm phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;. Bạn thử xóa bộ lọc nhé!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col justify-between bg-gradient-to-b from-white to-[#FFF8FA] rounded-2xl p-4 border border-pink-100 hover:border-pink-300 hover:shadow-md transition"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-pink-100/80 text-pink-700">
                            {product.brand}
                          </span>
                          <span className="text-[11px] font-medium text-pink-400">
                            {product.category}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm text-[#3D1E28] line-clamp-2">
                          {product.name}
                        </h3>

                        {product.shade && (
                          <div className="inline-block text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                            Mã gợi ý: {product.shade}
                          </div>
                        )}

                        <p className="text-xs text-[#6D4754] leading-relaxed">
                          {product.note}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-pink-100 flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-[#4A2C36]">
                          {product.priceRange}
                        </span>
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#EC407A] to-[#D81B60] hover:from-[#D81B60] hover:to-[#AD1457] text-white text-xs font-semibold shadow-xs transition"
                        >
                          Xem sản phẩm
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-pink-100 bg-white/60 backdrop-blur-sm py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-pink-500">
          <span className="font-semibold">
            SẮCME — Nền tảng phân tích sắc thái cá nhân &amp; gợi ý trang điểm
          </span>
          <span>
            Thiết kế riêng cho hành trình tỏa sáng theo bản sắc của bạn
          </span>
        </div>
      </footer>
    </div>
  );
}