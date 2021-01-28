import { decodeId, baseApiUrl, openBlob, toISODate } from "@openimis/fe-core";
import _ from "lodash-uuid";

export function generateReport(prms) {
    var qParams = {
      adminUuid: prms.admin ? prms.admin.value.uuid : '',
      patientChfId: prms.chfId ? prms.chfId.value : '',
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
        .then(e => dispatch({ type: 'CLAIM_BATCH_PREVIEW_DONE', payload: prms }))
    }
  }


  export function preview() {
    return dispatch => {
      dispatch({ type: 'CLAIM_BATCH_PREVIEW' })
    }
  }