import { asset } from "../assets.js";

const url = (file) =>
  new URL("../../assets/epilogue/" + file, import.meta.url).href;

export const epBranchIcons = Array.from({ length: 6 }, (_, i) =>
  asset("IC-UI0" + (i + 2)),
);

export const epAssets = {
  "EP-AU01": url("audio/ep_au01_homecoming.ogg"),
  "EP-AU02": url("audio/ep_au02_transmit.ogg"),
  "EP-AU03": url("audio/ep_au03_closing.ogg"),
  "EP-BG01": asset("PR-BG02"),
  "EP-BG02": url("backgrounds/ep_bg02_lab_warm.webp"),
  "EP-BG03": asset("PR-BG04"),
  "EP-BG04": url("backgrounds/ep_bg04_spark_antenna.webp"),
  "EP-BG05": asset("PR-BG01"),
  "EP-BG06": url("backgrounds/ep_bg06_paper_final.webp"),
  "EP-CH01": url("characters/ep_ch01_researcher_return.webp"),
  "EP-CH02": url("characters/ep_ch02_researcher_reflect.webp"),
  "EP-CH03": url("characters/ep_ch03_researcher_compassion.webp"),
  "EP-CH04": url("characters/ep_ch04_researcher_farewell.webp"),
  "EP-FX01": url("effects/ep_fx01_six_node_halos.webp"),
  "EP-FX02": url("effects/ep_fx02_transmission_streams.webp"),
  "EP-FX03": url("effects/ep_fx03_closing_vignette.webp"),
  "EP-OB01": url("props/ep_ob01_completed_elephant_holo.webp"),
  "EP-OB02": asset("PR-UI05"),
  "EP-OB03": url("props/ep_ob03_past_transport.webp"),
  "EP-OB04": url("props/ep_ob04_now_observation.webp"),
  "EP-OB05": url("props/ep_ob05_past_tools.webp"),
  "EP-OB06": url("props/ep_ob06_now_welfare.webp"),
  "EP-OB07": url("props/ep_ob07_past_heritage.webp"),
  "EP-OB08": url("props/ep_ob08_now_community.webp"),
  "EP-OB09": url("props/ep_ob09_choice_life.webp"),
  "EP-OB10": url("props/ep_ob10_choice_memory.webp"),
  "EP-OB11": url("props/ep_ob11_choice_coexist.webp"),
  "EP-OB12": url("props/ep_ob12_transmission_ribbons.webp"),
  "EP-OB13": url("props/ep_ob13_saved_archive.webp"),
  "EP-UI01": asset("PR-UI05"),
  "EP-UI02": url("ui/ep_ui02_then_now_pair.webp"),
  "EP-UI04": url("ui/ep_ui04_three_message_cards.webp"),
  "EP-UI06": url("ui/ep_ui06_transmission_plate.webp"),
  "EP-UI07": url("ui/ep_ui07_archive_complete_seal.webp"),
  "EP-UI08": url("ui/ep_ui08_final_quote_plate.webp"),
  "EP-UI10": asset("PR-UI02"),
};
