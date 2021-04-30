import {
  parseData, dispatchMutationReq, dispatchMutationResp, dispatchMutationErr,
  pageInfo, formatServerError, formatGraphQLError
} from '@openimis/fe-core';

function reducer(
  state = {
    fetchingClaimCodeCount: false,
    fetchedClaimCodeCount: false,
    claimCodeCount: null,
    errorClaimCodeCount: null,
    
    submittingMutation: false,
    generatingReport: false,
    claims: null,
    claimsPageInfo: { totalCount: 0 },
    errorClaim: null,
    claim: {},
    mutation: {},
  },
  action,
) {
  switch (action.type) {
      case 'CLAIM_AI_MUTATION_REQ':
        return dispatchMutationReq(state, action);
      case 'CLAIM_AI_MUTATION_RESP':
        return dispatchMutationResp(state, "sendClaimsForAiEvaluation", action);
      case 'CLAIM_AI_MUTATION_ERR':
        return dispatchMutationErr(state, action);
      case 'CLAIM_AI_PREVIEW':
          return {
              ...state,
              generating: true,
          };
      case 'CLAIM_AI_PREVIEW_DONE':
          return {
              ...state,
              generating: false
          };
      default:
          return state;
  }
}

export default reducer;

