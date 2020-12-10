import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
import { formatMessage, FormattedMessage, PublishedComponent, withModulesManager } from "@openimis/fe-core";

import { Grid } from "@material-ui/core"

const styles = theme => ({
    item: {
        padding: theme.spacing(1)
    },
})



class ClaimFilterByInsureeMedicalItem extends Component {
    _filterValue = k => {
        const { filters } = this.props;
        return !!filters[k] ? filters[k].value : null
    }

    render() {
        const { intl, classes, filters, onChangeFilters } = this.props;
        return (
            <Grid item xs={3} className={classes.item}>
            <PublishedComponent
                pubRef="medical.ItemPicker"
                name="medicalItem"
                label= {formatMessage(intl, "claim_ai_quality", "medicalItemFilter.label")}
                value={(filters['medicalItem'] && filters['medicalItem']['value']) || null}
                onChange={(v, s) => onChangeFilters([
                    {
                        id: 'medicalItem',
                        value: v,
                        filter: `items: ["${!!v && v.code}"]`
                    }
                ])}
            />
        </Grid>
        );
    }
}

export default withModulesManager(injectIntl(withTheme(withStyles(styles)(ClaimFilterByInsureeMedicalItem))));
