import messages_en from "./translations/en.json";
import ClaimFilterByInsureeMedicalService from "./components/ClaimFilterMedicalService";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "claim.Filter": [ClaimFilterByInsureeMedicalService]
}

export const ClaimAIQualityModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}