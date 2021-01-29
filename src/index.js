import messages_en from "./translations/en.json";
import ClaimFilterByInsureeMedicalItem from "./components/ClaimFilterMedicalItem";
import ClaimFilterByInsureeMedicalService from "./components/ClaimFilterMedicalService";
import ClaimFilterWasCategorised from "./components/ClaimFilterWasCategorised";
import reducer from "./reducer";
import ClaimAiCategorizationReport from "./components/ClaimAiCategorizationReport";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "reducers": [{ key: 'claim_ai_quality', reducer }],
  "claim.ReviewsFilter": [ClaimFilterByInsureeMedicalItem, ClaimFilterByInsureeMedicalService, ClaimFilterWasCategorised, ClaimAiCategorizationReport],
}

export const ClaimAIQualityModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}