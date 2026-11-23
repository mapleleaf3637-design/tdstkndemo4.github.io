const narrator = "NGƯỜI DẪN CHUYỆN",
  researcher = "NHÀ NGHIÊN CỨU";
const n = (line, visual) => ({ speaker: narrator, line, visual });
const r = (line, visual) => ({ speaker: researcher, line, visual });
export const scenes = [
  {
    id: "P0",
    bg: "PR-BG01",
    beats: [
      n("Ở một thế giới xa xôi, có một hành tinh mang tên SPARK.", "title"),
      n(
        "Năm 2060. Tại đây, nhiều loài sinh vật chỉ còn tồn tại trong những kho dữ liệu cũ.",
        "title",
      ),
    ],
  },
  {
    id: "P1",
    bg: "PR-BG02",
    character: "PR-CH01",
    beats: [
      n(
        "Bạn là một nhà sinh vật học, chuyên nghiên cứu những loài sinh vật đã biến mất.",
      ),
      n(
        "Công việc của bạn là thu thập, giải mã và lưu giữ những dấu vết cuối cùng của chúng.",
      ),
      r(
        "Thật kỳ lạ... Có những sinh vật mà mình chỉ còn có thể biết đến qua hình ảnh.",
      ),
    ],
  },
  {
    id: "P2",
    bg: "PR-BG03",
    character: "PR-CH02",
    visual: "hologram",
    beats: [
      n(
        "Trong số những loài đã biến mất khỏi SPARK, có một sinh vật từng được gọi là voi.",
      ),
      n(
        "Những sinh vật khổng lồ ấy giờ chỉ còn tồn tại qua hình ảnh, bản ghi chép và hồ sơ thất lạc.",
      ),
      r("Mình tự hỏi... chúng đã từng sống như thế nào?"),
    ],
  },
  {
    id: "P3",
    bg: "PR-BG04",
    character: "PR-CH03",
    beats: [
      n(
        "Một ngày, phòng thí nghiệm bất ngờ nhận được một tín hiệu bí ẩn.",
        "signal",
      ),
      n(
        "Tín hiệu ấy không đến từ bất kỳ nơi nào từng được ghi nhận trên SPARK.",
        "unknown",
      ),
      r("Khoan đã... Một tín hiệu từ vũ trụ khác sao?", "decode"),
      r("Trái Đất? Ở đó... voi vẫn còn sinh sống sao?", "identified"),
    ],
  },
  {
    id: "P4",
    bg: "PR-BG04",
    beats: [
      n(
        "Tín hiệu dẫn đến Trái Đất — nơi loài voi vẫn đang sinh sống.",
        "earth",
      ),
      n("Điểm đến là Tây Nguyên, Việt Nam.", "map"),
      n(
        "Với nhiều cộng đồng như người Mnông, Êđê và Giarai, voi không chỉ là tài sản quý mà còn gắn bó sâu sắc với đời sống, gia đình và văn hóa.",
        "map",
      ),
      n(
        "Tại Bảo tàng Dân tộc học Việt Nam, khu trưng bày “Voi ở Tây Nguyên” lưu giữ những hiện vật, hình ảnh và câu chuyện về mối quan hệ đặc biệt ấy.",
        "exhibit",
      ),
      n(
        "Trong số đó có bộ vật dụng của ông Y Prông Êban, thường được biết đến với tên Ama Kông, do con trai ông trao tặng bảo tàng năm 2014.",
        "collection",
      ),
    ],
  },
  {
    id: "P5",
    bg: "PR-BG03",
    beats: [
      n(
        "Bạn quyết định thu thập những dữ liệu quý giá ấy để truyền về SPARK.",
        "fragments",
      ),
      n(
        "Nhưng trong quá trình truyền tải, hồ sơ bất ngờ bị phân mảnh thành sáu nhánh kiến thức.",
        "archive",
      ),
      r(
        "Sáu nhánh dữ liệu... Mình cần tìm lại từng mảnh để hiểu toàn bộ câu chuyện.",
        "archive",
      ),
    ],
  },
  {
    id: "P6",
    bg: "PR-BG02",
    character: "PR-CH04",
    beats: [
      n(
        "Để hiểu voi đã sống như thế nào và vì sao chúng lại mang ý nghĩa lớn đến vậy đối với con người, bạn phải lần theo những dấu vết còn lại.",
        "notebook",
      ),
      n(
        "Kết nối các bằng chứng. Phục dựng sáu nhánh tri thức. Hoàn thiện hồ sơ đã thất lạc.",
        "notebook",
      ),
      {
        ...r("Mình sẽ đi tìm những câu trả lời ấy.", "mission"),
        action: "accept",
      },
    ],
  },
  {
    id: "P7",
    bg: "PR-BG05",
    character: "PR-CH05",
    visual: "portal",
    beats: [n("Hành trình phục dựng những ký ức thất lạc bắt đầu.")],
  },
  {
    id: "P8",
    bg: "PR-BG06",
    visual: "forest",
    beats: [n("Hành trình khám phá bắt đầu từ đây.")],
  },
];
export const history = scenes.flatMap((scene, number) =>
  scene.beats.map((beat, index) => ({
    ...beat,
    id: scene.id + "-" + (index + 1),
    scene: scene.id,
    number,
    bg: scene.bg,
    character: scene.character,
    visual: beat.visual || scene.visual,
  })),
);
