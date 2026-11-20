export type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter';

export interface QuestionOption {
  label: string;
  sublabel?: string;
  scores: Record<SeasonKey, number>;
}

export interface Question {
  id: number;
  category: string;
  question: string;
  description: string;
  options: QuestionOption[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  shade: string;
  category: string;
  priceRange: string;
  note: string;
  url: string;
}

export interface SeasonProfile {
  key: SeasonKey;
  name: string;
  englishName: string;
  subtitle: string;
  palette: string[];
  paletteNames: string[];
  description: string;
  characteristics: string[];
  bestJewelry: string;
  hairColors: string[];
  makeupLooks: {
    title: string;
    style: string;
    base: string;
    eyes: string;
    cheeks: string;
    lips: string;
  }[];
  avoidColors: string[];
  products: Product[];
}

export const SURVEY_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Sắc độ da (Undertone)',
    question: 'Khi nhìn vào mạch máu ở mặt trong cổ tay dưới ánh sáng tự nhiên ban ngày, bạn thấy màu gì rõ nhất?',
    description: 'Mạch máu phản ánh lớp sắc tố ẩn dưới biểu bì da của bạn.',
    options: [
      { label: 'Xanh lá cây hoặc xanh ô-liu', sublabel: 'Thiên về sắc tố ấm (Warm Undertone)', scores: { spring: 3, summer: 0, autumn: 3, winter: 0 } },
      { label: 'Xanh dương hoặc tím nhạt', sublabel: 'Thiên về sắc tố lạnh (Cool Undertone)', scores: { spring: 0, summer: 3, autumn: 0, winter: 3 } },
      { label: 'Pha trộn cả xanh lá và xanh dương/tím', sublabel: 'Sắc tố trung tính (Neutral Undertone)', scores: { spring: 2, summer: 2, autumn: 1, winter: 1 } },
      { label: 'Khó xác định rõ màu, mạch máu ẩn sâu', sublabel: 'Sắc tố trung tính thiên ô-liu', scores: { spring: 1, summer: 1, autumn: 2, winter: 2 } },
    ],
  },
  {
    id: 2,
    category: 'Sắc độ da (Undertone)',
    question: 'Đặt một tờ giấy trắng tinh cạnh khuôn mặt mộc dưới ánh sáng trời, làn da bạn phản chiếu ánh sắc nào?',
    description: 'Bài kiểm tra kinh điển giúp nhận diện ánh vàng đào hay ánh hồng xanh.',
    options: [
      { label: 'Ánh vàng sáng, kem tươi hoặc đào ấm', sublabel: 'Da sáng ấm rạng rỡ', scores: { spring: 3, summer: 0, autumn: 1, winter: 0 } },
      { label: 'Ánh hồng phấn, hồng nhạt hoặc hơi xanh dịu', sublabel: 'Da sáng lạnh thanh thoát', scores: { spring: 0, summer: 3, autumn: 0, winter: 1 } },
      { label: 'Ánh vàng mật ong, đồng ấm hoặc be trầm', sublabel: 'Da ấm trầm chiều sâu', scores: { spring: 0, summer: 0, autumn: 3, winter: 0 } },
      { label: 'Ánh trắng sứ lạnh, trắng xanh hoặc nâu lạnh sắc nét', sublabel: 'Da lạnh có độ tương phản cao', scores: { spring: 0, summer: 1, autumn: 0, winter: 3 } },
    ],
  },
  {
    id: 3,
    category: 'Phản ứng với ánh nắng',
    question: 'Làn da của bạn phản ứng thế nào sau khi đi nắng khoảng 30–60 phút mà không che chắn kỹ?',
    description: 'Lượng melanin và cách da bắt nắng thể hiện rõ nhóm màu cá nhân.',
    options: [
      { label: 'Dễ ửng đỏ nhẹ rồi nhanh chóng chuyển sang rám nắng vàng mật ong', scores: { spring: 3, summer: 0, autumn: 2, winter: 0 } },
      { label: 'Bị đỏ hồng lên như cháy nắng, rát nhẹ và rất khó ngăm đen', scores: { spring: 0, summer: 3, autumn: 0, winter: 2 } },
      { label: 'Hầu như không đỏ, bắt nắng rất nhanh và đều màu nâu đồng', scores: { spring: 0, summer: 0, autumn: 3, winter: 1 } },
      { label: 'Ửng đỏ nhẹ rồi sạm màu xám lạnh hoặc nâu tro', scores: { spring: 0, summer: 2, autumn: 0, winter: 3 } },
    ],
  },
  {
    id: 4,
    category: 'Trang sức & Kim loại',
    question: 'Khi đeo trang sức sát vùng cổ và khuôn mặt, chất liệu kim loại nào giúp da bạn sáng bừng nhất?',
    description: 'Ánh kim phản xạ trực tiếp lên sắc tố bề mặt da.',
    options: [
      { label: 'Vàng sáng (Gold 14K/18K) hoặc vàng hồng ánh đào', scores: { spring: 3, summer: 0, autumn: 1, winter: 0 } },
      { label: 'Bạc sáng, bạch kim hoặc vàng trắng ánh mờ dịu', scores: { spring: 0, summer: 3, autumn: 0, winter: 1 } },
      { label: 'Vàng đồng cổ điển, vàng đậm hoặc trang sức gỗ/hổ phách', scores: { spring: 0, summer: 0, autumn: 3, winter: 0 } },
      { label: 'Bạc sáng bóng loáng, bạch kim sắc nét hoặc kim loại ánh thép', scores: { spring: 0, summer: 1, autumn: 0, winter: 3 } },
    ],
  },
  {
    id: 5,
    category: 'Sắc tố môi tự nhiên',
    question: 'Màu môi mộc tự nhiên của bạn khi chưa thoa son giống với gam màu nào nhất?',
    description: 'Sắc môi tự nhiên quyết định độ lên màu chuẩn của mọi thỏi son.',
    options: [
      { label: 'Hồng đào tươi, cam san hô nhạt hoặc hồng cam ấm', scores: { spring: 3, summer: 0, autumn: 1, winter: 0 } },
      { label: 'Hồng phấn pastel, hồng cánh sen nhạt hoặc hồng tím sương', scores: { spring: 0, summer: 3, autumn: 0, winter: 0 } },
      { label: 'Cam đất nhạt, hồng nâu ấm hoặc màu be trầm', scores: { spring: 0, summer: 0, autumn: 3, winter: 0 } },
      { label: 'Hồng mận, đỏ trầm tự nhiên hoặc viền môi hơi ánh tím lạnh', scores: { spring: 0, summer: 1, autumn: 0, winter: 3 } },
    ],
  },
  {
    id: 6,
    category: 'Độ tương phản khuôn mặt',
    question: 'Khi chụp ảnh đen trắng khuôn mặt mộc, độ chênh lệch sáng tối giữa da, tóc và lông mày của bạn ra sao?',
    description: 'Độ tương phản (Contrast) quyết định bạn hợp màu tươi rực hay màu pastel dịu nhẹ.',
    options: [
      { label: 'Tương phản trung bình – sáng: Da sáng, tóc và chân mày nâu sáng/nâu hạt dẻ', scores: { spring: 3, summer: 1, autumn: 0, winter: 0 } },
      { label: 'Tương phản thấp – dịu: Da, tóc và chân mày hòa quyện mềm mại, không quá gắt', scores: { spring: 1, summer: 3, autumn: 1, winter: 0 } },
      { label: 'Tương phản trung bình – trầm: Da ấm kết hợp tóc nâu sẫm hoặc nâu đồng', scores: { spring: 0, summer: 0, autumn: 3, winter: 1 } },
      { label: 'Tương phản rất cao: Da sáng hoặc ngăm sắc nét nổi bật hẳn trên nền tóc đen tuyền', scores: { spring: 0, summer: 0, autumn: 0, winter: 3 } },
    ],
  },
  {
    id: 7,
    category: 'Màu mắt & Ánh nhìn',
    question: 'Quan sát kỹ tròng mắt và lòng trắng của bạn dưới ánh sáng đủ, bạn nhận thấy đặc điểm nào?',
    description: 'Độ trong của lòng trắng và sắc nâu/đen của con ngươi là chìa khóa phân mùa.',
    options: [
      { label: 'Con ngươi nâu hổ phách sáng, ánh nhìn trong veo, long lanh', scores: { spring: 3, summer: 0, autumn: 1, winter: 0 } },
      { label: 'Con ngươi nâu xám khói hoặc nâu dịu, ranh giới con ngươi mềm mại', scores: { spring: 0, summer: 3, autumn: 0, winter: 0 } },
      { label: 'Con ngươi nâu trầm ấm, nâu cà phê đậm, ánh nhìn sâu lắng', scores: { spring: 0, summer: 0, autumn: 3, winter: 0 } },
      { label: 'Con ngươi đen tuyền hoặc nâu đen sắc lẹm, lòng trắng rất rõ nét', scores: { spring: 0, summer: 0, autumn: 0, winter: 3 } },
    ],
  },
  {
    id: 8,
    category: 'Màu tóc tự nhiên & Nhuộm hợp',
    question: 'Màu tóc tự nhiên (hoặc màu tóc nhuộm từng được khen nhiều nhất) của bạn là gam nào?',
    description: 'Mái tóc chiếm diện tích lớn khung quanh khuôn mặt, ảnh hưởng trực tiếp tới sắc da.',
    options: [
      { label: 'Nâu mật ong, nâu vàng sáng, nâu trà sữa ấm', scores: { spring: 3, summer: 0, autumn: 1, winter: 0 } },
      { label: 'Nâu tro lạnh, nâu khói, nâu hồng sương hoặc đen khói dịu', scores: { spring: 0, summer: 3, autumn: 0, winter: 1 } },
      { label: 'Nâu hạt dẻ đậm, nâu socola, nâu đồng hoặc nâu rêu ấm', scores: { spring: 0, summer: 0, autumn: 3, winter: 0 } },
      { label: 'Đen tuyền nguyên bản, đen xanh hoặc nâu đen lạnh sắc sảo', scores: { spring: 0, summer: 0, autumn: 0, winter: 3 } },
    ],
  },
  {
    id: 9,
    category: 'Trang phục màu trắng',
    question: 'Giữa các sắc độ của áo màu trắng, chiếc áo nào giúp khuôn mặt bạn trông tươi tắn, ít khuyết điểm nhất?',
    description: 'Màu trắng chuẩn của từng mùa có khả năng nâng tông da rõ rệt.',
    options: [
      { label: 'Trắng kem tươi (Cream), trắng ngà ấm', scores: { spring: 3, summer: 0, autumn: 1, winter: 0 } },
      { label: 'Trắng sữa dịu (Soft White), trắng vỏ trứng mờ', scores: { spring: 0, summer: 3, autumn: 0, winter: 0 } },
      { label: 'Trắng vani trầm, màu be kem hoặc trắng ngả vàng cổ điển', scores: { spring: 0, summer: 0, autumn: 3, winter: 0 } },
      { label: 'Trắng tinh khôi (Pure Snow White) sáng bật tông', scores: { spring: 0, summer: 0, autumn: 0, winter: 3 } },
    ],
  },
  {
    id: 10,
    category: 'Trang phục màu tối',
    question: 'Khi mặc áo màu đen tuyền sát cổ, bạn cảm thấy khuôn mặt mình thay đổi như thế nào?',
    description: 'Màu đen tuyền là thước đo độ sắc nét và khả năng chịu độ tương phản của gương mặt.',
    options: [
      { label: 'Hơi nặng nề, mặt dễ bị tối đi; mặc màu nâu lạc đà hoặc xanh navy sáng đẹp hơn', scores: { spring: 3, summer: 0, autumn: 1, winter: 0 } },
      { label: 'Hơi cứng và lộ quầng thâm; mặc màu xám tro, xanh pastel hoặc tím khói dịu đẹp hơn', scores: { spring: 0, summer: 3, autumn: 0, winter: 0 } },
      { label: 'Tạm ổn nhưng không bằng màu nâu socola đậm, xanh rêu hoặc đỏ rượu ấm', scores: { spring: 0, summer: 0, autumn: 3, winter: 0 } },
      { label: 'Cực kỳ sang chảnh, sắc nét, tôn da trắng hoặc da ngăm khỏe khoắn rõ rệt', scores: { spring: 0, summer: 0, autumn: 0, winter: 3 } },
    ],
  },
  {
    id: 11,
    category: 'Phản ứng với màu son',
    question: 'Khi đánh một thỏi son cam tươi hoặc cam san hô, hiệu ứng trên gương mặt bạn ra sao?',
    description: 'Sắc cam là ranh giới phân tách rõ nhất giữa nhóm Ấm (Xuân/Thu) và nhóm Lạnh (Hạ/Đông).',
    options: [
      { label: 'Rất hợp! Khuôn mặt trông trẻ trung, tươi tắn và tràn đầy sức sống', scores: { spring: 3, summer: 0, autumn: 1, winter: 0 } },
      { label: 'Lạc quẻ, son bị nổi lềnh bềnh trên môi và làm da trông xỉn vàng', scores: { spring: 0, summer: 3, autumn: 0, winter: 2 } },
      { label: 'Cam tươi hơi chói, nhưng cam cháy hoặc cam đất thì cực kỳ cuốn hút', scores: { spring: 0, summer: 0, autumn: 3, winter: 0 } },
      { label: 'Không hợp chút nào; son đỏ lạnh, hồng mận hoặc đỏ rượu mới làm sáng da', scores: { spring: 0, summer: 1, autumn: 0, winter: 3 } },
    ],
  },
  {
    id: 12,
    category: 'Hiệu ứng phấn má',
    question: 'Màu phấn má nào khi tán lên gò má trông tự nhiên như ửng hồng từ bên trong da bạn?',
    description: 'Màu má ửng tự nhiên phản ánh đúng sắc tố mao mạch dưới da.',
    options: [
      { label: 'Cam đào tươi, hồng san hô hoặc mơ chín', scores: { spring: 3, summer: 0, autumn: 0, winter: 0 } },
      { label: 'Hồng phấn baby, hồng hoa anh đào hoặc hồng tím lavender nhạt', scores: { spring: 0, summer: 3, autumn: 0, winter: 1 } },
      { label: 'Cam đất, hồng đất trầm hoặc nâu đào ấm', scores: { spring: 0, summer: 0, autumn: 3, winter: 0 } },
      { label: 'Hồng dâu lạnh, hồng mận chín hoặc đỏ hồng berry', scores: { spring: 0, summer: 1, autumn: 0, winter: 3 } },
    ],
  },
  {
    id: 13,
    category: 'Chất liệu & Hiệu ứng trang điểm',
    question: 'Lớp nền và hiệu ứng ánh nhũ nào giúp khuôn mặt bạn trông hài hòa và thu hút nhất?',
    description: 'Độ bắt sáng và kết cấu mỹ phẩm bổ trợ cho độ trong hay độ trầm của làn da.',
    options: [
      { label: 'Lớp nền căng bóng (Dewy/Glowy) kèm nhũ vàng champagne lấp lánh nhẹ', scores: { spring: 3, summer: 0, autumn: 0, winter: 1 } },
      { label: 'Lớp nền mịn lì như sương (Soft Satin/Velvet) kèm nhũ ngọc trai hồng bạc', scores: { spring: 0, summer: 3, autumn: 0, winter: 0 } },
      { label: 'Lớp nền bán lì ấm áp (Natural Matte) kèm nhũ đồng ánh kim sang trọng', scores: { spring: 0, summer: 0, autumn: 3, winter: 0 } },
      { label: 'Lớp nền lì sắc nét không tì vết kèm nhũ bạc/kim cương bắt sáng rõ', scores: { spring: 0, summer: 0, autumn: 0, winter: 3 } },
    ],
  },
  {
    id: 14,
    category: 'Loại da & Nhu cầu nền',
    question: 'Tình trạng bề mặt da hiện tại của bạn thuộc nhóm nào để chọn đúng kem dưỡng & kem nền?',
    description: 'Giúp SẮCME đề xuất chính xác kem dưỡng ẩm, kem lót và xịt khóa nền phù hợp.',
    options: [
      { label: 'Da khô đến thiên khô, cần cấp ẩm sâu và lớp nền căng bóng tự nhiên', scores: { spring: 1, summer: 1, autumn: 0, winter: 0 } },
      { label: 'Da hỗn hợp thiên dầu vùng chữ T, cần kiềm dầu nhẹ nhưng vẫn thoáng mịn', scores: { spring: 0, summer: 1, autumn: 1, winter: 0 } },
      { label: 'Da dầu, lỗ chân lông to, cần kem lót làm mờ và xịt khóa nền lâu trôi', scores: { spring: 0, summer: 0, autumn: 1, winter: 1 } },
      { label: 'Da thường hoặc nhạy cảm nhẹ, ưu tiên thành phần lành tính, mỏng nhẹ', scores: { spring: 1, summer: 1, autumn: 0, winter: 1 } },
    ],
  },
  {
    id: 15,
    category: 'Ấn tượng khí chất đầu tiên',
    question: 'Người đối diện thường miêu tả khí chất khuôn mặt của bạn bằng cụm từ nào?',
    description: 'Khí chất tự nhiên đi liền với bảng màu cá nhân của mỗi người.',
    options: [
      { label: 'Tươi tắn, ngọt ngào, trẻ trung, tràn đầy năng lượng tích cực', scores: { spring: 3, summer: 0, autumn: 0, winter: 0 } },
      { label: 'Nhẹ nhàng, thanh lịch, dịu dàng, tinh tế như nàng thơ', scores: { spring: 0, summer: 3, autumn: 0, winter: 0 } },
      { label: 'Ấm áp, trưởng thành, cổ điển, sang trọng và có chiều sâu', scores: { spring: 0, summer: 0, autumn: 3, winter: 0 } },
      { label: 'Sắc sảo, hiện đại, cuốn hút, cá tính và nổi bật giữa đám đông', scores: { spring: 0, summer: 0, autumn: 0, winter: 3 } },
    ],
  },
  {
    id: 16,
    category: 'Phong cách trang điểm yêu thích',
    question: 'Khi trang điểm hoàn chỉnh, bạn muốn tập trung tạo điểm nhấn vào vùng nào nhất?',
    description: 'Cá nhân hóa trọn bộ gợi ý mỹ phẩm từ bước dưỡng đến bước khóa nền.',
    options: [
      { label: 'Đôi mắt long lanh trong trẻo và đôi môi căng mọng như trái cây', scores: { spring: 2, summer: 1, autumn: 0, winter: 0 } },
      { label: 'Gò má ửng hồng sương mai và lớp nền mịn mượt tự nhiên như không trang điểm', scores: { spring: 1, summer: 2, autumn: 0, winter: 0 } },
      { label: 'Đôi mắt sâu hút hồn với tông nâu khói/nhũ đồng và môi trầm quyến rũ', scores: { spring: 0, summer: 0, autumn: 2, winter: 1 } },
      { label: 'Đường eyeliner sắc sảo, tạo khối gọn gàng và màu son nổi bật quyền lực', scores: { spring: 0, summer: 0, autumn: 1, winter: 2 } },
    ],
  },
];

const makeSearchUrl = (brand: string, name: string, shade: string) =>
  `https://shopee.vn/search?keyword=${encodeURIComponent(`${brand} ${name} ${shade}`)}`;

export const SEASON_PROFILES: Record<SeasonKey, SeasonProfile> = {
  spring: {
    key: 'spring',
    name: 'Mùa Xuân Tươi Sáng',
    englishName: 'Spring Warm & Bright',
    subtitle: 'Rạng rỡ • Trong trẻo • Ngọt ngào • Tràn đầy sức sống',
    palette: ['#FFB7A5', '#FF8C7A', '#FFD59E', '#F9E076', '#98D8AA', '#F7A8B8'],
    paletteNames: ['Cam đào pastel', 'San hô tươi', 'Vàng mơ nhạt', 'Vàng kem nắng', 'Xanh bạc hà ấm', 'Hồng đào sáng'],
    description:
      'Bạn sở hữu sắc tố da ấm (Warm Undertone) kết hợp cùng độ sáng và độ trong cao. Làn da của bạn bừng sáng nhất khi đi cùng những gam màu tươi tắn, trong trẻo như ánh nắng ban mai mùa xuân: cam đào, hồng san hô, vàng kem và nâu mật ong.',
    characteristics: [
      'Sắc tố ẩn dưới da thiên vàng sáng hoặc ánh đào tươi tắn.',
      'Độ tương phản khuôn mặt trung bình – sáng, ánh nhìn trong veo rạng rỡ.',
      'Hợp trang sức vàng sáng 14K/18K, vàng hồng và ngọc trai ánh kem.',
      'Lớp nền căng bóng (Dewy/Glowy) và son bóng tint giúp nhân đôi vẻ trẻ trung.',
    ],
    bestJewelry: 'Vàng sáng 14K/18K, Vàng hồng (Rose Gold), Ngọc trai ánh kem ấm',
    hairColors: ['Nâu trà sữa ấm', 'Nâu mật ong sáng', 'Nâu cam đào nhẹ', 'Nâu hạt dẻ sáng'],
    makeupLooks: [
      {
        title: 'Nàng Thơ Nắng Mai (Daily Peach Glow)',
        style: 'Trang điểm đi học, đi làm hàng ngày nhẹ nhàng trong veo',
        base: 'Kem nền mỏng nhẹ căng bóng tông Warm Ivory, che khuyết điểm sáng vùng bọng mắt.',
        eyes: 'Phấn mắt cam đào nhạt tán bầu mắt, nhấn nhũ vàng champagne giữa mí và kẻ eyeliner nâu sáng.',
        cheeks: 'Phấn má kem màu cam san hô tán ngang qua sống mũi tạo hiệu ứng ửng nắng.',
        lips: 'Son tint bóng màu hồng đào tươi hoặc cam san hô mọng nước.',
      },
      {
        title: 'Tiệc Trà Hoàng Hôn (Apricot Sparkle)',
        style: 'Hẹn hò, dạo phố cuối tuần ngọt ngào nổi bật',
        base: 'Cushion bắt sáng tự nhiên, phủ phấn bột kiềm dầu nhẹ vùng chữ T.',
        eyes: 'Tông nâu mật ong kết hợp nhũ kim tuyến hạt to ánh vàng đào ở mi dưới.',
        cheeks: 'Phấn má hồng cam đào phủ nhẹ thêm bắt sáng ánh vàng sâm panh trên đỉnh gò má.',
        lips: 'Đánh lòng môi cam đỏ tươi kết hợp viền môi cam sữa làm đầy môi.',
      },
      {
        title: 'Thanh Lịch Dự Tiệc (Coral Velvet)',
        style: 'Sự kiện, tiệc tối sang trọng nhưng vẫn giữ nét trẻ trung',
        base: 'Kem lót cấp ẩm căng mướt, kem nền bán lì độ che phủ trung bình cao.',
        eyes: 'Bảng mắt nâu đồng sáng, chuốt mi cong tơi tự nhiên và gắn mi cụm nhẹ đuôi mắt.',
        cheeks: 'Tạo khối nâu ấm nhẹ nhàng, má hồng san hô trầm kết hợp bắt sáng tinh tế.',
        lips: 'Son kem lì mịn màu đỏ cam san hô hoặc đỏ đào rạng rỡ.',
      },
    ],
    avoidColors: ['Đen tuyền quá gắt', 'Xám tro lạnh xỉn', 'Tím đậm lạnh', 'Hồng cánh sen neon lạnh'],
    products: [
      // Kem dưỡng ẩm (5)
      { id: 'sp-m1', name: 'Kem Dưỡng Ẩm Water Bank Blue Hyaluronic Cream', brand: 'Laneige', shade: 'For Normal to Dry Skin', category: 'Kem dưỡng ẩm', priceRange: '750.000đ - 900.000đ', note: 'Cấp ẩm sâu giúp lớp nền căng bóng không mốc', url: makeSearchUrl('Laneige', 'Water Bank Blue Hyaluronic Cream', '') },
      { id: 'sp-m2', name: 'Kem Dưỡng Ẩm Torriden DIVE-IN Soothing Cream', brand: 'Torriden', shade: 'Low Molecular HA', category: 'Kem dưỡng ẩm', priceRange: '320.000đ - 420.000đ', note: 'Thấm nhanh, làm dịu da và tạo độ ẩm mượt trước makeup', url: makeSearchUrl('Torriden', 'DIVE-IN Soothing Cream', '') },
      { id: 'sp-m3', name: 'Kem Dưỡng B5 La Roche-Posay Cicaplast Baume B5+', brand: 'La Roche-Posay', shade: '40ml', category: 'Kem dưỡng ẩm', priceRange: '330.000đ - 410.000đ', note: 'Phục hồi vùng da khô bong tróc trước khi đánh nền', url: makeSearchUrl('La Roche-Posay', 'Cicaplast Baume B5+', '') },
      { id: 'sp-m4', name: 'Kem Dưỡng Ẩm Embryolisse Lait-Crème Concentré', brand: 'Embryolisse', shade: '75ml', category: 'Kem dưỡng ẩm', priceRange: '450.000đ - 550.000đ', note: 'Kem dưỡng kiêm lót trang điểm kinh điển cho nền mướt', url: makeSearchUrl('Embryolisse', 'Lait-Creme Concentre', '') },
      { id: 'sp-m5', name: 'Gel Dưỡng Ẩm Clinique Moisture Surge 100H', brand: 'Clinique', shade: '50ml', category: 'Kem dưỡng ẩm', priceRange: '850.000đ - 1.100.000đ', note: 'Giữ ẩm suốt ngày dài cho làn da tươi sáng rạng rỡ', url: makeSearchUrl('Clinique', 'Moisture Surge 100H', '') },
      // Kem lót (5)
      { id: 'sp-p1', name: 'Kem Lót Nâng Tông Jung Saem Mool Skin Setting Tone-up', brand: 'Jung Saem Mool', shade: 'Tone-up Sun Base', category: 'Kem lót', priceRange: '550.000đ - 680.000đ', note: 'Hiệu chỉnh sắc da sáng hồng đào tự nhiên, bắt sáng nhẹ', url: makeSearchUrl('Jung Saem Mool', 'Skin Setting Tone-up Sun Base', '') },
      { id: 'sp-p2', name: 'Kem Lót Kiềm Dầu Mịn Lỗ Chân Lông Benefit The POREfessional', brand: 'Benefit', shade: 'Original', category: 'Kem lót', priceRange: '750.000đ - 920.000đ', note: 'Làm mờ lỗ chân lông tức thì giúp bề mặt da mịn mượt', url: makeSearchUrl('Benefit', 'The POREfessional Primer', '') },
      { id: 'sp-p3', name: 'Kem Lót Cấp Ẩm Bobbi Brown Vitamin Enriched Face Base', brand: 'Bobbi Brown', shade: '50ml', category: 'Kem lót', priceRange: '1.450.000đ - 1.750.000đ', note: 'Giúp lớp nền bám chặt và căng bóng chuẩn chuyên gia', url: makeSearchUrl('Bobbi Brown', 'Vitamin Enriched Face Base', '') },
      { id: 'sp-p4', name: 'Kem Lót Bắt Sáng MAC Strobe Cream', brand: 'MAC', shade: 'Peachlite', category: 'Kem lót', priceRange: '850.000đ - 1.050.000đ', note: 'Ánh nhũ đào cực hợp với làn da Mùa Xuân tươi sáng', url: makeSearchUrl('MAC', 'Strobe Cream', 'Peachlite') },
      { id: 'sp-p5', name: 'Kem Lót Kiềm Dầu Kiêm Che Phủ Zeesea', brand: 'Zeesea', shade: 'Tím / Xanh Bạc Hà', category: 'Kem lót', priceRange: '130.000đ - 190.000đ', note: 'Lựa chọn tiết kiệm giúp làm đều màu da nhanh chóng', url: makeSearchUrl('Zeesea', 'Kem Lot Kiem Dau', '') },
      // Kem nền & Cushion (6)
      { id: 'sp-f1', name: 'Cushion Jung Saem Mool Essential Skin Nuder', brand: 'Jung Saem Mool', shade: 'Fair Light / Light', category: 'Kem nền', priceRange: '780.000đ - 920.000đ', note: 'Hiệu ứng căng bóng tự nhiên, tông vàng sáng chuẩn da Xuân', url: makeSearchUrl('Jung Saem Mool', 'Essential Skin Nuder Cushion', 'Light') },
      { id: 'sp-f2', name: 'Kem Nền Estée Lauder Double Wear Stay-in-Place', brand: 'Estée Lauder', shade: '1W1 Bone / 1W2 Sand', category: 'Kem nền', priceRange: '1.150.000đ - 1.380.000đ', note: 'Bền màu cả ngày, tông W (Warm) tiệp hoàn hảo sắc da ấm', url: makeSearchUrl('Estee Lauder', 'Double Wear', '1W1 Bone') },
      { id: 'sp-f3', name: 'Kem Nền NARS Light Reflecting Foundation', brand: 'NARS', shade: 'Gobi / Deauville', category: 'Kem nền', priceRange: '1.250.000đ - 1.450.000đ', note: 'Bắt sáng thông minh giúp da rạng rỡ như được phủ sương', url: makeSearchUrl('NARS', 'Light Reflecting Foundation', 'Gobi') },
      { id: 'sp-f4', name: 'Cushion Romand Bare Water Cushion', brand: 'Romand', shade: '02 Pure 21 / 03 Natural 21', category: 'Kem nền', priceRange: '280.000đ - 350.000đ', note: 'Mỏng nhẹ như nước, hợp trang điểm đi học hàng ngày', url: makeSearchUrl('Romand', 'Bare Water Cushion', '03 Natural 21') },
      { id: 'sp-f5', name: 'Kem Nền Maybelline Fit Me Matte + Poreless', brand: 'Maybelline', shade: '115 Ivory / 120 Classic Ivory', category: 'Kem nền', priceRange: '210.000đ - 260.000đ', note: 'Dễ tán, kiềm dầu ổn định cho da hỗn hợp thiên sáng', url: makeSearchUrl('Maybelline', 'Fit Me Foundation', '120') },
      { id: 'sp-f6', name: 'Cushion Clio Kill Cover Mesh Glow Cushion', brand: 'Clio', shade: '02 Lingerie / 03 Linen', category: 'Kem nền', priceRange: '420.000đ - 520.000đ', note: 'Lớp màng lưới giúp nền mỏng mịn và căng bóng tự nhiên', url: makeSearchUrl('Clio', 'Kill Cover Mesh Glow Cushion', '03 Linen') },
      // Che khuyết điểm & Phấn phủ (5)
      { id: 'sp-c1', name: 'Che Khuyết Điểm The Saem Cover Perfection Tip Concealer', brand: 'The Saem', shade: '01 Clear Beige / 1.25 Light Beige', category: 'Che khuyết điểm & Phấn phủ', priceRange: '95.000đ - 135.000đ', note: 'Che quầng thâm và đốm nhỏ gọn nhẹ, giá học sinh', url: makeSearchUrl('The Saem', 'Cover Perfection Tip Concealer', '1.25') },
      { id: 'sp-c2', name: 'Che Khuyết Điểm NARS Radiant Creamy Concealer', brand: 'NARS', shade: 'Vanilla / Custard', category: 'Che khuyết điểm & Phấn phủ', priceRange: '720.000đ - 850.000đ', note: 'Chất kem ẩm mịn không đọng rãnh cười vùng dưới mắt', url: makeSearchUrl('NARS', 'Radiant Creamy Concealer', 'Custard') },
      { id: 'sp-c3', name: 'Phấn Phủ Bột Innisfree No-Sebum Mineral Powder', brand: 'Innisfree', shade: 'Transparent', category: 'Che khuyết điểm & Phấn phủ', priceRange: '120.000đ - 160.000đ', note: 'Kiềm dầu vùng chữ T mà vẫn giữ độ bóng nhẹ hai bên má', url: makeSearchUrl('Innisfree', 'No Sebum Mineral Powder', '') },
      { id: 'sp-c4', name: 'Phấn Phủ Bột Laura Mercier Translucent Loose Setting Powder', brand: 'Laura Mercier', shade: 'Translucent', category: 'Che khuyết điểm & Phấn phủ', priceRange: '890.000đ - 1.100.000đ', note: 'Hạt phấn siêu mịn khóa nền bền đẹp suốt 12 giờ', url: makeSearchUrl('Laura Mercier', 'Translucent Loose Setting Powder', '') },
      { id: 'sp-c5', name: 'Phấn Phủ Nén Carslan Black Magnet Soft Mist', brand: 'Carslan', shade: 'Transparent', category: 'Che khuyết điểm & Phấn phủ', priceRange: '240.000đ - 310.000đ', note: 'Làm mờ lỗ chân lông tức thì, kiềm dầu tốt trong thời tiết nóng', url: makeSearchUrl('Carslan', 'Black Magnet Powder', '') },
      // Phấn má (6)
      { id: 'sp-b1', name: 'Phấn Má Hồng Romand Better Than Cheek', brand: 'Romand', shade: 'C02 Blueberry Chip / N02 Vine Nude', category: 'Phấn má', priceRange: '150.000đ - 195.000đ', note: 'Hạt phấn mịn làm mờ lỗ chân lông, lên màu đào tươi tắn', url: makeSearchUrl('Romand', 'Better Than Cheek', 'C01 Peach Chip') },
      { id: 'sp-b2', name: 'Má Hồng Kem Rare Beauty Soft Pinch Liquid Blush', brand: 'Rare Beauty', shade: 'Joy / Happy', category: 'Phấn má', priceRange: '680.000đ - 820.000đ', note: 'Màu Joy (cam đào rạng rỡ) sinh ra dành riêng cho Mùa Xuân', url: makeSearchUrl('Rare Beauty', 'Soft Pinch Liquid Blush', 'Joy') },
      { id: 'sp-b3', name: 'Phấn Má 3CE Mood Recipe Face Blush', brand: '3CE', shade: 'Peach Splash / Rose Beige', category: 'Phấn má', priceRange: '260.000đ - 330.000đ', note: 'Tông cam đào chuẩn Hàn giúp gương mặt trẻ trung bừng sáng', url: makeSearchUrl('3CE', 'Mood Recipe Face Blush', 'Peach Splash') },
      { id: 'sp-b4', name: 'Phấn Má Clinique Cheek Pop', brand: 'Clinique', shade: '08 Melon Pop / 02 Peach Pop', category: 'Phấn má', priceRange: '620.000đ - 750.000đ', note: 'Chất phấn nung trong veo như màu nước ửng trên gò má', url: makeSearchUrl('Clinique', 'Cheek Pop', '08 Melon Pop') },
      { id: 'sp-b5', name: 'Má Hồng Kem Peripera Pure Blushed Sunshine Cheek', brand: 'Peripera', shade: '01 Calm Pink / 02 Milk Tea Coral', category: 'Phấn má', priceRange: '120.000đ - 165.000đ', note: 'Sắc san hô sữa ngọt ngào, dễ tán không bị vón cục', url: makeSearchUrl('Peripera', 'Pure Blushed Sunshine Cheek', '02 Milk Tea Coral') },
      { id: 'sp-b6', name: 'Phấn Má NARS Blush', brand: 'NARS', shade: 'Orgasm / Sex Appeal', category: 'Phấn má', priceRange: '790.000đ - 950.000đ', note: 'Hồng đào ánh nhũ vàng siêu sang cho mọi buổi tiệc', url: makeSearchUrl('NARS', 'Blush', 'Orgasm') },
      // Bảng khối & Bắt sáng (6)
      { id: 'sp-h1', name: 'Bảng Tạo Khối Too Cool For School Artclass By Rodin', brand: 'Too Cool For School', shade: '01 Classic', category: 'Bảng khối & Bắt sáng', priceRange: '240.000đ - 310.000đ', note: '3 ô nâu ấm tự nhiên, dễ pha màu tạo sống mũi thanh thoát', url: makeSearchUrl('Too Cool For School', 'Artclass By Rodin Shading', '01 Classic') },
      { id: 'sp-h2', name: 'Tạo Khối Judydoll Highlight & Contour Palette', brand: 'Judydoll', shade: '02 Warm Tone', category: 'Bảng khối & Bắt sáng', priceRange: '190.000đ - 250.000đ', note: 'Tích hợp cả khối mũi, phấn lì làm đầy rãnh cười và bắt sáng', url: makeSearchUrl('Judydoll', 'Highlight Contour Palette', '02 Warm') },
      { id: 'sp-h3', name: 'Bắt Sáng Clio Prism Air Highlighter', brand: 'Clio', shade: '01 Gold Sheer', category: 'Bảng khối & Bắt sáng', priceRange: '280.000đ - 350.000đ', note: 'Ánh vàng sâm panh mịn mượt tiệp vào da ấm không lộ hạt', url: makeSearchUrl('Clio', 'Prism Air Highlighter', '01 Gold Sheer') },
      { id: 'sp-h4', name: 'Bắt Sáng Fenty Beauty Killawatt Freestyle Highlighter', brand: 'Fenty Beauty', shade: 'Mean Money / Hu$tla Baby', category: 'Bảng khối & Bắt sáng', priceRange: '850.000đ - 1.050.000đ', note: 'Hiệu ứng bắt sáng ánh đào vàng lấp lánh nổi bật', url: makeSearchUrl('Fenty Beauty', 'Killawatt Highlighter', 'Hustla Baby') },
      { id: 'sp-h5', name: 'Bắt Sáng Cezanne Pearl Glow Highlight', brand: 'Cezanne', shade: '01 Champagne Beige', category: 'Bảng khối & Bắt sáng', priceRange: '180.000đ - 230.000đ', note: 'Bắt sáng nội địa Nhật siêu căng bóng cho sống mũi và đầu mắt', url: makeSearchUrl('Cezanne', 'Pearl Glow Highlight', '01 Champagne Beige') },
      { id: 'sp-h6', name: 'Tạo Khối Peripera Ink V-Shading', brand: 'Peripera', shade: '01 Almond Brown', category: 'Bảng khối & Bắt sáng', priceRange: '160.000đ - 210.000đ', note: 'Tông nâu hạnh nhân ấm áp, không bị xám xịt trên da Xuân', url: makeSearchUrl('Peripera', 'Ink V-Shading', '01 Almond Brown') },
      // Phấn mắt (6)
      { id: 'sp-e1', name: 'Bảng Phấn Mắt Dasique Shadow Palette', brand: 'Dasique', shade: '03 Nude Potion / 07 Milk Latte', category: 'Phấn mắt', priceRange: '420.000đ - 520.000đ', note: '9 ô màu đào sữa và nhũ kim tuyến lấp lánh chuẩn nàng thơ', url: makeSearchUrl('Dasique', 'Shadow Palette', '07 Milk Latte') },
      { id: 'sp-e2', name: 'Bảng Phấn Mắt Romand Better Than Palette', brand: 'Romand', shade: '01 Pampas Garden', category: 'Phấn mắt', priceRange: '340.000đ - 420.000đ', note: 'Bảng màu cam san hô và nâu sáng cực dễ phối hàng ngày', url: makeSearchUrl('Romand', 'Better Than Palette', '01 Pampas Garden') },
      { id: 'sp-e3', name: 'Bảng Phấn Mắt 3CE Multi Eye Color Palette', brand: '3CE', shade: 'Overtake / Smoother', category: 'Phấn mắt', priceRange: '520.000đ - 650.000đ', note: 'Overtake là bảng mắt quốc dân tôn mọi sắc da ấm', url: makeSearchUrl('3CE', 'Multi Eye Color Palette', 'Overtake') },
      { id: 'sp-e4', name: 'Bảng Phấn Mắt Clio Pro Eye Palette', brand: 'Clio', shade: '01 Simply Pink / 02 Brown Choux', category: 'Phấn mắt', priceRange: '380.000đ - 460.000đ', note: 'Chất phấn bám tốt, ô nhũ bắt sáng cực kỳ long lanh', url: makeSearchUrl('Clio', 'Pro Eye Palette', '02 Brown Choux') },
      { id: 'sp-e5', name: 'Bảng Mắt 4 Ô Judydoll Play Color', brand: 'Judydoll', shade: '05 Peach Tea', category: 'Phấn mắt', priceRange: '150.000đ - 195.000đ', note: 'Nhỏ gọn bỏ túi, đủ 4 bước lì – nhũ cho đôi mắt trà đào', url: makeSearchUrl('Judydoll', 'Bang Mat 4 O', 'Peach') },
      { id: 'sp-e6', name: 'Nhũ Mắt Dạng Lỏng Stila Glitter & Glow', brand: 'Stila', shade: 'Kitten Karma', category: 'Phấn mắt', priceRange: '580.000đ - 690.000đ', note: 'Nhũ vàng champagne chấm bọng mắt tạo hiệu ứng mắt cười', url: makeSearchUrl('Stila', 'Glitter Glow', 'Kitten Karma') },
      // Son môi (8)
      { id: 'sp-l1', name: 'Son Tint Bóng Romand Juicy Lasting Tint', brand: 'Romand', shade: '08 Apple Brown / 22 Pomelo Skin', category: 'Son môi', priceRange: '155.000đ - 195.000đ', note: 'Pomelo Skin màu cam đào nude cực tự nhiên cho nền môi sáng', url: makeSearchUrl('Romand', 'Juicy Lasting Tint', '22 Pomelo Skin') },
      { id: 'sp-l2', name: 'Son Tint Lì Etude Fixing Tint', brand: 'Etude', shade: '04 Ginger Milk Tea / 05 Midnight Mauve', category: 'Son môi', priceRange: '170.000đ - 220.000đ', note: 'Không dính khẩu trang, màu trà sữa gừng ấm áp thanh lịch', url: makeSearchUrl('Etude', 'Fixing Tint', '04 Ginger Milk Tea') },
      { id: 'sp-l3', name: 'Son Bóng YSL Candy Glaze Lip Gloss Stick', brand: 'YSL', shade: '02 Healthy Glow Plumper / 05 Pink Satisfaction', category: 'Son môi', priceRange: '890.000đ - 1.050.000đ', note: 'Dưỡng môi căng mọng như kẹo, sang trọng từng đường lướt', url: makeSearchUrl('YSL', 'Candy Glaze', '05') },
      { id: 'sp-l4', name: 'Son Kem Lì 3CE Velvet Lip Tint', brand: '3CE', shade: 'Daffodil / Near And Dear', category: 'Son môi', priceRange: '240.000đ - 310.000đ', note: 'Daffodil (đỏ đất ánh đào) làm trắng răng và sáng bừng da Xuân', url: makeSearchUrl('3CE', 'Velvet Lip Tint', 'Daffodil') },
      { id: 'sp-l5', name: 'Son Dưỡng Có Màu Dior Addict Lip Glow', brand: 'Dior', shade: '004 Coral / 012 Rosewood', category: 'Son môi', priceRange: '850.000đ - 980.000đ', note: '004 Coral dưỡng môi hồng cam san hô tươi tắn cả ngày', url: makeSearchUrl('Dior', 'Addict Lip Glow', '004 Coral') },
      { id: 'sp-l6', name: 'Son Bóng Peripera Ink Mood Glowy Tint', brand: 'Peripera', shade: '01 Best Beige Menu / 02 Coral Influencer', category: 'Son môi', priceRange: '150.000đ - 190.000đ', note: 'Hiệu ứng tráng gương căng bóng, màu san hô tươi ngọt ngào', url: makeSearchUrl('Peripera', 'Ink Mood Glowy Tint', '02 Coral Influencer') },
      { id: 'sp-l7', name: 'Son Thỏi MAC Powder Kiss Lipstick', brand: 'MAC', shade: 'Mull It Over / Devoted To Chili', category: 'Son môi', priceRange: '520.000đ - 620.000đ', note: 'Mull It Over màu hồng đào đất mịn lì như nhung', url: makeSearchUrl('MAC', 'Powder Kiss Lipstick', 'Mull It Over') },
      { id: 'sp-l8', name: 'Son Tint Nước Amuse Dew Tint', brand: 'Amuse', shade: '01 La Vie En Coral / 06 Fig Dew', category: 'Son môi', priceRange: '280.000đ - 350.000đ', note: 'Thuần chay lành tính, lên màu san hô trong veo cực xinh', url: makeSearchUrl('Amuse', 'Dew Tint', '01 La Vie En Coral') },
      // Xịt khóa nền (5)
      { id: 'sp-s1', name: 'Xịt Khóa Nền Urban Decay All Nighter Setting Spray', brand: 'Urban Decay', shade: 'Original', category: 'Xịt khóa nền', priceRange: '780.000đ - 950.000đ', note: 'Giữ lớp trang điểm bền đẹp tới 16 giờ không xuống tông', url: makeSearchUrl('Urban Decay', 'All Nighter Setting Spray', '') },
      { id: 'sp-s2', name: 'Xịt Khóa Nền Căng Bóng MAC Prep + Prime Fix+', brand: 'MAC', shade: 'Original / Rose', category: 'Xịt khóa nền', priceRange: '650.000đ - 790.000đ', note: 'Xóa bỏ cảm giác bột phấn, giúp nền hòa quyện căng bóng tự nhiên', url: makeSearchUrl('MAC', 'Prep Prime Fix+', '') },
      { id: 'sp-s3', name: 'Xịt Khóa Nền Zeesea Lasting Makeup Setting Spray', brand: 'Zeesea', shade: 'Nắp Hồng Căng Bóng', category: 'Xịt khóa nền', priceRange: '135.000đ - 180.000đ', note: 'Tia sương siêu mịn, tạo màng khóa nền bóng nhẹ giá mềm', url: makeSearchUrl('Zeesea', 'Xit Khoa Nen', 'Nap Hong') },
      { id: 'sp-s4', name: 'Xịt Khóa Nền Charlotte Tilbury Airbrush Flawless Setting Spray', brand: 'Charlotte Tilbury', shade: '100ml', category: 'Xịt khóa nền', priceRange: '920.000đ - 1.150.000đ', note: 'Khóa nền lì mịn không trôi ngay cả khi hoạt động ngoài trời', url: makeSearchUrl('Charlotte Tilbury', 'Airbrush Flawless Setting Spray', '') },
      { id: 'sp-s5', name: 'Xịt Khóa Nền So Natural All Day Tight Make Up Setting Fixx', brand: 'So Natural', shade: '75ml', category: 'Xịt khóa nền', priceRange: '260.000đ - 330.000đ', note: 'Sản phẩm được các makeup artist Hàn Quốc ưa chuộng', url: makeSearchUrl('So Natural', 'Make Up Setting Fixx', '') },
    ],
  },

  summer: {
    key: 'summer',
    name: 'Mùa Hạ Dịu Mát',
    englishName: 'Summer Cool & Soft',
    subtitle: 'Thanh lịch • Dịu dàng • Tinh tế • Khí chất nàng thơ',
    palette: ['#F4C2C2', '#D8BFD8', '#B0E0E6', '#E6E6FA', '#C5B4E3', '#DDA0DD'],
    paletteNames: ['Hồng phấn pastel', 'Tím hoa oải hương', 'Xanh baby blue', 'Tím sương mờ', 'Hồng cánh sen dịu', 'Xám bạc thanh lịch'],
    description:
      'Bạn mang sắc tố da lạnh dịu (Cool & Soft Undertone) với độ tương phản mềm mại. Vẻ đẹp của bạn tỏa sáng nhất trong các gam màu pastel pha ánh sương mờ: hồng phấn baby, hồng hoa anh đào, tím lavender, xanh baby blue và xám bạc thanh thoát.',
    characteristics: [
      'Sắc tố ẩn dưới da thiên hồng phấn, hồng tím hoặc xanh dịu.',
      'Độ tương phản khuôn mặt thấp – dịu, đường nét mềm mại thanh thoát.',
      'Hợp trang sức bạc sáng mờ, bạch kim, vàng trắng và ngọc trai trắng.',
      'Lớp nền mịn như sương (Soft Satin) cùng má hồng lavender/hồng phấn cực tôn da.',
    ],
    bestJewelry: 'Bạc 925 ánh mờ, Bạch kim, Vàng trắng, Ngọc trai trắng thuần khiết',
    hairColors: ['Nâu tro lạnh (Ash Brown)', 'Nâu khói dịu', 'Nâu hồng sương', 'Đen khói tự nhiên'],
    makeupLooks: [
      {
        title: 'Nàng Thơ Sương Mai (Soft Rose Mist)',
        style: 'Trang điểm hàng ngày trong trẻo, nhẹ nhàng chuẩn Hàn',
        base: 'Kem lót hiệu chỉnh sắc vàng (màu tím/hồng), cushion tông Cool Ivory mịn lì tự nhiên.',
        eyes: 'Phấn mắt hồng tro nhạt và nâu khói lạnh, nhũ ngọc trai trắng bạc ở bọng mắt.',
        cheeks: 'Phấn má tím lavender nhạt phủ làm sáng bọng mắt, kết hợp hồng phấn baby ở gò má.',
        lips: 'Son tint bóng màu hồng cánh hoa (Mauve Pink) hoặc hồng mận nhạt.',
      },
      {
        title: 'Tiểu Thư Ballet (Balletcore Pastel)',
        style: 'Đi chơi, chụp ảnh, hẹn hò lãng mạn ngọt ngào',
        base: 'Kem nền bán lì mỏng nhẹ, che khuyết điểm hồng sáng nâng vùng chữ T.',
        eyes: 'Phấn mắt hồng tím pastel, kẻ eyeliner màu nâu xám mảnh kéo dài đuôi mắt.',
        cheeks: 'Tán má hồng baby kiểu say rượu nhẹ nhàng ngang gò má, thêm bắt sáng ánh ngọc trai.',
        lips: 'Son bóng căng mọng màu hồng dâu sữa pha chút ánh tím lạnh.',
      },
      {
        title: 'Thanh Nhã Tiệc Tối (Cool Mauve Elegance)',
        style: 'Dự tiệc, sự kiện sang trọng tinh tế',
        base: 'Kem lót kiềm dầu mịn lỗ chân lông, kem nền độ che phủ cao khóa bằng phấn bột.',
        eyes: 'Đánh mắt khói nâu tro dịu kết hợp nhũ kim cương ánh bạc lấp lánh giữa bầu mắt.',
        cheeks: 'Tạo khối nâu xám lạnh (không ánh vàng), má hồng mận nhạt tinh tế.',
        lips: 'Son kem lì mịn màu hồng gỗ lạnh hoặc đỏ hồng berry sang trọng.',
      },
    ],
    avoidColors: ['Cam tươi rực', 'Vàng nghệ / vàng mù tạt', 'Nâu cam đất đậm', 'Vàng đồng ánh kim gắt'],
    products: [
      // Kem dưỡng ẩm (5)
      { id: 'su-m1', name: 'Kem Dưỡng Ẩm Rau Má Skin1004 Madagascar Centella Soothing Cream', brand: 'Skin1004', shade: '75ml', category: 'Kem dưỡng ẩm', priceRange: '240.000đ - 310.000đ', note: 'Làm dịu da ửng đỏ tức thì, cấp ẩm nhẹ nhàng không nhờn rít', url: makeSearchUrl('Skin1004', 'Centella Soothing Cream', '') },
      { id: 'su-m2', name: 'Kem Dưỡng Ẩm Round Lab 1025 Dokdo Cream', brand: 'Round Lab', shade: '80ml', category: 'Kem dưỡng ẩm', priceRange: '350.000đ - 440.000đ', note: 'Giữ ẩm cân bằng giúp lớp nền mịn như nhung suốt ngày', url: makeSearchUrl('Round Lab', '1025 Dokdo Cream', '') },
      { id: 'su-m3', name: 'Kem Dưỡng Bioderma Cicabio Crème', brand: 'Bioderma', shade: '40ml', category: 'Kem dưỡng ẩm', priceRange: '290.000đ - 360.000đ', note: 'Làm dịu vùng da nhạy cảm và khóa ẩm mềm mại', url: makeSearchUrl('Bioderma', 'Cicabio Creme', '') },
      { id: 'su-m4', name: 'Kem Dưỡng Ẩm Kiehl’s Ultra Facial Cream', brand: 'Kiehl’s', shade: '50ml', category: 'Kem dưỡng ẩm', priceRange: '850.000đ - 1.050.000đ', note: 'Cấp ẩm 24 giờ cho bề mặt da mềm mịn không mốc phấn', url: makeSearchUrl('Kiehls', 'Ultra Facial Cream', '') },
      { id: 'su-m5', name: 'Kem Dưỡng Ẩm Illiyoon Ceramide Ato Concentrate Cream', brand: 'Illiyoon', shade: '75ml', category: 'Kem dưỡng ẩm', priceRange: '190.000đ - 250.000đ', note: 'Lành tính tuyệt đối, phục hồi hàng rào bảo vệ da khỏe mạnh', url: makeSearchUrl('Illiyoon', 'Ceramide Ato Cream', '') },
      // Kem lót (5)
      { id: 'su-p1', name: 'Kem Lót Hiệu Chỉnh Sắc Da Laneige Skin Veil Base', brand: 'Laneige', shade: '40 Pure Violet (Màu Tím)', category: 'Kem lót', priceRange: '580.000đ - 690.000đ', note: 'Sắc tím lavender trung hòa ánh vàng giúp da sáng trong veo', url: makeSearchUrl('Laneige', 'Skin Veil Base', '40 Pure Violet') },
      { id: 'su-p2', name: 'Kem Lót Kiềm Dầu Maybelline Fit Me Matte + Poreless Primer', brand: 'Maybelline', shade: '30ml', category: 'Kem lót', priceRange: '160.000đ - 210.000đ', note: 'Làm mờ lỗ chân lông và giữ lớp nền ráo mịn tự nhiên', url: makeSearchUrl('Maybelline', 'Fit Me Primer', '') },
      { id: 'su-p3', name: 'Kem Lót Nâng Tông Innisfree Tone Up No Sebum Sunscreen', brand: 'Innisfree', shade: '50ml', category: 'Kem lót', priceRange: '240.000đ - 300.000đ', note: 'Nâng tông hồng phấn nhẹ nhàng, kiềm dầu cực tốt', url: makeSearchUrl('Innisfree', 'Tone Up No Sebum', '') },
      { id: 'su-p4', name: 'Kem Lót Laura Mercier Pure Canvas Primer Blurring', brand: 'Laura Mercier', shade: 'Blurring', category: 'Kem lót', priceRange: '920.000đ - 1.150.000đ', note: 'Tạo hiệu ứng làn da mờ sương chuẩn khí chất Mùa Hạ', url: makeSearchUrl('Laura Mercier', 'Pure Canvas Primer Blurring', '') },
      { id: 'su-p5', name: 'Kem Lót Bắt Sáng MAC Strobe Cream', brand: 'MAC', shade: 'Pinklite', category: 'Kem lót', priceRange: '850.000đ - 1.050.000đ', note: 'Ánh ngọc trai hồng lạnh giúp da bừng sáng thanh thoát', url: makeSearchUrl('MAC', 'Strobe Cream', 'Pinklite') },
      // Kem nền & Cushion (6)
      { id: 'su-f1', name: 'Cushion Laneige Neo Cushion Matte', brand: 'Laneige', shade: '17C1 / 21C1 Cool Beige', category: 'Kem nền', priceRange: '680.000đ - 820.000đ', note: 'Tông C (Cool) ánh hồng nhẹ, lớp nền mịn lì bền màu', url: makeSearchUrl('Laneige', 'Neo Cushion Matte', '21C1') },
      { id: 'su-f2', name: 'Kem Nền Dior Forever Skin Glow / Matte', brand: 'Dior', shade: '1CR / 2CR Cool Rosy', category: 'Kem nền', priceRange: '1.350.000đ - 1.580.000đ', note: 'Mã CR (Cool Rosy) sinh ra dành riêng cho làn da tông lạnh', url: makeSearchUrl('Dior', 'Forever Foundation', '1CR') },
      { id: 'su-f3', name: 'Cushion Romand Nu Zero Cushion', brand: 'Romand', shade: '02 Pure 21 (Hồng sáng)', category: 'Kem nền', priceRange: '270.000đ - 340.000đ', note: 'Mỏng nhẹ tự nhiên, che phủ lỗ chân lông mịn màng', url: makeSearchUrl('Romand', 'Nu Zero Cushion', '02 Pure 21') },
      { id: 'su-f4', name: 'Kem Nền Estée Lauder Double Wear', brand: 'Estée Lauder', shade: '1C1 Cool Bone / 2C0 Cool Vanilla', category: 'Kem nền', priceRange: '1.150.000đ - 1.380.000đ', note: 'Mã C giúp da giữ sắc hồng tươi tắn suốt cả ngày không bị xỉn vàng', url: makeSearchUrl('Estee Lauder', 'Double Wear', '1C1 Cool Bone') },
      { id: 'su-f5', name: 'Cushion Espoir Pro Tailor Be Velvet Cover', brand: 'Espoir', shade: '21 Ivory / 22 Petal', category: 'Kem nền', priceRange: '450.000đ - 560.000đ', note: 'Lớp nền nhung mịn lì, tông Petal ánh hồng cực kỳ tôn da', url: makeSearchUrl('Espoir', 'Be Velvet Cushion', '22 Petal') },
      { id: 'su-f6', name: 'Kem Nền L’Oréal Infallible 32H Fresh Wear', brand: 'L’Oréal', shade: '120 Vanilla / 125 Natural Rose', category: 'Kem nền', priceRange: '250.000đ - 320.000đ', note: 'Bền màu, thoáng da và lên tông hồng sáng tự nhiên', url: makeSearchUrl('LOreal', 'Infallible Fresh Wear', '125 Natural Rose') },
      // Che khuyết điểm & Phấn phủ (5)
      { id: 'su-c1', name: 'Che Khuyết Điểm Clio Kill Cover Founwear Concealer', brand: 'Clio', shade: '02 Lingerie (Hồng sáng)', category: 'Che khuyết điểm & Phấn phủ', priceRange: '180.000đ - 230.000đ', note: 'Che phủ tốt mà không bị vàng trên nền da tông lạnh', url: makeSearchUrl('Clio', 'Kill Cover Concealer', '02 Lingerie') },
      { id: 'su-c2', name: 'Bảng Triệt Sắc Che Khuyết Điểm Dasique Pro Concealer Palette', brand: 'Dasique', shade: '01 Cover', category: 'Che khuyết điểm & Phấn phủ', priceRange: '380.000đ - 460.000đ', note: 'Có ô hồng đào và tím nhạt giúp triệt quầng thâm mắt cực chuẩn', url: makeSearchUrl('Dasique', 'Pro Concealer Palette', '01 Cover') },
      { id: 'su-c3', name: 'Phấn Phủ Bột Givenchy Prisme Libre Loose Powder', brand: 'Givenchy', shade: '01 Mousseline Pastel', category: 'Che khuyết điểm & Phấn phủ', priceRange: '1.350.000đ - 1.650.000đ', note: '4 ô bột pastel (tím, hồng, xanh, trắng) làm sáng da như sương', url: makeSearchUrl('Givenchy', 'Prisme Libre Powder', '01 Mousseline Pastel') },
      { id: 'su-c4', name: 'Phấn Phủ Eglips / About Tone Blur Powder Pact', brand: 'About Tone', shade: '01 Fair / 02 Light', category: 'Che khuyết điểm & Phấn phủ', priceRange: '150.000đ - 195.000đ', note: 'Hiệu ứng làm mờ lỗ chân lông mịn mượt giá hạt dẻ', url: makeSearchUrl('About Tone', 'Blur Powder Pact', '01 Fair') },
      { id: 'su-c5', name: 'Phấn Phủ Bột Make Up For Ever Ultra HD Loose Powder', brand: 'Make Up For Ever', shade: 'Translucent', category: 'Che khuyết điểm & Phấn phủ', priceRange: '890.000đ - 1.050.000đ', note: 'Hạt phấn siêu tơi không màu, giữ lớp nền tự nhiên tuyệt đối', url: makeSearchUrl('Make Up For Ever', 'Ultra HD Loose Powder', '') },
      // Phấn má (6)
      { id: 'su-b1', name: 'Phấn Má Romand Better Than Cheek', brand: 'Romand', shade: 'C02 Blueberry Chip / W02 Strawberry Milk', category: 'Phấn má', priceRange: '150.000đ - 195.000đ', note: 'Strawberry Milk (hồng sữa) là màu má kinh điển của Mùa Hạ', url: makeSearchUrl('Romand', 'Better Than Cheek', 'W02 Strawberry Milk') },
      { id: 'su-b2', name: 'Phấn Má Clinique Cheek Pop', brand: 'Clinique', shade: '15 Pansy Pop / 21 Ballerina Pop', category: 'Phấn má', priceRange: '620.000đ - 750.000đ', note: '15 Pansy Pop (tím hoa păng-xê) giúp da trắng bật tông thần kỳ', url: makeSearchUrl('Clinique', 'Cheek Pop', '15 Pansy Pop') },
      { id: 'su-b3', name: 'Má Hồng Kem Rare Beauty Soft Pinch Liquid Blush', brand: 'Rare Beauty', shade: 'Happy / Hope', category: 'Phấn má', priceRange: '680.000đ - 820.000đ', note: 'Happy (hồng phấn lạnh) mang lại gò má ửng hồng thanh tao', url: makeSearchUrl('Rare Beauty', 'Soft Pinch Liquid Blush', 'Happy') },
      { id: 'su-b4', name: 'Phấn Má 3CE Mood Recipe Face Blush', brand: '3CE', shade: 'Delectable / City Mauve', category: 'Phấn má', priceRange: '260.000đ - 330.000đ', note: 'Sắc hồng tím sương mờ dịu dàng chuẩn phong cách Hàn Quốc', url: makeSearchUrl('3CE', 'Mood Recipe Face Blush', 'Delectable') },
      { id: 'su-b5', name: 'Phấn Má Peripera Pure Blushed Sunshine Cheek', brand: 'Peripera', shade: '06 Morning Blush / 11 Picnic Pink', category: 'Phấn má', priceRange: '120.000đ - 165.000đ', note: 'Hồng phấn pastel nhẹ nhàng không bao giờ sợ bị lố tay', url: makeSearchUrl('Peripera', 'Pure Blushed Sunshine Cheek', '06 Morning Blush') },
      { id: 'su-b6', name: 'Phấn Má Dior Backstage Rosy Glow', brand: 'Dior', shade: '001 Pink', category: 'Phấn má', priceRange: '980.000đ - 1.180.000đ', note: 'Tự điều chỉnh theo độ ẩm da tạo sắc hồng baby trong veo', url: makeSearchUrl('Dior', 'Rosy Glow Blush', '001 Pink') },
      // Bảng khối & Bắt sáng (6)
      { id: 'su-h1', name: 'Bảng Tạo Khối Too Cool For School Artclass By Rodin', brand: 'Too Cool For School', shade: '02 Modern (Tông Lạnh)', category: 'Bảng khối & Bắt sáng', priceRange: '240.000đ - 310.000đ', note: 'Mã 02 Modern nâu xám tro không ánh vàng cực kỳ tự nhiên', url: makeSearchUrl('Too Cool For School', 'Artclass By Rodin Shading', '02 Modern') },
      { id: 'su-h2', name: 'Tạo Khối Judydoll Highlight & Contour Palette', brand: 'Judydoll', shade: '01 Cool Tone (Tông Lạnh)', category: 'Bảng khối & Bắt sáng', priceRange: '190.000đ - 250.000đ', note: 'Ô khối xám khói chuẩn cho sống mũi thanh tú không bị dơ', url: makeSearchUrl('Judydoll', 'Highlight Contour Palette', '01 Cool') },
      { id: 'su-h3', name: 'Bắt Sáng Clio Prism Air Highlighter', brand: 'Clio', shade: '02 Fairy Pink', category: 'Bảng khối & Bắt sáng', priceRange: '280.000đ - 350.000đ', note: 'Ánh ngọc trai hồng bạc lung linh như sương trên gò má', url: makeSearchUrl('Clio', 'Prism Air Highlighter', '02 Fairy Pink') },
      { id: 'su-h4', name: 'Bắt Sáng Dior Backstage Glow Face Palette', brand: 'Dior', shade: '001 Universal', category: 'Bảng khối & Bắt sáng', priceRange: '1.250.000đ - 1.480.000đ', note: 'Ô trắng ngọc trai và hồng phấn bắt sáng tinh tế đẳng cấp', url: makeSearchUrl('Dior', 'Backstage Glow Face Palette', '001') },
      { id: 'su-h5', name: 'Bắt Sáng Romand See-Through Veil Lighter', brand: 'Romand', shade: '02 Moonkissed Veil', category: 'Bảng khối & Bắt sáng', priceRange: '190.000đ - 240.000đ', note: 'Ánh hồng tím lạnh nhẹ nhàng, hạt nhũ siêu mịn như lụa', url: makeSearchUrl('Romand', 'See-Through Veil Lighter', '02') },
      { id: 'su-h6', name: 'Tạo Khối Peripera Ink V-Shading', brand: 'Peripera', shade: '03 Hazel Gray', category: 'Bảng khối & Bắt sáng', priceRange: '160.000đ - 210.000đ', note: 'Nâu xám hạt phỉ dành riêng cho undertone lạnh', url: makeSearchUrl('Peripera', 'Ink V-Shading', '03 Hazel Gray') },
      // Phấn mắt (6)
      { id: 'su-e1', name: 'Bảng Phấn Mắt Romand Better Than Palette', brand: 'Romand', shade: '03 Rosebud Garden / 06 Peony Nude Garden', category: 'Phấn mắt', priceRange: '340.000đ - 420.000đ', note: 'Bảng màu hồng hoa mẫu đơn và nâu khói dịu chuẩn Mùa Hạ', url: makeSearchUrl('Romand', 'Better Than Palette', '06 Peony Nude Garden') },
      { id: 'su-e2', name: 'Bảng Phấn Mắt Dasique Shadow Palette', brand: 'Dasique', shade: '04 Pastel Dream / 13 Cool Blending', category: 'Phấn mắt', priceRange: '420.000đ - 520.000đ', note: '13 Cool Blending hội tụ đủ sắc hồng tro, tím sương và nhũ bạc', url: makeSearchUrl('Dasique', 'Shadow Palette', '13 Cool Blending') },
      { id: 'su-e3', name: 'Bảng Phấn Mắt Clio Pro Eye Palette', brand: 'Clio', shade: '11 Walking On The Cosy Alley / 13 Picnic By The Sunset', category: 'Phấn mắt', priceRange: '380.000đ - 460.000đ', note: 'Tông hồng tím lạnh dịu dàng dễ dùng cho cả đi làm và đi tiệc', url: makeSearchUrl('Clio', 'Pro Eye Palette', '13 Picnic By The Sunset') },
      { id: 'su-e4', name: 'Bảng Phấn Mắt 3CE Multi Eye Color Palette', brand: '3CE', shade: 'Auto Focus / Some Def', category: 'Phấn mắt', priceRange: '520.000đ - 650.000đ', note: 'Some Def tông tím khói pastel sang trọng, lạ mắt', url: makeSearchUrl('3CE', 'Multi Eye Color Palette', 'Some Def') },
      { id: 'su-e5', name: 'Bảng Mắt 4 Ô Romand Better Than Eyes', brand: 'Romand', shade: '02 Dry Rose / W01 Dry Lavender', category: 'Phấn mắt', priceRange: '185.000đ - 230.000đ', note: 'Nhỏ gọn, tông hoa hồng khô và oải hương cực kỳ thanh lịch', url: makeSearchUrl('Romand', 'Better Than Eyes', 'W01 Dry Lavender') },
      { id: 'su-e6', name: 'Nhũ Mắt Dạng Lỏng Peripera Sugar Twinkle Liquid Glitter', brand: 'Peripera', shade: '01 Glitter Wave', category: 'Phấn mắt', priceRange: '130.000đ - 170.000đ', note: 'Nhũ trắng bạc ánh hồng tạo đôi mắt long lanh như nước', url: makeSearchUrl('Peripera', 'Sugar Twinkle Liquid Glitter', '01') },
      // Son môi (8)
      { id: 'su-l1', name: 'Son Tint Bóng Romand Juicy Lasting Tint', brand: 'Romand', shade: '25 Bare Grape / 06 Figfig', category: 'Son môi', priceRange: '155.000đ - 195.000đ', note: '25 Bare Grape (hồng nho sữa) là thỏi son chân ái của Mùa Hạ', url: makeSearchUrl('Romand', 'Juicy Lasting Tint', '25 Bare Grape') },
      { id: 'su-l2', name: 'Son Tint Lì Etude Fixing Tint', brand: 'Etude', shade: '05 Midnight Mauve / 07 Cranberry Plum', category: 'Son môi', priceRange: '170.000đ - 220.000đ', note: 'Hồng tím trầm nhẹ nhàng, bám màu tốt không lem khẩu trang', url: makeSearchUrl('Etude', 'Fixing Tint', '05 Midnight Mauve') },
      { id: 'su-l3', name: 'Son Dưỡng Có Màu Dior Addict Lip Glow', brand: 'Dior', shade: '001 Pink / 007 Raspberry', category: 'Son môi', priceRange: '850.000đ - 980.000đ', note: '001 Pink hồng baby tự nhiên tôn lên sắc da sáng lạnh', url: makeSearchUrl('Dior', 'Addict Lip Glow', '001 Pink') },
      { id: 'su-l4', name: 'Son Kem Lì Black Rouge Air Fit Velvet Tint', brand: 'Black Rouge', shade: 'A11 Tanned Camellia / A31', category: 'Son môi', priceRange: '140.000đ - 180.000đ', note: 'Hồng cháy pha ánh lạnh giúp gương mặt tươi tắn mà vẫn dịu mắt', url: makeSearchUrl('Black Rouge', 'Air Fit Velvet Tint', 'A11') },
      { id: 'su-l5', name: 'Son Bóng Peripera Ink Mood Glowy Tint', brand: 'Peripera', shade: '03 Rose In Mind / 11 Brown Heaven', category: 'Son môi', priceRange: '150.000đ - 190.000đ', note: '03 Rose In Mind sắc hồng cánh sen dịu căng mọng quyến rũ', url: makeSearchUrl('Peripera', 'Ink Mood Glowy Tint', '03 Rose In Mind') },
      { id: 'su-l6', name: 'Son Thỏi MAC Powder Kiss Lipstick', brand: 'MAC', shade: 'Sultriness / Mehr', category: 'Son môi', priceRange: '520.000đ - 620.000đ', note: 'Sultriness màu hồng baby lạnh sang trọng chuẩn tiểu thư', url: makeSearchUrl('MAC', 'Powder Kiss Lipstick', 'Sultriness') },
      { id: 'su-l7', name: 'Son Kem Lì 3CE Blur Water Tint', brand: '3CE', shade: 'Laydown / Sepia', category: 'Son môi', priceRange: '240.000đ - 310.000đ', note: 'Chất son nước lì nhẹ tênh, sắc hồng trà sữa thanh tao', url: makeSearchUrl('3CE', 'Blur Water Tint', 'Laydown') },
      { id: 'su-l8', name: 'Son Bóng YSL Loveshine Lip Oil Stick', brand: 'YSL', shade: '44 Nude Lavallière', category: 'Son môi', priceRange: '920.000đ - 1.080.000đ', note: 'Màu hồng gỗ lạnh siêu sang, dưỡng môi mềm mượt suốt ngày', url: makeSearchUrl('YSL', 'Loveshine', '44') },
      // Xịt khóa nền (5)
      { id: 'su-s1', name: 'Xịt Khóa Nền Make Up For Ever Mist & Fix Matte', brand: 'Make Up For Ever', shade: 'Matte 100ml', category: 'Xịt khóa nền', priceRange: '780.000đ - 920.000đ', note: 'Khóa nền lì mịn như sương, kiềm dầu nhẹ nhàng không khô căng', url: makeSearchUrl('Make Up For Ever', 'Mist Fix Matte', '') },
      { id: 'su-s2', name: 'Xịt Khóa Nền Urban Decay All Nighter', brand: 'Urban Decay', shade: 'Original', category: 'Xịt khóa nền', priceRange: '780.000đ - 950.000đ', note: 'Giữ màu má hồng pastel và lớp nền nguyên vẹn suốt cả ngày', url: makeSearchUrl('Urban Decay', 'All Nighter Setting Spray', '') },
      { id: 'su-s3', name: 'Xịt Khóa Nền Zeesea Lasting Makeup Setting Spray', brand: 'Zeesea', shade: 'Nắp Đen Kiềm Dầu', category: 'Xịt khóa nền', priceRange: '135.000đ - 180.000đ', note: 'Tạo lớp màng lì mỏng nhẹ giúp nền không bị xuống tông', url: makeSearchUrl('Zeesea', 'Xit Khoa Nen', 'Nap Den') },
      { id: 'su-s4', name: 'Xịt Khóa Nền Benefit The POREfessional Super Setter', brand: 'Benefit', shade: '120ml', category: 'Xịt khóa nền', priceRange: '820.000đ - 980.000đ', note: 'Tia sương siêu mịn làm mờ lỗ chân lông và khóa nền bền chặt', url: makeSearchUrl('Benefit', 'Super Setter Spray', '') },
      { id: 'su-s5', name: 'Xịt Khóa Nền NYX Matte Finish Makeup Setting Spray', brand: 'NYX', shade: 'Matte Finish', category: 'Xịt khóa nền', priceRange: '240.000đ - 300.000đ', note: 'Lựa chọn bình dân giữ lớp trang điểm ráo mịn suốt 8 tiếng', url: makeSearchUrl('NYX', 'Matte Finish Setting Spray', '') },
    ],
  },

  autumn: {
    key: 'autumn',
    name: 'Mùa Thu Trầm Ấm',
    englishName: 'Autumn Warm & Deep',
    subtitle: 'Sang trọng • Cổ điển • Cuốn hút • Chiều sâu quyến rũ',
    palette: ['#C87D55', '#A0522D', '#D4A373', '#808000', '#B5651D', '#8B3A3A'],
    paletteNames: ['Cam đất ấm', 'Nâu socola', 'Be lạc đà (Camel)', 'Xanh rêu ô-liu', 'Nâu đồng hổ phách', 'Đỏ gạch trầm'],
    description:
      'Bạn sở hữu sắc tố da ấm trầm (Warm & Deep Undertone) mang vẻ đẹp cổ điển, sang trọng và đầy chiều sâu. Những gam màu của lá thu như cam đất, đỏ gạch, nâu socola, be lạc đà và ánh nhũ vàng đồng sẽ tôn vinh khí chất cuốn hút riêng biệt của bạn.',
    characteristics: [
      'Sắc tố ẩn dưới da thiên vàng mật ong, đồng ấm hoặc be ô-liu trầm.',
      'Ánh nhìn sâu lắng, mái tóc nâu sẫm hoặc nâu hạt dẻ đậm hài hòa.',
      'Hợp trang sức vàng đồng cổ điển, vàng 18K đậm, hổ phách và đồi mồi.',
      'Lớp nền bán lì (Natural Matte) cùng son cam cháy/đỏ gạch cực kỳ sang chảnh.',
    ],
    bestJewelry: 'Vàng 18K đậm, Vàng đồng cổ điển, Trang sức hổ phách & đá tự nhiên ấm',
    hairColors: ['Nâu socola đậm', 'Nâu hạt dẻ trầm', 'Nâu đồng ấm', 'Nâu rêu trầm'],
    makeupLooks: [
      {
        title: 'Nàng Thu Cổ Điển (Toasted Latte)',
        style: 'Trang điểm đi làm, gặp gỡ đối tác sang trọng tinh tế',
        base: 'Kem nền bán lì tiệp màu da tự nhiên (Warm Beige/Honey), che khuyết điểm kỹ vùng khóe mũi.',
        eyes: 'Phấn mắt nâu cà phê sữa tán hốc mắt sâu, nhấn nhũ đồng mịn ở giữa bầu mắt.',
        cheeks: 'Phấn má màu cam đất hoặc hồng đất trầm tán xéo gò má tạo nét thanh tú.',
        lips: 'Son kem lì mịn màu cam đất hoặc hồng nâu trầm thanh lịch.',
      },
      {
        title: 'Hoàng Hôn Rực Rỡ (Terracotta Sunset)',
        style: 'Dạo phố, chụp ảnh nghệ thuật phong cách Tây ấm áp',
        base: 'Kem lót làm mịn lỗ chân lông, nền lì tự nhiên phủ phấn bronzer ấm quanh viền mặt.',
        eyes: 'Phấn mắt tông cam cháy kết hợp eyeliner nâu đậm kéo đuôi sắc nhẹ.',
        cheeks: 'Tán má màu cam gạch ấm áp nối liền qua sống mũi tạo hiệu ứng rám nắng khỏe khoắn.',
        lips: 'Son thỏi lì màu đỏ gạch hoặc cam cháy quyến rũ.',
      },
      {
        title: 'Dạ Tiệc Quyền Lực (Amber & Spice Glam)',
        style: 'Tiệc tối, sự kiện nổi bật đầy lôi cuốn',
        base: 'Kem nền độ che phủ cao bền màu, khóa nền kỹ bằng phấn bột và xịt khóa lì.',
        eyes: 'Mắt khói nâu đồng ánh kim tuyến vàng hổ phách, chuốt mi dày quyến rũ.',
        cheeks: 'Tạo khối sắc nét kết hợp bắt sáng ánh vàng đồng trên đỉnh gò má.',
        lips: 'Son đỏ nâu trầm hoặc đỏ rượu vang ấm áp đầy quyền lực.',
      },
    ],
    avoidColors: ['Hồng phấn neon lạnh', 'Tím lavender nhạt', 'Xanh dương sáng chói', 'Bạc ánh thép lạnh'],
    products: [
      // Kem dưỡng ẩm (5)
      { id: 'au-m1', name: 'Kem Dưỡng Ẩm Kiehl’s Ultra Facial Oil-Free Gel Cream', brand: 'Kiehl’s', shade: '50ml', category: 'Kem dưỡng ẩm', priceRange: '850.000đ - 1.050.000đ', note: 'Cấp nước ráo mịn không gây bóng dầu cho lớp nền bán lì', url: makeSearchUrl('Kiehls', 'Ultra Facial Oil Free Gel Cream', '') },
      { id: 'au-m2', name: 'Kem Dưỡng Ẩm Neutrogena Hydro Boost Water Gel', brand: 'Neutrogena', shade: '50g', category: 'Kem dưỡng ẩm', priceRange: '280.000đ - 350.000đ', note: 'Thấm nhanh tức thì, giữ da mềm mượt dưới lớp kem nền', url: makeSearchUrl('Neutrogena', 'Hydro Boost Water Gel', '') },
      { id: 'au-m3', name: 'Kem Dưỡng Ẩm Cerave Moisturizing Lotion', brand: 'CeraVe', shade: '88ml / 236ml', category: 'Kem dưỡng ẩm', priceRange: '250.000đ - 340.000đ', note: 'Chứa Ceramide phục hồi da khỏe mịn không bong tróc', url: makeSearchUrl('CeraVe', 'Moisturizing Lotion', '') },
      { id: 'au-m4', name: 'Kem Dưỡng Ẩm Klairs Midnight Blue Calming Cream', brand: 'Klairs', shade: '30ml / 60ml', category: 'Kem dưỡng ẩm', priceRange: '320.000đ - 450.000đ', note: 'Làm dịu da nhạy cảm và cân bằng độ ẩm trước trang điểm', url: makeSearchUrl('Klairs', 'Midnight Blue Calming Cream', '') },
      { id: 'au-m5', name: 'Kem Dưỡng Ẩm Hada Labo Advanced Nourish Cream', brand: 'Hada Labo', shade: '50g', category: 'Kem dưỡng ẩm', priceRange: '180.000đ - 230.000đ', note: 'Cấp ẩm sâu giá tiết kiệm giúp nền bám chắc suốt ngày', url: makeSearchUrl('Hada Labo', 'Advanced Nourish Cream', '') },
      // Kem lót (5)
      { id: 'au-p1', name: 'Kem Lót Kiềm Dầu Smashbox Photo Finish Foundation Primer', brand: 'Smashbox', shade: 'Original', category: 'Kem lót', priceRange: '850.000đ - 1.020.000đ', note: 'Làm phẳng bề mặt da và lỗ chân lông chuẩn studio', url: makeSearchUrl('Smashbox', 'Photo Finish Primer', '') },
      { id: 'au-p2', name: 'Kem Lót Kiềm Dầu Catrice Prime And Fine Poreless Blur', brand: 'Catrice', shade: '30ml', category: 'Kem lót', priceRange: '170.000đ - 220.000đ', note: 'Làm mờ lỗ chân lông vùng chữ T và giữ nền ráo mịn', url: makeSearchUrl('Catrice', 'Poreless Blur Primer', '') },
      { id: 'au-p3', name: 'Kem Lót Bắt Sáng Charlotte Tilbury Hollywood Flawless Filter', brand: 'Charlotte Tilbury', shade: '03 Fair / 04 Medium', category: 'Kem lót', priceRange: '1.250.000đ - 1.480.000đ', note: 'Tạo hiệu ứng da căng khỏe ánh đồng sang trọng bậc nhất', url: makeSearchUrl('Charlotte Tilbury', 'Hollywood Flawless Filter', '03') },
      { id: 'au-p4', name: 'Kem Lót Kiềm Dầu Benefit The POREfessional Matte Rescue', brand: 'Benefit', shade: '50ml', category: 'Kem lót', priceRange: '780.000đ - 940.000đ', note: 'Hút dầu thừa tức thì cho lớp nền bán lì hoàn hảo', url: makeSearchUrl('Benefit', 'POREfessional Matte Rescue', '') },
      { id: 'au-p5', name: 'Kem Lót Maybelline Baby Skin Pore Eraser', brand: 'Maybelline', shade: '22ml', category: 'Kem lót', priceRange: '150.000đ - 195.000đ', note: 'Nhỏ gọn, làm mịn bề mặt da nhanh chóng trước khi đánh nền', url: makeSearchUrl('Maybelline', 'Baby Skin Pore Eraser', '') },
      // Kem nền & Cushion (6)
      { id: 'au-f1', name: 'Kem Nền Estée Lauder Double Wear Stay-in-Place', brand: 'Estée Lauder', shade: '2W1 Dawn / 2W2 Rattan', category: 'Kem nền', priceRange: '1.150.000đ - 1.380.000đ', note: 'Tông W ấm áp tiệp da, che phủ hoàn hảo và bền màu 24h', url: makeSearchUrl('Estee Lauder', 'Double Wear', '2W1 Dawn') },
      { id: 'au-f2', name: 'Kem Nền NARS Natural Radiant Longwear Foundation', brand: 'NARS', shade: 'Fiji / Punjab', category: 'Kem nền', priceRange: '1.250.000đ - 1.480.000đ', note: 'Sắc vàng mật ong sang trọng, giữ da rạng rỡ không xuống tông', url: makeSearchUrl('NARS', 'Natural Radiant Longwear Foundation', 'Punjab') },
      { id: 'au-f3', name: 'Cushion Clio Kill Cover Founwear Cushion All New', brand: 'Clio', shade: '04 Ginger / 05 Sand', category: 'Kem nền', priceRange: '420.000đ - 520.000đ', note: 'Mã 04 Ginger tiệp hoàn hảo với làn da ấm châu Á', url: makeSearchUrl('Clio', 'Kill Cover Founwear Cushion', '04 Ginger') },
      { id: 'au-f4', name: 'Kem Nền Maybelline Super Stay Lumi-Matte', brand: 'Maybelline', shade: '128 Warm Nude / 220', category: 'Kem nền', priceRange: '240.000đ - 310.000đ', note: 'Mỏng nhẹ, che phủ tốt và giữ lớp nền lì mịn suốt ngày', url: makeSearchUrl('Maybelline', 'Super Stay Lumi Matte', '128') },
      { id: 'au-f5', name: 'Kem Nền MAC Studio Fix Fluid SPF 15', brand: 'MAC', shade: 'NC20 / NC25 / NC30', category: 'Kem nền', priceRange: '920.000đ - 1.120.000đ', note: 'Dòng NC (Neutral Cool trong hệ MAC nghĩa là ánh vàng) cực chuẩn da Thu', url: makeSearchUrl('MAC', 'Studio Fix Fluid', 'NC25') },
      { id: 'au-f6', name: 'Cushion Sulwhasoo Perfecting Cushion', brand: 'Sulwhasoo', shade: '21N1 / 23N1 Sand', category: 'Kem nền', priceRange: '1.250.000đ - 1.480.000đ', note: 'Lớp nền mỏng mịn sang trọng, nuôi dưỡng da căng khỏe', url: makeSearchUrl('Sulwhasoo', 'Perfecting Cushion', '23N1') },
      // Che khuyết điểm & Phấn phủ (5)
      { id: 'au-c1', name: 'Che Khuyết Điểm NARS Radiant Creamy Concealer', brand: 'NARS', shade: 'Custard / Ginger', category: 'Che khuyết điểm & Phấn phủ', priceRange: '720.000đ - 850.000đ', note: 'Tông vàng ấm che quầng thâm nâu và thâm mụn cực đỉnh', url: makeSearchUrl('NARS', 'Radiant Creamy Concealer', 'Ginger') },
      { id: 'au-c2', name: 'Che Khuyết Điểm Maybelline Instant Age Rewind', brand: 'Maybelline', shade: '120 Light / 130 Medium', category: 'Che khuyết điểm & Phấn phủ', priceRange: '185.000đ - 230.000đ', note: 'Đầu mút dễ tán, che phủ quầng thâm mắt tự nhiên', url: makeSearchUrl('Maybelline', 'Age Rewind Concealer', '130 Medium') },
      { id: 'au-c3', name: 'Phấn Phủ Nén Charlotte Tilbury Airbrush Flawless Finish', brand: 'Charlotte Tilbury', shade: '01 Fair / 02 Medium', category: 'Che khuyết điểm & Phấn phủ', priceRange: '1.150.000đ - 1.380.000đ', note: 'Phấn nén siêu mịn tạo hiệu ứng làn da lụa không tì vết', url: makeSearchUrl('Charlotte Tilbury', 'Airbrush Flawless Finish Powder', '02 Medium') },
      { id: 'au-c4', name: 'Phấn Phủ Bột RCMA No-Color Powder', brand: 'RCMA', shade: 'No Color', category: 'Che khuyết điểm & Phấn phủ', priceRange: '350.000đ - 440.000đ', note: 'Khóa nền lì mịn không làm trắng bệch làn da ấm', url: makeSearchUrl('RCMA', 'No Color Powder', '') },
      { id: 'au-c5', name: 'Phấn Phủ Nén MAC Studio Fix Powder Plus Foundation', brand: 'MAC', shade: 'NC25 / NC30', category: 'Che khuyết điểm & Phấn phủ', priceRange: '850.000đ - 1.020.000đ', note: 'Kiềm dầu cực tốt và tăng độ che phủ cho lớp nền hoàn hảo', url: makeSearchUrl('MAC', 'Studio Fix Powder', 'NC25') },
      // Phấn má (6)
      { id: 'au-b1', name: 'Phấn Má 3CE Mood Recipe Face Blush', brand: '3CE', shade: 'Rose Beige / Mono Pink / Nude Peach', category: 'Phấn má', priceRange: '260.000đ - 330.000đ', note: 'Rose Beige (cam đất pha hồng) là màu má huyền thoại của Mùa Thu', url: makeSearchUrl('3CE', 'Mood Recipe Face Blush', 'Rose Beige') },
      { id: 'au-b2', name: 'Phấn Má Romand Better Than Cheek', brand: 'Romand', shade: 'N02 Vine Nude / C03 Fig Chip', category: 'Phấn má', priceRange: '150.000đ - 195.000đ', note: 'Fig Chip màu quả sung trầm ấm cực kỳ sang trọng và tự nhiên', url: makeSearchUrl('Romand', 'Better Than Cheek', 'C03 Fig Chip') },
      { id: 'au-b3', name: 'Má Hồng Kem Rare Beauty Soft Pinch Liquid Blush', brand: 'Rare Beauty', shade: 'Worth / Love', category: 'Phấn má', priceRange: '680.000đ - 820.000đ', note: 'Love (cam đất cháy) và Worth (hồng đất trầm) cực tôn da Thu', url: makeSearchUrl('Rare Beauty', 'Soft Pinch Liquid Blush', 'Worth') },
      { id: 'au-b4', name: 'Phấn Má Clinique Cheek Pop', brand: 'Clinique', shade: '05 Nude Pop / 17 Black Honey Pop', category: 'Phấn má', priceRange: '620.000đ - 750.000đ', note: 'Nude Pop tạo hiệu ứng gò má rám nắng ấm áp đầy cuốn hút', url: makeSearchUrl('Clinique', 'Cheek Pop', '05 Nude Pop') },
      { id: 'au-b5', name: 'Phấn Má NARS Blush', brand: 'NARS', shade: 'Behave / Taj Mahal', category: 'Phấn má', priceRange: '790.000đ - 950.000đ', note: 'Behave (hồng đất trầm mịn lì) hợp mọi phong cách trang điểm Tây', url: makeSearchUrl('NARS', 'Blush', 'Behave') },
      { id: 'au-b6', name: 'Phấn Má Peripera Pure Blushed Sunshine Cheek', brand: 'Peripera', shade: '04 Hazel Orange / 07 Milky Peach', category: 'Phấn má', priceRange: '120.000đ - 165.000đ', note: 'Cam hạt dẻ ấm áp, dễ tán đều không loang lổ', url: makeSearchUrl('Peripera', 'Pure Blushed Sunshine Cheek', '04 Hazel Orange') },
      // Bảng khối & Bắt sáng (6)
      { id: 'au-h1', name: 'Phấn Tạo Khối & Bronzer Benefit Hoola Matte Bronzer', brand: 'Benefit', shade: 'Original', category: 'Bảng khối & Bắt sáng', priceRange: '820.000đ - 980.000đ', note: 'Bronzer nâu ấm huyền thoại giúp khuôn mặt thon gọn đầy chiều sâu', url: makeSearchUrl('Benefit', 'Hoola Matte Bronzer', '') },
      { id: 'au-h2', name: 'Bảng Tạo Khối Too Cool For School Artclass By Rodin', brand: 'Too Cool For School', shade: '01 Classic', category: 'Bảng khối & Bắt sáng', priceRange: '240.000đ - 310.000đ', note: 'Dễ dàng tạo khối sống mũi và xương hàm tự nhiên', url: makeSearchUrl('Too Cool For School', 'Artclass By Rodin Shading', '01 Classic') },
      { id: 'au-h3', name: 'Bắt Sáng MAC Mineralize Skinfinish', brand: 'MAC', shade: 'Soft & Gentle', category: 'Bảng khối & Bắt sáng', priceRange: '880.000đ - 1.050.000đ', note: 'Ánh vàng đồng sâm panh sang trọng bậc nhất cho làn da Thu', url: makeSearchUrl('MAC', 'Mineralize Skinfinish', 'Soft Gentle') },
      { id: 'au-h4', name: 'Bắt Sáng Rare Beauty Positive Light Silky Touch Highlighter', brand: 'Rare Beauty', shade: 'Exhilarate / Flaunt', category: 'Bảng khối & Bắt sáng', priceRange: '680.000đ - 820.000đ', note: 'Ánh vàng đồng mịn như lụa, bắt sáng cực đẹp dưới ánh đèn', url: makeSearchUrl('Rare Beauty', 'Positive Light Highlighter', 'Exhilarate') },
      { id: 'au-h5', name: 'Tạo Khối Kem Fenty Beauty Match Stix Matte Skinstick', brand: 'Fenty Beauty', shade: 'Amber / Mocha', category: 'Bảng khối & Bắt sáng', priceRange: '780.000đ - 920.000đ', note: 'Dạng thỏi kem dễ tán tạo khung xương gò má sắc sảo', url: makeSearchUrl('Fenty Beauty', 'Match Stix', 'Mocha') },
      { id: 'au-h6', name: 'Bắt Sáng Wet n Wild MegaGlo Highlighting Powder', brand: 'Wet n Wild', shade: 'Precious Petals', category: 'Bảng khối & Bắt sáng', priceRange: '145.000đ - 190.000đ', note: 'Ánh vàng hồng đồng siêu sáng, chất lượng vượt xa tầm giá', url: makeSearchUrl('Wet n Wild', 'MegaGlo Highlighter', 'Precious Petals') },
      // Phấn mắt (6)
      { id: 'au-e1', name: 'Bảng Phấn Mắt Romand Better Than Palette', brand: 'Romand', shade: '02 Mahogany Garden / 05 Shade & Shadow Garden', category: 'Phấn mắt', priceRange: '340.000đ - 420.000đ', note: 'Mahogany Garden tông nâu gỗ gụ và nhũ đồng cực cuốn hút', url: makeSearchUrl('Romand', 'Better Than Palette', '02 Mahogany Garden') },
      { id: 'au-e2', name: 'Bảng Phấn Mắt 3CE Multi Eye Color Palette', brand: '3CE', shade: 'Smoother / Dear Nude', category: 'Phấn mắt', priceRange: '520.000đ - 650.000đ', note: 'Smoother gồm 9 ô nâu lì từ nhạt đến đậm tạo chiều sâu mắt hoàn hảo', url: makeSearchUrl('3CE', 'Multi Eye Color Palette', 'Smoother') },
      { id: 'au-e3', name: 'Bảng Phấn Mắt Dasique Shadow Palette', brand: 'Dasique', shade: '01 Sugar Brownie / 11 Chocolate Fudge', category: 'Phấn mắt', priceRange: '420.000đ - 520.000đ', note: 'Tông nâu socola ấm áp kèm nhũ vàng đồng sang chảnh', url: makeSearchUrl('Dasique', 'Shadow Palette', '11 Chocolate Fudge') },
      { id: 'au-e4', name: 'Bảng Phấn Mắt Clio Pro Eye Palette', brand: 'Clio', shade: '08 Into Lace / 12 Autumn Breeze In Seoul Forest', category: 'Phấn mắt', priceRange: '380.000đ - 460.000đ', note: 'Lấy cảm hứng từ rừng thu Seoul với đủ sắc cam đất và nâu ấm', url: makeSearchUrl('Clio', 'Pro Eye Palette', '12 Autumn Breeze') },
      { id: 'au-e5', name: 'Bảng Phấn Mắt Tarte Tartelette Toasted Eyeshadow Palette', brand: 'Tarte', shade: 'Toasted', category: 'Phấn mắt', priceRange: '1.050.000đ - 1.280.000đ', note: 'Bảng mắt tông đồng ấm và cam cháy chuẩn phong cách Tây', url: makeSearchUrl('Tarte', 'Tartelette Toasted', '') },
      { id: 'au-e6', name: 'Bảng Phấn Mắt ColourPop Double Entendre / Going Coconuts', brand: 'ColourPop', shade: 'Going Coconuts', category: 'Phấn mắt', priceRange: '320.000đ - 390.000đ', note: 'Chất phấn lên màu chuẩn đậm ngay lần quẹt đầu tiên', url: makeSearchUrl('ColourPop', 'Going Coconuts', '') },
      // Son môi (8)
      { id: 'au-l1', name: 'Son Kem Lì 3CE Velvet Lip Tint', brand: '3CE', shade: 'Taupe / Going Right', category: 'Son môi', priceRange: '240.000đ - 310.000đ', note: 'Taupe (đỏ nâu gạch) là màu son biểu tượng làm sáng bừng da Thu', url: makeSearchUrl('3CE', 'Velvet Lip Tint', 'Taupe') },
      { id: 'au-l2', name: 'Son Thỏi MAC Matte / Powder Kiss Lipstick', brand: 'MAC', shade: 'Chili / Marrakesh', category: 'Son môi', priceRange: '520.000đ - 620.000đ', note: 'Chili (đỏ tương ớt) và Marrakesh (đỏ nâu đất) sang chảnh bất bại', url: makeSearchUrl('MAC', 'Lipstick', 'Chili') },
      { id: 'au-l3', name: 'Son Tint Bóng Romand Juicy Lasting Tint', brand: 'Romand', shade: '13 Eat Dotori / 23 Nucadamia', category: 'Son môi', priceRange: '155.000đ - 195.000đ', note: '23 Nucadamia (đỏ nâu hạt dẻ) căng bóng tự nhiên dùng hàng ngày', url: makeSearchUrl('Romand', 'Juicy Lasting Tint', '23 Nucadamia') },
      { id: 'au-l4', name: 'Son Kem Lì Black Rouge Air Fit Velvet Tint', brand: 'Black Rouge', shade: 'A12 Dashed Brown / A06 Brick Red', category: 'Son môi', priceRange: '140.000đ - 180.000đ', note: 'A12 nâu đỏ gạch trầm tôn da và làm trắng răng rõ rệt', url: makeSearchUrl('Black Rouge', 'Air Fit Velvet Tint', 'A12') },
      { id: 'au-l5', name: 'Son Kem Lì Merzy The First Velvet Tint', brand: 'Merzy', shade: 'V6 Firenze Negroni', category: 'Son môi', priceRange: '135.000đ - 175.000đ', note: 'V6 đỏ gạch huyền thoại giá sinh viên nhưng lên màu cực sang', url: makeSearchUrl('Merzy', 'Velvet Tint', 'V6') },
      { id: 'au-l6', name: 'Son Thỏi Gucci Rouge à Lèvres Mat', brand: 'Gucci', shade: '208 They Met in Argentina / 505 Janet Rust', category: 'Son môi', priceRange: '890.000đ - 1.080.000đ', note: '505 Janet Rust màu đỏ gạch cổ điển đẳng cấp quý cô', url: makeSearchUrl('Gucci', 'Rouge a Levres Mat', '505 Janet Rust') },
      { id: 'au-l7', name: 'Son Kem Lì Bbia Last Velvet Lip Tint', brand: 'Bbia', shade: '25 Final Note / 12 Sweet Boss', category: 'Son môi', priceRange: '145.000đ - 185.000đ', note: '25 Final Note đỏ nâu trầm quyến rũ cho mọi buổi tiệc tối', url: makeSearchUrl('Bbia', 'Last Velvet Lip Tint', '25') },
      { id: 'au-l8', name: 'Son Thỏi YSL Rouge Pur Couture The Slim', brand: 'YSL', shade: '21 / 302 Brown No Way Back', category: 'Son môi', priceRange: '890.000đ - 1.050.000đ', note: 'Chất son lì mịn như da thuộc, thiết kế sang trọng tinh tế', url: makeSearchUrl('YSL', 'The Slim', '302') },
      // Xịt khóa nền (5)
      { id: 'au-s1', name: 'Xịt Khóa Nền Charlotte Tilbury Airbrush Flawless Setting Spray', brand: 'Charlotte Tilbury', shade: '100ml', category: 'Xịt khóa nền', priceRange: '920.000đ - 1.150.000đ', note: 'Tạo màng khóa nền lì mịn tự nhiên suốt 16 giờ không xuống tông', url: makeSearchUrl('Charlotte Tilbury', 'Airbrush Flawless Setting Spray', '') },
      { id: 'au-s2', name: 'Xịt Khóa Nền Urban Decay All Nighter', brand: 'Urban Decay', shade: 'Original', category: 'Xịt khóa nền', priceRange: '780.000đ - 950.000đ', note: 'Chống trôi tuyệt đối trong thời tiết nóng ẩm hoặc tiệc kéo dài', url: makeSearchUrl('Urban Decay', 'All Nighter Setting Spray', '') },
      { id: 'au-s3', name: 'Xịt Khóa Nền Milani Make It Last Setting Spray', brand: 'Milani', shade: 'Original 60ml', category: 'Xịt khóa nền', priceRange: '240.000đ - 310.000đ', note: 'Bản dupe hoàn hảo của các dòng high-end, khóa nền cực chắc', url: makeSearchUrl('Milani', 'Make It Last Setting Spray', '') },
      { id: 'au-s4', name: 'Xịt Khóa Nền 3CE Shimmer Makeup Fixer', brand: '3CE', shade: '100ml', category: 'Xịt khóa nền', priceRange: '290.000đ - 360.000đ', note: 'Giữ lớp nền bán lì bền màu và chống lem ra khẩu trang', url: makeSearchUrl('3CE', 'Makeup Fixer', '') },
      { id: 'au-s5', name: 'Xịt Khóa Nền L’Oréal Infallible Pro-Spray & Set', brand: 'L’Oréal', shade: '100ml', category: 'Xịt khóa nền', priceRange: '250.000đ - 310.000đ', note: 'Giữ màu phấn má cam đất và khối mặt sắc nét cả ngày', url: makeSearchUrl('LOreal', 'Infallible Pro Spray Set', '') },
    ],
  },

  winter: {
    key: 'winter',
    name: 'Mùa Đông Sắc Sảo',
    englishName: 'Winter Cool & Clear',
    subtitle: 'Sắc nét • Hiện đại • Quyền lực • Cuốn hút nổi bật',
    palette: ['#DC143C', '#C71585', '#191970', '#FFFFFF', '#111111', '#8A2BE2'],
    paletteNames: ['Đỏ thuần / Đỏ lạnh', 'Hồng mận berry', 'Xanh navy đậm', 'Trắng tinh khôi', 'Đen tuyền sắc nét', 'Tím hoàng gia'],
    description:
      'Bạn sở hữu sắc tố da lạnh sắc nét (Cool & Clear Undertone) cùng độ tương phản cao giữa màu da, tóc đen tuyền và ánh mắt sâu. Những gam màu rõ nét, thuần khiết như đỏ lạnh, hồng mận berry, trắng tinh khôi và đen tuyền sẽ giúp bạn nổi bật đầy khí chất.',
    characteristics: [
      'Sắc tố ẩn dưới da thiên trắng sứ lạnh, hồng lạnh hoặc nâu lạnh sắc nét.',
      'Độ tương phản khuôn mặt cao nhất trong 4 mùa, đường nét rõ ràng cuốn hút.',
      'Hợp trang sức bạc sáng bóng loáng, bạch kim, kim cương và đá quý sắc lạnh.',
      'Son đỏ thuần, đỏ rượu vang hoặc hồng mận berry là vũ khí nâng tầm nhan sắc.',
    ],
    bestJewelry: 'Bạc sáng bóng loáng, Bạch kim, Kim cương, Đá Ruby / Sapphire',
    hairColors: ['Đen tuyền nguyên bản', 'Đen ánh xanh (Blue Black)', 'Nâu đen lạnh sắc sảo', 'Tím than trầm'],
    makeupLooks: [
      {
        title: 'Hiện Đại Tinh Giản (Clean Chic Contrast)',
        style: 'Trang điểm đi làm, gặp gỡ hàng ngày thanh lịch sắc nét',
        base: 'Kem nền lì mịn không tì vết, nâng sáng vùng chữ T và che khuyết điểm kỹ.',
        eyes: 'Phấn mắt màu be xám trung tính, tập trung vào đường eyeliner đen sắc mảnh và hàng mi cong.',
        cheeks: 'Phấn má hồng dâu lạnh tán thật nhẹ để giữ sự tập trung cho đôi môi.',
        lips: 'Son tint bóng hoặc son thỏi màu đỏ hồng cherry tươi tắn.',
      },
      {
        title: 'Tiểu Thư Sang Chảnh (Berry Velvet Glam)',
        style: 'Hẹn hò tối, dạo phố thời thượng cuốn hút',
        base: 'Lớp nền mịn lì như nhung, tạo khối xám lạnh giúp sống mũi và đường hàm sắc nét.',
        eyes: 'Phấn mắt nâu khói lạnh kết hợp nhũ kim cương ánh bạc lấp lánh ở bầu mắt.',
        cheeks: 'Phấn má hồng mận chín tán xéo lên thái dương, thêm bắt sáng ánh bạc.',
        lips: 'Son kem lì màu hồng mận berry hoặc đỏ hồng rượu vang.',
      },
      {
        title: 'Nữ Hoàng Thảm Đỏ (Classic Red Power)',
        style: 'Sự kiện lớn, tiệc tối sang trọng quyền lực',
        base: 'Kem nền độ che phủ cao, phấn phủ kiềm dầu và xịt khóa nền chống trôi tuyệt đối.',
        eyes: 'Kẻ mắt mèo sắc sảo, mi cong dày và nhũ bạc bắt sáng góc trong mắt.',
        cheeks: 'Tạo khối gọn gàng, phấn má màu hồng lạnh tối giản để tôn vinh đôi môi đỏ.',
        lips: 'Son thỏi lì màu đỏ thuần (True Blue-Red) sắc nét đầy mê hoặc.',
      },
    ],
    avoidColors: ['Cam đất / Cam cháy', 'Vàng nghệ / Vàng kem trầm', 'Nâu vàng ấm', 'Xanh rêu vàng'],
    products: [
      // Kem dưỡng ẩm (5)
      { id: 'wi-m1', name: 'Kem Dưỡng Ẩm La Roche-Posay Effaclar Mat', brand: 'La Roche-Posay', shade: '40ml', category: 'Kem dưỡng ẩm', priceRange: '380.000đ - 460.000đ', note: 'Cấp ẩm và kiềm dầu cho bề mặt da mịn lì sắc nét', url: makeSearchUrl('La Roche-Posay', 'Effaclar Mat', '') },
      { id: 'wi-m2', name: 'Kem Dưỡng Ẩm Paula’s Choice Water-Infusing Electrolyte Moisturizer', brand: 'Paula’s Choice', shade: '50ml', category: 'Kem dưỡng ẩm', priceRange: '790.000đ - 950.000đ', note: 'Cấp nước tức thì giúp lớp nền căng mượt không cakey', url: makeSearchUrl('Paulas Choice', 'Electrolyte Moisturizer', '') },
      { id: 'wi-m3', name: 'Kem Dưỡng Ẩm Clinique Dramatically Different Moisturizing Gel', brand: 'Clinique', shade: '50ml / 125ml', category: 'Kem dưỡng ẩm', priceRange: '650.000đ - 950.000đ', note: 'Giữ da ẩm cân bằng lý tưởng cho lớp trang điểm lâu trôi', url: makeSearchUrl('Clinique', 'Dramatically Different Gel', '') },
      { id: 'wi-m4', name: 'Kem Dưỡng Ẩm Bioderma Sébium Sensitive', brand: 'Bioderma', shade: '30ml', category: 'Kem dưỡng ẩm', priceRange: '340.000đ - 420.000đ', note: 'Làm dịu da nhạy cảm, giảm bóng nhờn vùng chữ T', url: makeSearchUrl('Bioderma', 'Sebium Sensitive', '') },
      { id: 'wi-m5', name: 'Kem Dưỡng Ẩm Simple Hydrating Light Moisturiser', brand: 'Simple', shade: '125ml', category: 'Kem dưỡng ẩm', priceRange: '130.000đ - 170.000đ', note: 'Nhẹ mặt, lành tính cho bước dưỡng nhanh gọn mỗi sáng', url: makeSearchUrl('Simple', 'Hydrating Light Moisturiser', '') },
      // Kem lót (5)
      { id: 'wi-p1', name: 'Kem Lót Hiệu Chỉnh Sắc Da Make Up For Ever Step 1 Primer', brand: 'Make Up For Ever', shade: 'Tone Up Perfector', category: 'Kem lót', priceRange: '890.000đ - 1.050.000đ', note: 'Làm sáng đều màu da tức thì tạo nền tảng sắc nét', url: makeSearchUrl('Make Up For Ever', 'Step 1 Primer', '') },
      { id: 'wi-p2', name: 'Kem Lót Kiềm Dầu Hourglass Veil Mineral Primer', brand: 'Hourglass', shade: '30ml', category: 'Kem lót', priceRange: '1.350.000đ - 1.620.000đ', note: 'Che phủ lỗ chân lông và giữ nền bền đẹp đẳng cấp luxury', url: makeSearchUrl('Hourglass', 'Veil Mineral Primer', '') },
      { id: 'wi-p3', name: 'Kem Lót Nâng Tông Laneige Skin Veil Base', brand: 'Laneige', shade: '40 Pure Violet', category: 'Kem lót', priceRange: '580.000đ - 690.000đ', note: 'Khử sắc vàng xỉn, giúp da trắng sứ lạnh rạng rỡ', url: makeSearchUrl('Laneige', 'Skin Veil Base', '40 Pure Violet') },
      { id: 'wi-p4', name: 'Kem Lót Bám Nền Milk Makeup Hydro Grip Primer', brand: 'Milk Makeup', shade: '45ml', category: 'Kem lót', priceRange: '890.000đ - 1.080.000đ', note: 'Giữ chặt lớp nền không xê dịch suốt nhiều giờ dự tiệc', url: makeSearchUrl('Milk Makeup', 'Hydro Grip Primer', '') },
      { id: 'wi-p5', name: 'Kem Lót Kiềm Dầu Innisfree No-Sebum Blur Primer', brand: 'Innisfree', shade: '25ml', category: 'Kem lót', priceRange: '190.000đ - 240.000đ', note: 'Làm mịn vùng da sần sùi, giúp lớp nền lì mượt hoàn hảo', url: makeSearchUrl('Innisfree', 'No Sebum Blur Primer', '') },
      // Kem nền & Cushion (6)
      { id: 'wi-f1', name: 'Kem Nền Giorgio Armani Luminous Silk Foundation', brand: 'Giorgio Armani', shade: '2 / 3.75 / 4.75', category: 'Kem nền', priceRange: '1.550.000đ - 1.850.000đ', note: 'Tạo hiệu ứng làn da lụa sang trọng, bắt sáng sắc nét', url: makeSearchUrl('Giorgio Armani', 'Luminous Silk Foundation', '3.75') },
      { id: 'wi-f2', name: 'Cushion YSL Le Cushion Encre de Peau (Vỏ Da)', brand: 'YSL', shade: 'B10 / B20', category: 'Kem nền', priceRange: '1.350.000đ - 1.580.000đ', note: 'Lớp nền lì sang chảnh, kiềm dầu tốt và cực kỳ tôn da lạnh', url: makeSearchUrl('YSL', 'Le Cushion Encre de Peau', 'B10') },
      { id: 'wi-f3', name: 'Kem Nền Estée Lauder Double Wear', brand: 'Estée Lauder', shade: '1C0 Shell / 1C1 Cool Bone / 2C3 Fresco', category: 'Kem nền', priceRange: '1.150.000đ - 1.380.000đ', note: 'Độ che phủ cao không tì vết, giữ sắc da lạnh nguyên vẹn', url: makeSearchUrl('Estee Lauder', 'Double Wear', '1C0 Shell') },
      { id: 'wi-f4', name: 'Cushion Clio Kill Cover The New Founwear Cushion', brand: 'Clio', shade: '02 Lingerie / 21C', category: 'Kem nền', priceRange: '420.000đ - 520.000đ', note: 'Che phủ khuyết điểm sắc nét, mỏng nhẹ không nặng mặt', url: makeSearchUrl('Clio', 'Kill Cover The New Founwear Cushion', '02 Lingerie') },
      { id: 'wi-f5', name: 'Kem Nền Lancôme Teint Idole Ultra Wear', brand: 'Lancôme', shade: 'PO-01 / BO-01', category: 'Kem nền', priceRange: '1.280.000đ - 1.480.000đ', note: 'Mã PO (Pink Ochre) ánh hồng lạnh giúp da sáng bật tông', url: makeSearchUrl('Lancome', 'Teint Idole Ultra Wear', 'PO-01') },
      { id: 'wi-f6', name: 'Cushion Laneige Neo Cushion Matte', brand: 'Laneige', shade: '17C1 / 21C1', category: 'Kem nền', priceRange: '680.000đ - 820.000đ', note: 'Thiết kế hiện đại, lớp nền lì mịn chuẩn phong cách thành thị', url: makeSearchUrl('Laneige', 'Neo Cushion Matte', '17C1') },
      // Che khuyết điểm & Phấn phủ (5)
      { id: 'wi-c1', name: 'Che Khuyết Điểm Dior Forever Skin Correct', brand: 'Dior', shade: '1CR / 2CR', category: 'Che khuyết điểm & Phấn phủ', priceRange: '920.000đ - 1.120.000đ', note: 'Che phủ mọi khuyết điểm với sắc hồng lạnh tiệp da hoàn hảo', url: makeSearchUrl('Dior', 'Forever Skin Correct', '1CR') },
      { id: 'wi-c2', name: 'Che Khuyết Điểm The Saem Cover Perfection Tip Concealer', brand: 'The Saem', shade: '0.5 Ice Beige / 01 Clear Beige', category: 'Che khuyết điểm & Phấn phủ', priceRange: '95.000đ - 135.000đ', note: 'Mã 0.5 Ice Beige cực kỳ hợp với làn da trắng sứ lạnh', url: makeSearchUrl('The Saem', 'Cover Perfection Tip Concealer', '0.5 Ice Beige') },
      { id: 'wi-c3', name: 'Phấn Phủ Bột NARS Light Reflecting Setting Powder', brand: 'NARS', shade: 'Crystal (Translucent)', category: 'Che khuyết điểm & Phấn phủ', priceRange: '890.000đ - 1.080.000đ', note: 'Hạt phấn trong suốt như pha lê giúp nền sắc nét dưới ánh flash', url: makeSearchUrl('NARS', 'Light Reflecting Setting Powder', 'Crystal') },
      { id: 'wi-c4', name: 'Phấn Phủ Bột Huda Beauty Easy Bake Loose Baking Powder', brand: 'Huda Beauty', shade: 'Sugar Cookie / Cherry Blossom', category: 'Che khuyết điểm & Phấn phủ', priceRange: '880.000đ - 1.050.000đ', note: 'Cherry Blossom (hồng phấn) làm sáng vùng dưới mắt cực đỉnh', url: makeSearchUrl('Huda Beauty', 'Easy Bake Powder', 'Cherry Blossom') },
      { id: 'wi-c5', name: 'Phấn Phủ Nén Eglips / About Tone Air Fit Powder Pact', brand: 'About Tone', shade: '01 Fair', category: 'Che khuyết điểm & Phấn phủ', priceRange: '150.000đ - 195.000đ', note: 'Khóa nền lì mịn gọn nhẹ mang theo dặm lại mọi lúc', url: makeSearchUrl('About Tone', 'Powder Pact', '01 Fair') },
      // Phấn má (6)
      { id: 'wi-b1', name: 'Phấn Má Dior Backstage Rosy Glow', brand: 'Dior', shade: '001 Pink / 015 Cherry', category: 'Phấn má', priceRange: '980.000đ - 1.180.000đ', note: '015 Cherry (đỏ anh đào lạnh) tạo gò má ửng hồng quyền lực', url: makeSearchUrl('Dior', 'Rosy Glow Blush', '015 Cherry') },
      { id: 'wi-b2', name: 'Má Hồng Kem Rare Beauty Soft Pinch Liquid Blush', brand: 'Rare Beauty', shade: 'Grace / Faith', category: 'Phấn má', priceRange: '680.000đ - 820.000đ', note: 'Faith (mận berry trầm) và Grace (hồng lạnh rực rỡ) cực tôn da Đông', url: makeSearchUrl('Rare Beauty', 'Soft Pinch Liquid Blush', 'Grace') },
      { id: 'wi-b3', name: 'Phấn Má Clinique Cheek Pop', brand: 'Clinique', shade: '04 Plum Pop / 14 Heather Pop', category: 'Phấn má', priceRange: '620.000đ - 750.000đ', note: 'Plum Pop màu hồng mận trong trẻo sang trọng', url: makeSearchUrl('Clinique', 'Cheek Pop', '04 Plum Pop') },
      { id: 'wi-b4', name: 'Phấn Má Romand Better Than Cheek', brand: 'Romand', shade: 'C02 Blueberry Chip / W03 Apricot Milk', category: 'Phấn má', priceRange: '150.000đ - 195.000đ', note: 'Blueberry Chip (hồng việt quất lạnh) giúp da sáng bừng sắc nét', url: makeSearchUrl('Romand', 'Better Than Cheek', 'C02 Blueberry Chip') },
      { id: 'wi-b5', name: 'Phấn Má NARS Blush', brand: 'NARS', shade: 'Desire / Sin', category: 'Phấn má', priceRange: '790.000đ - 950.000đ', note: 'Sin (mận chín ánh nhũ tinh tế) cực hợp tiệc tối sang trọng', url: makeSearchUrl('NARS', 'Blush', 'Sin') },
      { id: 'wi-b6', name: 'Má Hồng Kem Glossier Cloud Paint', brand: 'Glossier', shade: 'Haze / Puff', category: 'Phấn má', priceRange: '550.000đ - 680.000đ', note: 'Haze (hồng berry) tán lên má ửng màu tự nhiên đầy sức sống', url: makeSearchUrl('Glossier', 'Cloud Paint', 'Haze') },
      // Bảng khối & Bắt sáng (6)
      { id: 'wi-h1', name: 'Tạo Khối Kem Fenty Beauty Match Stix Matte Skinstick', brand: 'Fenty Beauty', shade: 'Amber', category: 'Bảng khối & Bắt sáng', priceRange: '780.000đ - 920.000đ', note: 'Mã Amber (nâu xám lạnh chuẩn) là thỏi khối số 1 cho da Đông', url: makeSearchUrl('Fenty Beauty', 'Match Stix', 'Amber') },
      { id: 'wi-h2', name: 'Bảng Tạo Khối Too Cool For School Artclass By Rodin', brand: 'Too Cool For School', shade: '02 Modern', category: 'Bảng khối & Bắt sáng', priceRange: '240.000đ - 310.000đ', note: 'Khối bột xám lạnh sắc nét không pha ánh cam vàng', url: makeSearchUrl('Too Cool For School', 'Artclass By Rodin Shading', '02 Modern') },
      { id: 'wi-h3', name: 'Bắt Sáng Fenty Beauty Diamond Bomb All-Over Diamond Veil', brand: 'Fenty Beauty', shade: 'How Many Carats?!', category: 'Bảng khối & Bắt sáng', priceRange: '950.000đ - 1.150.000đ', note: 'Nhũ kim cương trắng bạc lấp lánh như ánh sao trên gò má', url: makeSearchUrl('Fenty Beauty', 'Diamond Bomb', 'How Many Carats') },
      { id: 'wi-h4', name: 'Bắt Sáng Dior Backstage Glow Face Palette', brand: 'Dior', shade: '001 Universal / 004 Rose Gold', category: 'Bảng khối & Bắt sáng', priceRange: '1.250.000đ - 1.480.000đ', note: 'Bắt sáng trắng tinh khiết tôn vinh độ tương phản sắc sảo', url: makeSearchUrl('Dior', 'Backstage Glow Face Palette', '001') },
      { id: 'wi-h5', name: 'Tạo Khối Judydoll Highlight & Contour Palette', brand: 'Judydoll', shade: '01 Cool Tone', category: 'Bảng khối & Bắt sáng', priceRange: '190.000đ - 250.000đ', note: 'Tạo sống mũi cao thẳng và làm sáng vùng lõm sắc nét', url: makeSearchUrl('Judydoll', 'Highlight Contour Palette', '01 Cool') },
      { id: 'wi-h6', name: 'Bắt Sáng Ofra Cosmetics Highlighter', brand: 'Ofra', shade: 'Glazed Donut', category: 'Bảng khối & Bắt sáng', priceRange: '580.000đ - 720.000đ', note: 'Ánh trắng ngọc trai lạnh siêu bắt sáng cho phong cách hiện đại', url: makeSearchUrl('Ofra', 'Glazed Donut Highlighter', '') },
      // Phấn mắt (6)
      { id: 'wi-e1', name: 'Bảng Phấn Mắt Romand Better Than Palette', brand: 'Romand', shade: '04 Dusty Fog Garden / 07 Berry Fuchsia Garden', category: 'Phấn mắt', priceRange: '340.000đ - 420.000đ', note: 'Dusty Fog Garden (10 ô nâu khói xám lạnh) tạo mắt sâu sắc sảo', url: makeSearchUrl('Romand', 'Better Than Palette', '04 Dusty Fog Garden') },
      { id: 'wi-e2', name: 'Bảng Phấn Mắt Clio Pro Eye Palette', brand: 'Clio', shade: '14 Atelier In Hannam / 19 Napping Cheese', category: 'Phấn mắt', priceRange: '380.000đ - 460.000đ', note: 'Atelier In Hannam tông hồng tím lạnh thời thượng sang chảnh', url: makeSearchUrl('Clio', 'Pro Eye Palette', '14 Atelier In Hannam') },
      { id: 'wi-e3', name: 'Bảng Phấn Mắt Dasique Shadow Palette', brand: 'Dasique', shade: '13 Cool Blending / 18 Berry Smoothie', category: 'Phấn mắt', priceRange: '420.000đ - 520.000đ', note: 'Berry Smoothie hội tụ sắc hồng mận và nhũ kim cương lấp lánh', url: makeSearchUrl('Dasique', 'Shadow Palette', '18 Berry Smoothie') },
      { id: 'wi-e4', name: 'Bảng Phấn Mắt Huda Beauty Rose Quartz Eyeshadow Palette', brand: 'Huda Beauty', shade: 'Rose Quartz', category: 'Phấn mắt', priceRange: '1.450.000đ - 1.750.000đ', note: 'Bảng mắt thạch anh hồng lạnh và nhũ bạc đỉnh cao cho tiệc tối', url: makeSearchUrl('Huda Beauty', 'Rose Quartz Palette', '') },
      { id: 'wi-e5', name: 'Bảng Phấn Mắt 3CE Multi Eye Color Palette', brand: '3CE', shade: 'Auto Focus', category: 'Phấn mắt', priceRange: '520.000đ - 650.000đ', note: 'Tông hồng lạnh sắc nét kết hợp ô nhũ bạc bắt sáng cực đẹp', url: makeSearchUrl('3CE', 'Multi Eye Color Palette', 'Auto Focus') },
      { id: 'wi-e6', name: 'Bút Kẻ Mắt Nước Clio Sharp So Simple Waterproof Pen Liner', brand: 'Clio', shade: '01 Black', category: 'Phấn mắt', priceRange: '170.000đ - 220.000đ', note: 'Đầu cọ siêu mảnh kẻ đuôi mắt đen tuyền sắc sảo không lem', url: makeSearchUrl('Clio', 'Waterproof Pen Liner', '01 Black') },
      // Son môi (8)
      { id: 'wi-l1', name: 'Son Thỏi MAC Retro Matte / MACximal Silky Matte Lipstick', brand: 'MAC', shade: 'Ruby Woo / Russian Red', category: 'Son môi', priceRange: '520.000đ - 650.000đ', note: 'Ruby Woo (đỏ thuần ánh xanh) là thỏi son quyền lực nhất của Mùa Đông', url: makeSearchUrl('MAC', 'Lipstick', 'Ruby Woo') },
      { id: 'wi-l2', name: 'Son Thỏi Dior Rouge Dior Lipstick', brand: 'Dior', shade: '999 Velvet / 720 Icône', category: 'Son môi', priceRange: '950.000đ - 1.150.000đ', note: 'Dior 999 sắc đỏ huyền thoại nâng tầm khí chất sang trọng tức thì', url: makeSearchUrl('Dior', 'Rouge Dior', '999') },
      { id: 'wi-l3', name: 'Son Tint Bóng Romand Juicy Lasting Tint', brand: 'Romand', shade: '12 Cherry Bomb / 17 Plum Coke', category: 'Son môi', priceRange: '155.000đ - 195.000đ', note: 'Cherry Bomb (đỏ anh đào) và Plum Coke (đỏ mận) làm trắng da bật tông', url: makeSearchUrl('Romand', 'Juicy Lasting Tint', '12 Cherry Bomb') },
      { id: 'wi-l4', name: 'Son Kem Lì YSL Tatouage Couture Velvet Cream', brand: 'YSL', shade: '201 Rouge Tatouage / 212', category: 'Son môi', priceRange: '890.000đ - 1.050.000đ', note: 'Đỏ lạnh sắc nét, chất kem nhung mịn sang chảnh bậc nhất', url: makeSearchUrl('YSL', 'Tatouage Couture', '201') },
      { id: 'wi-l5', name: 'Son Kem Lì Black Rouge Air Fit Velvet Tint', brand: 'Black Rouge', shade: 'A01 Strawberry Red / A05 Marmalade', category: 'Son môi', priceRange: '140.000đ - 180.000đ', note: 'A01 đỏ dâu lạnh tươi tắn, trẻ trung mà vẫn rất nổi bật', url: makeSearchUrl('Black Rouge', 'Air Fit Velvet Tint', 'A01') },
      { id: 'wi-l6', name: 'Son Tint Lì Etude Fixing Tint', brand: 'Etude', shade: '06 Soft Walnut / 07 Cranberry Plum', category: 'Son môi', priceRange: '170.000đ - 220.000đ', note: '07 Cranberry Plum sắc hồng mận berry cuốn hút lâu trôi', url: makeSearchUrl('Etude', 'Fixing Tint', '07 Cranberry Plum') },
      { id: 'wi-l7', name: 'Son Kem Lì 3CE Velvet Lip Tint', brand: '3CE', shade: 'Private / Childlike', category: 'Son môi', priceRange: '240.000đ - 310.000đ', note: 'Private là màu đỏ lạnh thuần khiết tôn mọi tông da Mùa Đông', url: makeSearchUrl('3CE', 'Velvet Lip Tint', 'Private') },
      { id: 'wi-l8', name: 'Son Dưỡng Có Màu Clinique Almost Lipstick', brand: 'Clinique', shade: 'Black Honey', category: 'Son môi', priceRange: '580.000đ - 690.000đ', note: 'Sắc đỏ mận trong suốt huyền thoại tạo hiệu ứng môi căng mọng quyến rũ', url: makeSearchUrl('Clinique', 'Almost Lipstick', 'Black Honey') },
      // Xịt khóa nền (5)
      { id: 'wi-s1', name: 'Xịt Khóa Nền Urban Decay All Nighter Ultra Matte', brand: 'Urban Decay', shade: 'Ultra Matte', category: 'Xịt khóa nền', priceRange: '780.000đ - 950.000đ', note: 'Giữ lớp nền lì sắc nét tuyệt đối suốt 16 giờ không bóng dầu', url: makeSearchUrl('Urban Decay', 'All Nighter Ultra Matte', '') },
      { id: 'wi-s2', name: 'Xịt Khóa Nền One/Size On Til Dawn Mattifying Waterproof Setting Spray', brand: 'One/Size', shade: '143ml', category: 'Xịt khóa nền', priceRange: '890.000đ - 1.080.000đ', note: 'Khóa nền chống nước và chống mồ hôi mạnh mẽ nhất hiện nay', url: makeSearchUrl('One Size', 'On Til Dawn Setting Spray', '') },
      { id: 'wi-s3', name: 'Xịt Khóa Nền Charlotte Tilbury Airbrush Flawless Setting Spray', brand: 'Charlotte Tilbury', shade: '100ml', category: 'Xịt khóa nền', priceRange: '920.000đ - 1.150.000đ', note: 'Khóa chặt lớp trang điểm dự tiệc không lem ra ly hay khẩu trang', url: makeSearchUrl('Charlotte Tilbury', 'Airbrush Flawless Setting Spray', '') },
      { id: 'wi-s4', name: 'Xịt Khóa Nền Make Up For Ever Mist & Fix', brand: 'Make Up For Ever', shade: '100ml', category: 'Xịt khóa nền', priceRange: '780.000đ - 920.000đ', note: 'Giữ màu son đỏ và khối mặt sắc sảo nguyên vẹn cả ngày', url: makeSearchUrl('Make Up For Ever', 'Mist Fix', '') },
      { id: 'wi-s5', name: 'Xịt Khóa Nền Maybelline Lasting Fix Matte Finish', brand: 'Maybelline', shade: '100ml', category: 'Xịt khóa nền', priceRange: '220.000đ - 280.000đ', note: 'Lựa chọn bình dân giữ lớp nền lì mịn lên tới 16 tiếng', url: makeSearchUrl('Maybelline', 'Lasting Fix Setting Spray', '') },
    ],
  },
};