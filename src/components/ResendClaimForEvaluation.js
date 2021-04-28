import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { MenuItem} from "@material-ui/core";
import { formatMessage,formatMessageWithValues, withModulesManager, journalize, coreConfirm } from "@openimis/fe-core";
import { sendForAIEvaluationMutation } from "./../actions"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const styles = theme => ({
})

class SendClaimForEvaluation extends Component {
    _isMounted = false

    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            hidden: false
        }
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.submittingMutation && !this.props.submittingMutation) {
            this.props.journalize(this.props.mutation);
        } 
    }

    componentDidMount() {
        this.state.submitting = (!!this.state.submittingMutation && !this.state.submittingMutation)
        
        if (this.state.submitting && !!this.props.mutation) {
            this.props.journalize(this.props.mutation)
        }        
    }


    _labelMutation = (selection, labelOne, labelMultiple, action) => {
        if (selection.length === 1) {
            action(selection,
                formatMessageWithValues(
                    this.props.intl,
                    "claim_ai_quality",
                    labelOne,
                    { code: selection[0].code }
                ));
        } else {
            action(selection,
                formatMessageWithValues(
                    this.props.intl,
                    "claim_ai_quality",
                    labelMultiple,
                    { count: selection.length }
                ),
                selection.map(c => c.code)
            );
        }
    }
    
    sendForEvaluation = selection => {   
        this._labelMutation(selection,
            "ClaimEvaluation.mutationLabel",
            "ClaimsEvaluation.mutationLabel",
            this.props.sendForAIEvaluationMutation);
    }

    send_claims = (selection) => sendClaimForAIEvaluation(selection)

    call_action = (action) => {
        this.props.actionHandler(action)
    }

    render() {
        const { intl, actionHandler, selection, submittingMutation, journalizeHook } = this.props;
        let entries = [];
            entries.push({ 
                text: formatMessage(intl, "claim", "claim_ai_quality.resendForEvaluation"), 
                action: this.sendForEvaluation })
        return (
            <div style={{ display: selection.length > 0 ? "block" : "none" }}>
            {entries.map((i, idx) => (
                <MenuItem key={`selectionsMenu-claim_ai-${idx}`} 
                
                onClick={e => this.call_action(i.action)}>{i.text}</MenuItem>
            ))}
            </div>
        )
        
    }
}

const mapStateToProps = state => ({
    rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
    claimAdmin: state.claim.claimAdmin,
    claimHealthFacility: state.claim.claimHealthFacility,
    state_main: state.claim_ai_quality,
    userHealthFacilityFullPath: !!state.loc ? state.loc.userHealthFacilityFullPath : null,
    claimsPageInfo: state.claim_ai_quality.claimsPageInfo,
    mutation: state.claim_ai_quality.mutation,
    submittingMutation: state.claim_ai_quality.submittingMutation,
    confirmed: state.core.confirmed,
    //--    
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { sendForAIEvaluationMutation, journalize },
        dispatch);
};

export default withModulesManager(connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(withTheme(
        withStyles(styles)(SendClaimForEvaluation)
    ))));
