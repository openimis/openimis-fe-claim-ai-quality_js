import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PreviewIcon from "@material-ui/icons/ListAlt";
import { formatMessage, FormattedMessage, PublishedComponent, withModulesManager, journalize } from "@openimis/fe-core";
import { preview, generateReport, generateSelectionReport } from "../actions"

import { Grid, IconButton, CircularProgress, Button, MenuItem } from "@material-ui/core"

const styles = theme => ({
    item: {
        padding: theme.spacing(1)
    },
    generating: {
        margin: theme.spacing(1)
    }
})




class ClaimAiCategorizationReport extends Component {
    state = {
        hidden: false,
        claim_ai: null
    }

    _filterValue = k => {
        const { filters } = this.props;
        return !!filters[k] ? filters[k].value : null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { filters, selection } = this.props;
        var new_status = [2, 4].includes(!!filters['claimStatus'] ? filters['claimStatus'].value : '')
        
        if (new_status != prevState.hidden) {
            this.setState({hidden: new_status})
        }

        if (!prevProps.generating && !!this.props.generating) {
            if (selection.length > 0){
                this.props.generateSelectionReport({...filters}, selection)
            }
            else
                this.props.generateReport({ ...filters })
        } 
    }

    render() {
        const { intl, classes, generating } = this.props;
        return (
            <div>
            {!generating &&
                <MenuItem key={`selectionsMenu-claim_ai-${classes.item}`} 
                          onClick={e => this.props.preview()}>
                    {formatMessage(intl, "claim_ai_quality", "misclassificationReport.label")}
                </MenuItem>
            }
            {!!generating && <CircularProgress className={classes.generating} size={24} />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    generating: state.claim_ai_quality.generating,
    claimsPageInfo: state.claim.claimsPageInfo,
    filters: state.core.filtersCache.claimReviewsPageFiltersCache,
    //props used from super.componentDidUpdate !!
    submittingMutation: state.claim.submittingMutation,
    mutation: state.claim.mutation,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { preview, generateReport, generateSelectionReport, journalize },
        dispatch);
};

export default injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ClaimAiCategorizationReport))));
