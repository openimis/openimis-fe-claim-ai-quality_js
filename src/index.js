import messages_en from "./translations/en.json";
import ClaimFilterByInsureeMedicalItem from "./components/ClaimFilterMedicalItem";
import ClaimFilterByInsureeMedicalService from "./components/ClaimFilterMedicalService";
import ClaimFilterWasCategorised from "./components/ClaimFilterWasCategorised";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "claim.ReviewsFilter": [ClaimFilterByInsureeMedicalItem, ClaimFilterByInsureeMedicalService, ClaimFilterWasCategorised],
}

export const ClaimAIQualityModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}