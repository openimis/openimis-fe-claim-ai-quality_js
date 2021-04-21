import messages_en from "./translations/en.json";
import ClaimFilterWasCategorised from "./components/ClaimFilterWasCategorised";
import reducer from "./reducer";
import ClaimAiCategorizationReport from "./components/ClaimAiCategorizationReport";
import { sendForAIEvaluationMutation, sendClaimForAIEvaluation, claimReviewSelectionmenuContribution } from "./actions"

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "reducers": [{ key: 'claim_ai_quality', reducer }],
  "claim.ReviewsFilter": [ClaimFilterWasCategorised, ClaimAiCategorizationReport],
  "claim.ReviewSelectionAction": [{ 
      label: "claim_ai_quality.resendForEvaluation", 
      enabled: selection => !!selection && selection.length, 
      action: sendForAIEvaluationMutation,
      single_selection_action_label: "claim_ai_quality.ClaimEvaluation.mutationLabel",
      multiple_selection_action_label: "claim_ai_quality.ClaimsEvaluation.mutationLabel"
  }],
}

export const ClaimAIQualityModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}