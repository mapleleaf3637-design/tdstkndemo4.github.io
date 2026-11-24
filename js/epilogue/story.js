const narrator = (line) => ({ speaker: "Người dẫn chuyện", line });
const researcher = (line) => ({ speaker: "Nhà nghiên cứu", line });
const system = (line) => ({ speaker: "Hệ thống", line });

export const archiveStatus = [
  "ELEPHANT ARCHIVE",
  "KNOWLEDGE RECONSTRUCTED",
  "6/6 BRANCHES RESTORED",
];
export const savedStatus = [
  "ELEPHANT ARCHIVE",
  "TRANSMISSION COMPLETE",
  "ALL 6 KNOWLEDGE BRANCHES PRESERVED",
  "STATUS: ARCHIVED",
];
export const endingStatus = [
  "THE LOST ELEPHANT ARCHIVE",
  "THE LAST MESSAGE",
  "TRANSMISSION COMPLETE",
];
export const endingLines = [
  "Bảo tồn không chỉ là lưu giữ quá khứ.",
  "Đó còn là bảo vệ những sinh vật đang sống, những cánh rừng và những giá trị văn hóa gắn liền với chúng — để các thế hệ mai sau không chỉ biết đến voi qua những câu chuyện.",
  "Quá khứ không thể thay đổi, nhưng tương lai vẫn có thể được bảo vệ.",
];

export const scenes = [
  {
    id: "E0",
    title: "Trở về SPARK",
    beats: [
      narrator("Cuối cùng, hành trình khám phá Tây Nguyên cũng đã khép lại."),
      narrator(
        "Bạn trở về phòng nghiên cứu trên hành tinh SPARK, mang theo những tư liệu quý giá về loài voi.",
      ),
      narrator("Những mảnh dữ liệu từng thất lạc giờ đã được kết nối."),
      researcher("Mình đã trở về..."),
      researcher(
        "Thật khó tin. Chuyến đi ấy đã giúp mình hiểu nhiều hơn những gì mình từng tưởng tượng.",
      ),
      researcher(
        "Không chỉ về loài voi, mà còn về những con người đã sống cùng chúng.",
      ),
    ],
  },
  {
    id: "E1",
    title: "Hồ sơ voi hoàn chỉnh",
    beats: [
      system("Đang kiểm tra tính toàn vẹn của dữ liệu..."),
      system("Sáu nhánh kiến thức đã được phục dựng thành công."),
      system("Hồ sơ về voi đã được hoàn thiện."),
      researcher("Tập tính tự nhiên... chăm sóc... thuần dưỡng..."),
      researcher(
        "Rồi cả những vai trò trong đời sống xã hội, văn hóa và kinh tế.",
      ),
      researcher(
        "Những câu chuyện tưởng như riêng biệt hóa ra lại liên kết chặt chẽ với nhau.",
      ),
      narrator(
        "Từ một loài vật sống giữa thiên nhiên, voi đã trở thành một phần quan trọng trong đời sống của nhiều cộng đồng Tây Nguyên.",
      ),
    ],
  },
  {
    id: "E2",
    title: "Ngày trước và ngày nay",
    beats: [
      system(
        "Phát hiện sự khác biệt giữa các tư liệu lịch sử và thực hành bảo tồn hiện nay.",
      ),
      system(
        "Yêu cầu: Đối chiếu những thay đổi trong mối quan hệ giữa con người và voi.",
      ),
      researcher(
        "Trước đây, voi gắn liền với lao động, vận chuyển và nhiều hoạt động của cộng đồng.",
      ),
      researcher(
        "Nhưng khi tìm hiểu về hiện tại, mình nhận thấy con người đang từng bước thay đổi cách đối xử với chúng.",
      ),
      researcher("Để xem những thay đổi ấy thể hiện như thế nào..."),
    ],
  },
  {
    id: "E3",
    title: "Chọn thông điệp cuối cùng",
    beats: [
      system("Hồ sơ đã sẵn sàng để lưu trữ trong kho tri thức của SPARK."),
      system(
        "Trước khi hoàn tất quá trình truyền dữ liệu, hãy lựa chọn một thông điệp mà bạn muốn gửi tới những thế hệ mai sau.",
      ),
      researcher("Một thông điệp cuối cùng..."),
      researcher(
        "Sau tất cả những gì mình đã chứng kiến, điều gì là quan trọng nhất cần được ghi nhớ?",
      ),
    ],
  },
  {
    id: "E4",
    title: "Điều còn lại trên SPARK",
    beats: [
      researcher("Cuối cùng, mọi dữ liệu đã được kết nối."),
      researcher("Những con voi ấy từng bước đi giữa những khu rừng rộng lớn."),
      researcher(
        "Chúng từng sống bên cạnh con người, gắn bó với biết bao công việc, câu chuyện và phong tục.",
      ),
      researcher("Giờ đây, mình đã có thể hiểu phần nào những điều ấy."),
      researcher("Nhưng ở SPARK... voi vẫn chỉ còn là ký ức."),
      researcher(
        "Một bản ghi dù hoàn chỉnh đến đâu cũng không thể thay thế một sinh vật đang thực sự sống.",
      ),
      narrator(
        "Bạn nhận ra rằng lưu giữ tri thức là điều cần thiết, nhưng không thể đảo ngược mọi mất mát mà sự tuyệt chủng để lại.",
      ),
    ],
  },
  {
    id: "E5",
    title: "Truyền hồ sơ",
    beats: [
      system("Đã xác nhận thông điệp cuối cùng."),
      system("Chuẩn bị lưu trữ hồ sơ vào kho tri thức trung tâm của SPARK."),
      researcher("Vậy là đến lúc rồi."),
      researcher("Hy vọng những câu chuyện này sẽ không bị lãng quên."),
    ],
  },
  {
    id: "E6",
    title: "Hồ sơ đã được lưu trữ",
    beats: [
      system("Quá trình lưu trữ hoàn tất."),
      system("Hồ sơ voi đã được bảo quản trong kho tri thức của SPARK."),
      researcher("Vậy là nhiệm vụ đã hoàn thành."),
      researcher(
        "Mình đã mang về những ký ức về một loài vật từng có ý nghĩa rất lớn đối với con người.",
      ),
      researcher("Nhưng những con voi ấy vẫn không thể trở lại thế giới này."),
      narrator(
        "Trên SPARK, voi vẫn chỉ còn tồn tại qua hình ảnh, câu chuyện và hồ sơ.",
      ),
      narrator(
        "Nhưng tại những nơi chúng vẫn đang sinh sống, tương lai của loài voi chưa hoàn toàn được định đoạt.",
      ),
      researcher(
        "Có lẽ đó mới là điều quan trọng nhất mình học được sau hành trình này.",
      ),
      researcher("Chúng ta không thể thay đổi quá khứ."),
      researcher("Nhưng chúng ta vẫn có thể lựa chọn cách bảo vệ tương lai."),
    ],
  },
  { id: "E7", title: "Thông điệp cuối cùng", beats: endingLines.map(narrator) },
];

export const comparisonClosing = [
  researcher("Mình đã hiểu rồi."),
  researcher(
    "Trân trọng quá khứ không có nghĩa là phải tiếp tục mọi thực hành của quá khứ.",
  ),
  researcher(
    "Chúng ta có thể lưu giữ những câu chuyện, tri thức và giá trị văn hóa, đồng thời tìm cách bảo vệ voi tốt hơn trong hiện tại.",
  ),
];

export const comparisons = [
  {
    id: "transport",
    optional: false,
    question:
      "Hình ảnh nào thể hiện một cách tiếp cận du lịch thân thiện hơn với voi hiện nay?",
    cards: [
      {
        asset: "EP-OB03",
        label: "Ngày trước",
        caption: "Bành chở người và hàng hóa",
      },
      { asset: "EP-OB04", label: "Ngày nay", caption: "Quan sát voi từ xa" },
    ],
    correct: 1,
    hint: "Chiếc bành trên lưng voi kể về việc vận chuyển ngày xưa. Hãy nhìn xem khách đứng ở đâu trong bức còn lại.",
    feedback: [
      system(
        "Đúng rồi! Các mô hình du lịch thân thiện với voi chú trọng việc quan sát tập tính tự nhiên thay vì yêu cầu voi chở khách.",
      ),
      researcher(
        "Vai trò của voi trong du lịch vẫn còn, nhưng cách con người tương tác với chúng có thể thay đổi.",
      ),
    ],
  },
  {
    id: "welfare",
    optional: false,
    question:
      "Hình ảnh nào nhấn mạnh việc chăm sóc và bảo vệ phúc lợi voi ngày nay?",
    cards: [
      {
        asset: "EP-OB05",
        label: "Ngày trước",
        caption: "Bành voi và tấm đệm lót",
      },
      {
        asset: "EP-OB06",
        label: "Ngày nay",
        caption: "Theo dõi sức khỏe và tập tính",
      },
    ],
    correct: 1,
    hint: "Bành và đệm lót giúp ta hiểu cách làm việc với voi ngày xưa. Hãy tìm hình người chăm voi đang quan sát một con voi.",
    feedback: [
      system(
        "Chính xác. Việc chăm sóc voi ngày nay ngày càng chú trọng đến sức khỏe, nhu cầu tự nhiên và điều kiện sống phù hợp của chúng.",
      ),
      researcher(
        "Những dụng cụ truyền thống giúp mình hiểu về nghề xưa. Nhưng hiện tại, điều quan trọng hơn là bảo đảm cuộc sống của voi.",
      ),
    ],
  },
  {
    id: "heritage",
    optional: true,
    question:
      "Hình nào cho thấy câu chuyện về voi được chia sẻ với khách đến thăm buôn hôm nay?",
    cards: [
      {
        asset: "EP-OB07",
        label: "Trong gia đình",
        caption: "Nghe người lớn kể chuyện voi",
      },
      {
        asset: "EP-OB08",
        label: "Cùng khách đến buôn",
        caption: "Giới thiệu tư liệu về voi",
      },
    ],
    correct: 1,
    hint: "Em nhỏ đang nghe kể chuyện. Ở hình kia, ai đang giới thiệu các bức ảnh cho khách?",
    feedback: [
      system(
        "Những câu chuyện vẫn được kể trong gia đình. Qua các buổi giới thiệu tư liệu, người dân còn chia sẻ ký ức ấy với khách đến buôn.",
      ),
      researcher("Mình muốn nhớ cả giọng kể của những người đã sống cùng voi."),
    ],
  },
];

export const choices = [
  {
    id: "protect_life",
    asset: "EP-OB09",
    title: "BẢO VỆ SỰ SỐNG",
    description:
      "Bảo vệ những loài động vật còn tồn tại và môi trường tự nhiên mà chúng cần để sinh sống.",
    reflection:
      "Đôi khi, điều quý giá nhất là bảo vệ sự sống trước khi nó chỉ còn tồn tại trong ký ức.",
  },
  {
    id: "preserve_memory",
    asset: "EP-OB10",
    title: "GÌN GIỮ KÝ ỨC",
    description:
      "Lưu giữ những tri thức, câu chuyện và giá trị văn hóa gắn liền với con người và thiên nhiên.",
    reflection:
      "Mỗi câu chuyện được lưu giữ là một nhịp cầu giúp thế hệ mai sau hiểu hơn về quá khứ.",
  },
  {
    id: "responsible_coexistence",
    asset: "EP-OB11",
    title: "CHUNG SỐNG CÓ TRÁCH NHIỆM",
    description:
      "Xây dựng mối quan hệ tôn trọng, có trách nhiệm và bền vững giữa con người với động vật.",
    reflection:
      "Con người và thiên nhiên không nhất thiết phải đối lập; chúng ta có thể học cách cùng tồn tại.",
  },
];
