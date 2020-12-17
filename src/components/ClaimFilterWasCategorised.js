import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Grid, FormControlLabel, Checkbox } from "@material-ui/core";



const styles = theme => ({
    item: {
        padding: theme.spacing(1)
    },
})


class ClaimFilterWasCategorised extends Component {

    state = {
        reset: 0,
        categorized: true,
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
    
    _addWasCategorized(categorized=true) {
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

    _onWasCategorizedCheckbox() {
        this.setState({
            categorized: !this.state.categorized,
            reset: this.state.reset + 1,
        });
    }

    _checkAddCategorization(json_ext, prev_json_ext) {
        const { filters } = this.props;
        var json_not_exists = (json_ext === null);
        var prev_claim_param = prev_json_ext['value']
        var valueExisted = !!prev_claim_param['claim_ai_quality']
        var valueUpdated = false
        var wasCategorized = false
        if (valueExisted) {
            wasCategorized = prev_claim_param['claim_ai_quality']['was_categorized']
        }
        console.log("Was cat: " + wasCategorized)
        var valueUpdated = (wasCategorized != this.state.categorized && this.state.categorized === true);

        var statusChecked = (!!filters['claimStatus'] && filters['claimStatus']['value'] === 4)

        return statusChecked && (json_not_exists || valueUpdated)  
    }

    _checkRemoveJson(json_ext) {
        var checkboxState = this.state.categorized === false;
        var jsonHasAttribute = (!!json_ext && !!json_ext['value']['claim_ai_quality'])
        console.log(JSON.stringify(json_ext), json_ext['value']['claim_ai_quality'])
        return checkboxState && jsonHasAttribute
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { filters } = this.props;

        var json_ext = !!filters['jsonExt'] ? filters['jsonExt'] : null
        var prev_json_ext = !!prevProps.filters['jsonExt'] ? prevProps.filters['jsonExt'] : {'value': {}} 
        
        if (this._checkAddCategorization(json_ext, prev_json_ext)) {
            this._addWasCategorized();
        } else if (this._checkRemoveJson(json_ext)) {
            this._removeWasCategorized();
        }
    }

    render() {
        const { classes, filters, onChangeFilters } = this.props;
        return (
            <Grid item xs={4} className={classes.item}>
                <FormControlLabel 
                        control={
                            <Checkbox
                                color="primary"
                                checked={this.state.categorized}
                                onChange={e => this._onWasCategorizedCheckbox()}
                            />
                        }
                        label="Categorized by AI"
                    />
            </Grid>
        )
    }
}

export default withTheme(withStyles(styles)(ClaimFilterWasCategorised));
