import { decodeId, baseApiUrl, openBlob, toISODate, formatMessageWithValues, formatMutation, graphql } from "@openimis/fe-core";
import _ from "lodash-uuid";


export function generateReport(prms) {
    var qParams = {
      adminUuid: prms.admin ? prms.admin.value.uuid : '',
      patientChfId: prms.chfId ? prms.chfId.value : '',
      claimStatus: prms.claimStatus ? prms.claimStatus.value : '',
      claimDateFrom: prms.claimDateFrom ? prms.claimDateFrom.value : '',
      claimDateTo: prms.claimDateTo ? prms.claimDateTo.value : '',
      claimCode: prms.claimNo ? prms.claimNo.value : '',
      claimedUnder: prms.claimedUnder ? prms.claimedUnder.value : '',
      claimedAbove: prms.claimedAbove ? prms.claimedAbove.value : '',
      districtUuid: prms.district ? prms.district.value.uuid : '',
      feedbackStatusCode: prms.feedbackStatus ? prms.feedbackStatus.value : '',
      healthFacilityUuid: prms.healthFacility ? prms.healthFacility.value.uuid : '',
      jsonExt: prms.jsonExt ? prms.jsonExt.value : '',
      diagnosisCode: prms.mainDiagnosis ? prms.mainDiagnosis.value.code : '',
      medicalItemCode: prms.medicalItem ? prms.medicalItem.value.code : '',
      medicalServiceCode: prms.medicalService ? prms.medicalService.value.code : '',
      regionUuid: prms.region ? prms.region.value.uuid : '',
      visitDateFrom: prms.visitDateFrom ? prms.visitDateFrom.value : '',
      visitDateTo: prms.visitDateTo ? prms.visitDateTo.value : ''
    }

    var url = new URL(`${window.location.origin}${baseApiUrl}/claim_ai_quality/report/`);
    url.search = new URLSearchParams(qParams);
    return (dispatch) => {
      return fetch(url)
        .then(response => response.blob())
        .then(blob => openBlob(blob, `${_.uuid()}.pdf`, "pdf"))
        .then(e => dispatch({ type: 'CLAIM_AI_PREVIEW_DONE', payload: prms }))
    }
  }


  export function preview() {
    return dispatch => {
      dispatch({ type: 'CLAIM_AI_PREVIEW' })
    }
  }


export function sendForAIEvaluationMutation(claims, clientMutationLabel, clientMutationDetails = null) {
  let claimUuids = `uuids: ["${claims.map(c => c.uuid).join("\",\"")}"]`
  let mutation = formatMutation(
    "sendClaimsForAiEvaluation",
    claimUuids,
    clientMutationLabel,
    clientMutationDetails
  );
  var requestedDateTime = new Date();
  claims.forEach(c => c.clientMutationId = mutation.clientMutationId);
  return graphql(
    mutation.payload,
    ['CLAIM_AI_MUTATION_REQ', 'CLAIM_AI_MUTATION_RESP', 'CLAIM_AI_MUTATION_ERR'],
    {
      clientMutationId: mutation.clientMutationId,
      clientMutationLabel,
      clientMutationDetails: !!clientMutationDetails ? JSON.stringify(clientMutationDetails) : null,
      requestedDateTime
    }
  )
}


let _labelMutation = (intl, selection, labelOne, labelMultiple, action) => {
    if (selection.length === 1) {
        action(selection,
            formatMessageWithValues(
                intl,
                "claim_ai_quality",
                labelOne,
                { code: selection[0].code }
            ));
    } else {
        action(selection,
            formatMessageWithValues(
                intl,
                "claim_ai_quality",
                labelMultiple,
                { count: selection.length }
            ),
            selection.map(c => c.code)
        );
    }
}

export function sendClaimForAIEvaluation(selection) {
    // _labelMutation(intl, selection,
    //   "ProcessClaim.mutationLabel",
    //   "ProcessClaims.mutationLabel",
    //   sendForAIEvaluationMutation);

    var url = new URL(`${window.location.origin}${baseApiUrl}/graphql`);
    url.search = new URLSearchParams(qParams);
    return (dispatch) => {
      return fetch(url)
        .then(response => response.blob())
        .then(blob => openBlob(blob, `${_.uuid()}.pdf`, "pdf"))
        .then(e => dispatch({ type: 'CLAIM_AI_PREVIEW_DONE', payload: prms }))
    }
  }

export function claimReviewSelectionmenuContribution(selection) {
  return "ProcessClaim.mutationLabel", "ProcessClaims.mutationLabel", sendForAIEvaluationMutation
}

