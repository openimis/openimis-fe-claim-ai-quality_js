import messages_en from "./translations/en.json";
import ClaimFilterByInsureeMedicalItem from "./components/ClaimFilterMedicalItem";
import ClaimFilterByInsureeMedicalService from "./components/ClaimFilterMedicalService";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "claim.ReviewsFilter": [ClaimFilterByInsureeMedicalItem, ClaimFilterByInsureeMedicalService]
}

export const ClaimAIQualityModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}