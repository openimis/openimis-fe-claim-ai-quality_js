import messages_en from "./translations/en.json";
import ClaimFilterWasCategorised from "./components/ClaimFilterWasCategorised";
import reducer from "./reducer";
import ClaimAiCategorizationReport from "./components/ClaimAiCategorizationReport";
import SendClaimForEvaluation from "./components/ResendClaimForEvaluation";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "reducers": [{ key: 'claim_ai_quality', reducer }],
  "claim.ReviewsFilter": [ClaimFilterWasCategorised],
  "claim.ReviewSelectionAction": [SendClaimForEvaluation, ClaimAiCategorizationReport]
}

export const ClaimAIQualityModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}