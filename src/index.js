import messages_en from "./translations/en.json";
import ClaimFilterWasCategorised from "./components/ClaimFilterWasCategorised";
import reducer from "./reducer";
import ClaimAiCategorizationReport from "./components/ClaimAiCategorizationReport";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "reducers": [{ key: 'claim_ai_quality', reducer }],
  "claim.ReviewsFilter": [ClaimFilterWasCategorised, ClaimAiCategorizationReport],
}

export const ClaimAIQualityModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}