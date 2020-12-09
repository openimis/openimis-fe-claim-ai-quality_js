import messages_en from "./translations/en.json";
import ClaimFilterByInsureeMedicalItem from "./components/ClaimFilterMedicalItem";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "claim.ReviewsFilter": [ClaimFilterByInsureeMedicalItem]
}

export const ClaimAIQualityModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}