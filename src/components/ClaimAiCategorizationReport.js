import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PreviewIcon from "@material-ui/icons/ListAlt";
import { formatMessage, FormattedMessage, PublishedComponent, withModulesManager } from "@openimis/fe-core";
import { preview, generateReport } from "../actions"

import { Grid, IconButton, CircularProgress, Button } from "@material-ui/core"

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
        const { filters } = this.props;
        var new_status = [8, 16].includes(!!filters['claimStatus'] ? filters['claimStatus'].value : '')
        
        if (new_status != prevState.hidden) {
            this.setState({hidden: new_status})
        }

        if (!prevProps.generating && !!this.props.generating) {
            this.props.generateReport({ ...filters })
        } 
    }

    render() {
        const { intl, classes, generating } = this.props;
        return (
            <Grid item className={classes.item}>
            {!generating &&
                <Button 
                    onClick={e => this.props.preview()}
                    variant="contained" color="primary"
                    style={{visibility: !this.state.hidden ? 'visible' : 'hidden' }}
                    >
                    {formatMessage(intl, "claim_ai_quality", "misclassificationReport.label")}
                </Button>
            }
            {!!generating && <CircularProgress className={classes.generating} size={24} />}
        </Grid>
        );
    }
}

const mapStateToProps = state => ({
    generating: state.claim_ai_quality.generating,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { preview, generateReport },
        dispatch);
};

export default injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ClaimAiCategorizationReport))));
