import {
  parseData, dispatchMutationReq, dispatchMutationResp, dispatchMutationErr,
  pageInfo, formatServerError, formatGraphQLError
} from '@openimis/fe-core';

function reducer(
  state = {
    generatingReport: false,
  },
  action,
) {
  switch (action.type) {
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
