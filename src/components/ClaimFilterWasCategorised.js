import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Grid, FormControlLabel, Checkbox, Select, MenuItem} from "@material-ui/core";
import { formatMessage, withModulesManager, SelectInput } from "@openimis/fe-core";



const styles = theme => ({
    item: {
        padding: theme.spacing(1)
    },
})


class ClaimFilterWasCategorised extends Component {

    state = {
        reset: 0,
        categorized: 1,
    }

    _assignExtValueToFilter(json_ext_value) {
        const { onChangeFilters } = this.props;
        var fallback = JSON.stringify(json_ext_value).replaceAll('\"', '\\"')

        onChangeFilters([
            {
                id: 'jsonExt',
                value: json_ext_value,
                filter: `jsonExt: "${fallback}"`
            }
        ]);
    }
    
    _addWasCategorized(categorized=1) {
        const { filters } = this.props;

        var json_ext = !!filters['jsonExt'] ? filters['jsonExt'] : null
        var v = !!json_ext ? json_ext['value'] : {}

        v.claim_ai_quality = {}
        v.claim_ai_quality.was_categorized = categorized
        this._assignExtValueToFilter(v)
    }

    _removeWasCategorized() {
        const { filters } = this.props;
        var json_ext = !!filters['jsonExt'] ? filters['jsonExt'] : null

        if (json_ext !== null && !!json_ext['value'] && !!json_ext['value']['claim_ai_quality']) {
            delete json_ext['value']['claim_ai_quality']
            this._assignExtValueToFilter(json_ext['value'])
        } 
    }

    _onWasCategorized(state) {
        this.setState({
            categorized: state,
            reset: this.state.reset + 1,
        });
    }

    _checkAddCategorization(prev_props) {
        const { filters } = this.props;
        var json_ext = !!filters['jsonExt'] ? filters['jsonExt'] : null
        var json_not_exists = (json_ext === null);

        var prev_json_ext = !!prev_props.filters['jsonExt'] ? prev_props.filters['jsonExt'] : {'value': {}} 
        var prev_claim_param = prev_json_ext['value']
        
        var valueExisted = !!prev_claim_param['claim_ai_quality']
        var valueUpdated = false
        var wasCategorized = -1
        
        if (valueExisted) {
            wasCategorized = prev_claim_param['claim_ai_quality']['was_categorized'] === true ? 1 : 2
        }

        var valueUpdated = (wasCategorized !== this.state.categorized);
        var statusChecked = (!!filters['claimStatus'] && filters['claimStatus']['value'] === 4)

        return statusChecked && (json_not_exists || valueUpdated)  
    }

    _checkRemoveJson() {
        const { filters } = this.props;
        var json_ext = !!filters['jsonExt'] ? filters['jsonExt'] : null
        var removeState = (this.state.categorized === null)
        var jsonHasAttribute = (!!json_ext && !!json_ext['value']['claim_ai_quality'])
        return removeState && jsonHasAttribute
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { filters } = this.props;
        
        if (this._checkRemoveJson()) {
            this._removeWasCategorized()
        } else if (this._checkAddCategorization(prevProps)) {
            if (this.state.categorized === 1)
                this._addWasCategorized(true)
            if (this.state.categorized === 2)
                this._addWasCategorized(false)
        }
    }

    render() {
        const { intl, classes, filters, onChangeFilters } = this.props;
        const options = [
            {value: 1, label: formatMessage(intl, "claim_ai_quality", "categorizedOnly.label")},
            {value: 2, label: formatMessage(intl, "claim_ai_quality", "nonCategorizedOnly.label")},
            {value: null, label: formatMessage(intl, "claim_ai_quality", "allCategorized.label")}
        ]
        const state = this.state.categorized
        return (
            <Grid item xs={3} className={classes.item}>
                <SelectInput
                    module='claim'
                    strLabel={formatMessage(intl, "claim_ai_quality", "categorizedByAI.label")}
                    options={options}
                    value={state}
                    onChange={v => this._onWasCategorized(v)}
                />
            </Grid>
        )
    }
}

export default withModulesManager(injectIntl(withTheme(withStyles(styles)(ClaimFilterWasCategorised))));
