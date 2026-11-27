export const branchIds = [
  "behavior",
  "care",
  "domestication",
  "society",
  "culture",
  "economy",
];
export const branches = [
  [
    "Tập tính voi",
    "Đàn gia đình thường có voi cái và voi con. Voi dùng vòi lấy lá, hút nước và phủ bùn lên da.",
  ],
  [
    "Chăm sóc voi",
    "Người chăm voi quan sát từng cá thể, chuẩn bị thức ăn, nước, bóng mát và chỗ nghỉ.",
  ],
  [
    "Thuần dưỡng voi",
    "Dur là đệm vỏ cây. Vơng là bành đan đặt trên đệm. Hai hiện vật kể về nghề xưa ở Buôn Đôn.",
  ],
  [
    "Xã hội",
    "Theo lời kể ở Buôn Đôn, đoàn săn xưa có những vai trò gắn với kinh nghiệm. Ngày nay tri thức về voi còn phục vụ chăm sóc và bảo tồn.",
  ],
  [
    "Văn hóa",
    "Qua tiếng cồng chiêng và lễ cúng sức khỏe cho voi, ta thấy mối gắn bó giữa voi và cộng đồng.",
  ],
  [
    "Kinh tế",
    "Voi từng giúp vận chuyển hàng hóa. Du lịch quan sát voi và nghề thủ công mở ra những cách tạo sinh kế khác.",
  ],
];
export const discoveries = [
  "ELEPHANT BEHAVIOR",
  "ELEPHANT CARE",
  "ELEPHANT TAMING HISTORY",
  "SOCIAL HISTORY",
  "CULTURAL HERITAGE",
  "ECONOMIC LIFE",
];
export const titles = [
  "Những người khổng lồ giữa đại ngàn",
  "Nghề thuần dưỡng voi ở Buôn Đôn",
  "Ngày hội của buôn làng",
];
const R = "Nhà nghiên cứu",
  D = "Đăm Săn",
  G = "Già làng",
  N = "Người dẫn chuyện",
  S = "Sổ tay nghiên cứu";
const groups = [
  [
    1,
    "opening",
    "bg_01",
    "ch_01",
    "el_02",
    ["vn_01"],
    [
      [R, "Đây là… Tây Nguyên sao?"],
      [
        R,
        "Không khí thật khác với SPARK. Cây cối, tiếng chim, cả những âm thanh trong rừng…",
      ],
      [R, "Khoan đã. Đằng xa có những sinh vật rất lớn đang di chuyển!"],
    ],
  ],
  [
    1,
    "herd",
    "bg_02",
    null,
    null,
    ["vn_04"],
    [
      [R, "Thì ra những con voi thường sống và di chuyển theo bầy đàn."],
      [
        S,
        "Đàn gia đình của voi châu Á thường gồm voi cái và voi con, dưới sự dẫn dắt của một voi cái trưởng thành.",
      ],
    ],
  ],
  [
    1,
    "feeding",
    "bg_03",
    null,
    null,
    ["vn_05"],
    [
      [R, "Chiếc vòi đó thật linh hoạt. Nó có thể dùng để lấy thức ăn sao?"],
      [
        S,
        "Vòi giúp voi ngửi, chạm, lấy thức ăn và hút nước. Voi dành phần lớn thời gian trong ngày để kiếm ăn.",
      ],
    ],
  ],
  [
    1,
    "bathing",
    "bg_04",
    null,
    null,
    ["vn_06", "vn_07"],
    [
      [R, "Khi lội qua chỗ nước sâu, nó vẫn giữ đầu ở trên mặt nước."],
      [
        S,
        "Voi có thể lội và bơi. Chúng còn tắm nước, tắm bùn để làm mát và chăm sóc da.",
        null,
      ],
      [R, "Mình đã ghi lại ba tập tính đầu tiên rồi!", null, 0],
    ],
  ],
  [
    1,
    "caretaker",
    "bg_05",
    "ch_03",
    "el_01",
    ["vn_02", "vn_05"],
    [
      [D, "Chào bạn! Đi một mình trong rừng từ sáng sớm à?"],
      [R, "Chào anh, tôi là nhà nghiên cứu. Tôi đang tìm hiểu về loài voi."],
      [
        D,
        "Tôi là Đăm Săn, người chăm voi ở đây. Bạn cứ quan sát từ xa nhé, để voi được yên tĩnh.",
      ],
      [R, "Anh đang làm gì vậy?"],
      [D, "Tôi đang chuẩn bị thức ăn và kiểm tra sức khỏe cho voi nhà."],
      [
        D,
        "Voi cần rất nhiều thức ăn và nước. Chúng còn cần bóng mát, chỗ đi lại và thời gian nghỉ ngơi.",
      ],
      [
        D,
        "Mỗi con một nết. Tôi để ý xem hôm nay nó ăn uống, vận động và nghỉ ngơi có như mọi ngày không.",
      ],
      [R, "Voi ở đây đã sống cùng con người lâu chưa?"],
      [
        D,
        "Từ nhiều thế hệ rồi. Trong nhiều gia đình, voi được xem như một thành viên.",
      ],
      [
        D,
        "Ngày trước, voi còn giúp người dân vận chuyển hàng hóa. Ngày nay, người ta cố gắng để voi được sống tự nhiên hơn.",
      ],
      [R, "Mình không biết giữa voi và người lại có nhiều câu chuyện đến vậy."],
      [
        D,
        "Bạn muốn tìm hiểu nghề thuần dưỡng voi ngày trước thì hãy đến gặp già làng. Theo con đường này là tới buôn.",
      ],
      [R, "Cảm ơn anh! Mình sẽ ghi cả những điều anh vừa kể vào sổ.", null, 1],
    ],
  ],
  [
    2,
    "village",
    "bg_06",
    "ch_01",
    null,
    ["vn_02"],
    [
      [
        N,
        "Con đường rời bìa rừng dẫn vào buôn. Trước sân nhà sàn, một người lớn tuổi đang đợi.",
      ],
    ],
  ],
  [
    2,
    "elder",
    "bg_07",
    "ch_05",
    null,
    ["vn_02"],
    [
      [R, "Cháu chào ông! Ông đang làm gì vậy ạ?"],
      [
        G,
        "Ta đang hướng dẫn một con voi nhà làm quen với vài hiệu lệnh. Cháu có biết ngày xưa Buôn Đôn nổi tiếng về nghề gì không?",
      ],
      [R, "Có phải là nghề săn bắt và thuần dưỡng voi không ạ?"],
      [
        G,
        "Đúng rồi. Đó từng là một nghề đòi hỏi nhiều kinh nghiệm và có vị trí quan trọng trong buôn.",
      ],
      [
        G,
        "Ta muốn cho cháu xem hai vật dụng còn giữ trong kho. Cháu tìm giúp ta nhé?",
      ],
      [R, "Vâng, để cháu giúp ông!"],
    ],
  ],
  [
    2,
    "store",
    "bg_08",
    null,
    null,
    [],
    [[G, "Cháu nghe lời gợi ý rồi tìm từng món nhé."]],
  ],
  [
    2,
    "farewell",
    "bg_07",
    "ch_05",
    null,
    [],
    [
      [
        G,
        "Hai vật dụng này giúp ta nhớ về cuộc sống và nghề thuần dưỡng voi trong quá khứ.",
      ],
      [
        G,
        "Ngày nay, bảo vệ sức khỏe và môi trường sống của voi mới là điều quan trọng.",
      ],
      [
        G,
        "Hôm nay buôn mình mở hội. Nếu cháu muốn tìm hiểu thêm về các lĩnh vực khác của đời sống con người và voi, hãy đến đó mà thăm quan.",
      ],
      [R, "Dạ vâng ạ, cháu cảm ơn ông ạ. Cháu đi ngay đây ạ."],
    ],
  ],
  [
    3,
    "festival",
    "bg_09",
    "ch_01",
    null,
    ["vn_03"],
    [
      [R, "Đông vui thật! Đây là ngày hội mà già làng nhắc đến sao?"],
      [R, "Còn ba trang sổ đang để trống. Mình sẽ ghé từng sạp xem sao!"],
    ],
  ],
];
export const observations = {
  herd: [["vn_04", "Voi nhà · Bản Đôn, Đắk Lắk"]],
  feeding: [["vn_05", "Voi nhà kiếm ăn · Đắk Lắk"]],
  bathing: [
    ["vn_06", "Voi nhà lội nước · Yok Đôn"],
    ["vn_07", "Voi nhà lội nước · Hồ Lắk"],
  ],
};
function observationsForBeat(place, index) {
  const frames = observations[place];
  return frames?.[Math.min(index, frames.length - 1)];
}
export const beats = groups.flatMap(
  ([chapter, place, bg, person, animal, photos, lines]) =>
    lines.map(([speaker, line, pose, award], j) => ({
      chapter,
      place,
      bg,
      person,
      animal: pose || animal,
      photos,
      speaker,
      line,
      award,
      first: j === 0,
      observation: observationsForBeat(place, j),
    })),
);
export const booths = [
  {
    name: "Ai là Vua Voi?",
    topic: "Xã hội",
    bg: "bg_10",
    npc: "ch_07",
    start: "Bắt đầu ném",
    intro: [
      "Lại đây nào! Bạn thử tài ném vòng vào những tấm bia voi bằng bìa nhé?",
      "Đây là một trò chơi mô phỏng quá trình bắt voi ngày xưa.",
      "Ngày trước, những người thợ săn voi ở Buôn Đôn có nhiều thứ bậc khác nhau. Theo lời nghệ nhân Y Khu Êban, Băk sai là người phụ việc, học nghề trong đoàn.",
      "Theo lời kể ấy, thợ phụ giúp bắt 5 con và đủ kinh nghiệm đi rừng sẽ được làm lễ thành Gru. Gru toih là trưởng đoàn, gắn với thành tích từ mười con.",
      "Vua voi là những gru toih bắt trên 60 con voi, không chỉ được dân làng mà cả các tộc người trong vùng kính nể.",
      "Bạn có sáu vòng và một phút. Bia càng xa càng nhỏ, chạy càng nhanh và được càng nhiều điểm. Bụi cỏ tính 0 điểm.",
    ],
  },
  {
    name: "Đường lên Bản Đôn",
    topic: "Văn hóa",
    bg: "bg_11",
    npc: "ch_08",
    start: "Bắt đầu",
    intro: [
      "Chào bạn! Bạn có muốn trải nghiệm một game mô phỏng về hội đua voi ở Buôn Đôn không?",
      "Ngày trước, đua voi từng có mặt trong hội ở Buôn Đôn. Ngày nay, hội có những hoạt động thân thiện hơn với voi.",
      "Ở sạp này, chúng ta di chuyển một quân cờ voi trên bàn. Mỗi câu đúng, quân cờ tiến một bước.",
      "Bạn có 30 giây cho 12 câu. Trả lời đúng ít nhất 3 câu để vượt mức 20%. Sẵn sàng chưa?",
    ],
  },
  {
    name: "Gian hàng lưu niệm",
    topic: "Kinh tế",
    bg: "bg_12",
    npc: "ch_09",
    start: "Đón khách",
    intro: [
      "Chào bạn, hôm nay mình cùng trông sạp nhé! Mỗi vị khách muốn mang về một câu chuyện khác nhau.",
      "Hãy lắng nghe rồi chọn một trong ba mẫu. Mỗi đơn có hai phút chọn hàng. Tôi sẽ giải thích ý nghĩa của mẫu bạn cầm lên.",
    ],
  },
];
// Nghệ nhân Y Khu Êban, Buôn Đôn, in “Nối dài ký ức”, Báo Đại biểu Nhân dân (2017).
export const ranks = [
  ["Băk sai", "Thợ phụ học nghề"],
  ["Gru", "Giúp bắt 5 con"],
  ["Gru toih", "Bắt từ 10 con"],
  ["Vua Voi", "Bắt trên 60 con"],
];

export const questions = [
  [
    "Trước ngày 1/7/2025, huyện Buôn Đôn thuộc tỉnh nào?",
    "Đắk Lắk",
    "Kon Tum",
    0,
  ],
  ["Âm thanh nào quen thuộc ở ngày hội Tây Nguyên?", "Piano", "Cồng chiêng", 1],
  [
    "Trong nhiều gia đình ở buôn, voi được xem như gì?",
    "Thành viên gia đình",
    "Máy móc",
    0,
  ],
  ["Ai là người chăm sóc voi hằng ngày?", "Thợ dệt", "Nài voi", 1],
  [
    "Lễ nào gửi lời cầu chúc sức khỏe đến voi?",
    "Lễ cúng sức khỏe",
    "Lễ cúng trăng",
    0,
  ],
  ["Lễ cúng bến nước gắn với điều gì?", "Gió", "Nguồn nước", 1],
  [
    "Ngày trước voi từng giúp người dân làm gì?",
    "Vận chuyển hàng",
    "In sách",
    0,
  ],
  ["Hội voi xưa từng có hoạt động nào?", "Trượt tuyết", "Đua voi", 1],
  ["Ngày nay cần ưu tiên điều gì?", "Bảo tồn voi", "Săn voi", 0],
  [
    "Hội voi Buôn Đôn năm 2025 có hoạt động nào?",
    "Đua tốc độ",
    "Tiệc buffet cho voi",
    1,
  ],
  ["Thổ cẩm là loại sản phẩm nào?", "Vải dệt", "Đồ kim loại", 0],
  ["Khi quan sát voi, ta nên làm gì?", "Đến thật gần", "Giữ khoảng cách", 1],
];
export const orders = [
  {
    item: "Chiếc áo kể chuyện xưa",
    request:
      "Tôi muốn một chiếc áo gợi nhớ chuyện voi từng giúp người dân chở hàng qua rừng.",
    labels: ["Áo in cảnh chở hàng", "Áo in cảnh kiếm ăn", "Áo in hình cồng"],
    replies: [
      "Đúng rồi! Áo in cảnh voi chở hàng. Ngày trước voi từng giúp người dân vận chuyển những vật nặng qua đường rừng.",
      "Mẫu này kể chuyện voi dùng vòi hái lá. Vị khách đang tìm một câu chuyện về lao động ngày trước.",
      "Những chiếc cồng gợi đời sống văn hóa. Hãy tìm hình cho thấy voi từng giúp người dân vận chuyển.",
    ],
    thanks: "Đây chính là câu chuyện tôi muốn nhớ. Cảm ơn bạn!",
  },
  {
    item: "Chiếc túi của người quan sát",
    request:
      "Tôi muốn một chiếc túi để nhớ chuyến du lịch được ngắm voi sinh hoạt tự nhiên từ xa.",
    labels: [
      "Túi in bành chở người",
      "Túi in cảnh quan sát voi",
      "Túi in cảnh kéo gỗ",
    ],
    replies: [
      "Chiếc bành kể về việc chở người trước đây. Khách muốn nhớ trải nghiệm quan sát voi tự do.",
      "Chính xác! Khách đứng xa để voi được tự do kiếm ăn. Đây là trải nghiệm du lịch thân thiện với voi.",
      "Túi này kể về việc voi kéo gỗ trước đây. Hãy xem mẫu có khách quan sát từ xa.",
    ],
    thanks: "Đúng là điều tôi muốn ghi nhớ sau chuyến đi!",
  },
  {
    item: "Món quà từ bàn tay người dệt",
    request:
      "Tôi muốn mua một tấm vải làm quà và ủng hộ những người làm nghề dệt thủ công ở đây.",
    labels: ["Vải in công nghiệp", "Vải đính hình voi", "Vải dệt thủ công"],
    replies: [
      "Các hình voi lặp lại trên vải in công nghiệp. Khách đang muốn ủng hộ người làm nghề dệt.",
      "Con voi nhỏ được đính lên vải. Vị khách muốn chọn sản phẩm thể hiện kỹ thuật dệt.",
      "Đúng rồi! Tấm vải dệt gợi bàn tay người làm nghề. Việc mua đồ thủ công có thể góp phần nuôi sống người thợ và gìn giữ kỹ năng dệt.",
    ],
    thanks: "Tôi rất thích món quà này. Cảm ơn bạn!",
  },
];
