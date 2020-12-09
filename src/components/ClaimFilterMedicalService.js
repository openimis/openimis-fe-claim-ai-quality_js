import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
import { formatMessage, FormattedMessage, PublishedComponent } from "@openimis/fe-core";

import { Grid } from "@material-ui/core"

const styles = theme => ({
    service: {
        padding: theme.spacing(1)
    },
})



class ClaimFilterByInsureeMedicalService extends Component {
    _filterValue = k => {
        const { filters } = this.props;
        return !!filters[k] ? filters[k].value : null
    }

    render() {
        const { intl, classes, filters, onChangeFilters } = this.props;
        return (
            <Grid service xs={3} className={classes.service}>
            <PublishedComponent
                id="medical.ServicePicker"
                name="medicalService"
                //label={formatMessage(intl, "claim", "medicalService")}
                value={(filters['medicalService'] && filters['medicalService']['value']) || null}
                onChange={(v, s) => onChangeFilters([
                    {
                        id: 'medicalService',
                        value: v,
                        filter: `services: ["${!!v && v.code}"]`
                    }
                ])}
            />
        </Grid>
        );
    }
}

export default withTheme(withStyles(styles)(ClaimFilterByInsureeMedicalService));
