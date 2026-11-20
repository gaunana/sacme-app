'use client';

import React, { useState, useMemo } from 'react';
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

export default function SacmeApp() {
  const [step, setStep] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedSeasonOverride, setSelectedSeasonOverride] = useState<SeasonKey | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
  }, [answers]);

  const activeSeasonKey = selectedSeasonOverride || calculatedResult.primary;
  const activeProfile = SEASON_PROFILES[activeSeasonKey];

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
    setAnswers({});
    setCurrentQuestionIdx(0);
    setSelectedSeasonOverride(null);
    setSelectedCategory('Tất cả');
    setSearchQuery('');
    setStep('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPercent = Math.round(
    ((currentQuestionIdx + 1) / SURVEY_QUESTIONS.length) * 100
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
                Personal Color & Beauty Studio
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
          <div className="max-w-4xl mx-auto text-center space-y-8 py-4 sm:py-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200 text-pink-600 text-xs sm:text-sm font-medium shadow-xs">
              <Sparkles className="w-4 h-4 text-pink-500" />
              Phân tích 4 mùa sắc thái cá nhân chuyên sâu ({SURVEY_QUESTIONS.length} tiêu chí)
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-[#3D1E28]">
              Khám phá{' '}
              <span className="bg-gradient-to-r from-[#D81B60] via-[#EC407A] to-[#F06292] bg-clip-text text-transparent">
                Bảng Màu Bản Sắc
              </span>{' '}
              &amp; Chu Trình Trang Điểm Dành Riêng Cho Bạn
            </h1>

            <p className="text-base sm:text-lg text-[#6D4754] max-w-2xl mx-auto leading-relaxed">
              Chỉ với {SURVEY_QUESTIONS.length} câu hỏi phân tích sắc tố da, tĩnh mạch, ánh mắt, độ tương phản và nhu cầu bề mặt da, SẮCME giúp bạn tìm ra mùa sắc thái chuẩn xác cùng hơn{' '}
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

            {/* 4 Seasons Preview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 text-left">
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
                    Object.keys(answers).length > 0 &&
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

            {/* Hero Profile Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-lg shadow-pink-100/50">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold">
                    <Crown className="w-3.5 h-3.5 text-pink-500" />
                    {Object.keys(answers).length > 0 &&
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
                      Bảng màu trang phục &amp; trang điểm chân ái
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {activeProfile.palette.map((hex, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 bg-pink-50/60 p-2 rounded-xl border border-pink-100"
                        >
                          <span
                            className="w-7 h-7 rounded-lg shadow-xs border border-white flex-shrink-0"
                            style={{ backgroundColor: hex }}
                          />
                          <span className="text-xs font-medium text-[#4A2C36]">
                            {activeProfile.paletteNames[idx]}
                          </span>
                        </div>
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