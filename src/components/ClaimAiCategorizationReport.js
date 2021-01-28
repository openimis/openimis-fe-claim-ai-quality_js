import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PreviewIcon from "@material-ui/icons/ListAlt";
import { formatMessage, FormattedMessage, PublishedComponent, withModulesManager } from "@openimis/fe-core";
import { preview, generateReport } from "../actions"

import { Grid, IconButton, CircularProgress } from "@material-ui/core"

const styles = theme => ({
    item: {
        padding: theme.spacing(1)
    },
    generating: {
        margin: theme.spacing(1)
    }
})




class ClaimAiCategorizationReport extends Component {
    _filterValue = k => {
        const { filters } = this.props;
        return !!filters[k] ? filters[k].value : null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { filters } = this.props;
        if (!prevProps.generating && !!this.props.generating) {
            console.log("STATE: " + this.state)
            console.log(filters)
            this.props.generateReport({ ...filters })
        } 
    }

    render() {
        const { intl, classes, generating } = this.props;
        return (
            <Grid item className={classes.paperHeaderAction}>
            {!generating &&
                <IconButton onClick={e => this.props.preview()}>
                    <PreviewIcon />
                </IconButton>
            }
            {!!generating && <CircularProgress className={classes.generating} size={24} />}
        </Grid>
        );
    }
}

const mapStateToProps = state => ({
    generating: state.claim_batch.generating,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { preview, generateReport },
        dispatch);
};

export default injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ClaimAiCategorizationReport))));
