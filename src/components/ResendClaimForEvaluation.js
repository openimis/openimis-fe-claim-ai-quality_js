import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Grid, FormControlLabel, Checkbox, Select, MenuItem} from "@material-ui/core";
import { formatMessage, withModulesManager, SelectInput } from "@openimis/fe-core";
import { sendClaimForAIEvaluation } from "..actions"



class SendClaimForEvaluation extends Component {

    _labelMutation = (selection, labelOne, labelMultiple, action) => {
        if (selection.length === 1) {
            action(selection,
                formatMessageWithValues(
                    this.props.intl,
                    "claim",
                    labelOne,
                    { code: selection[0].code }
                ));
        } else {
            action(selection,
                formatMessageWithValues(
                    this.props.intl,
                    "claim",
                    labelMultiple,
                    { count: selection.length }
                ),
                selection.map(c => c.code)
            );
        }
    }
    
    send_claims = (selection) => sendClaimForAIEvaluation(selection)

    render() {
        return (
           <Grid>
                Hello world!
            </Grid>
        )
    }
}

export default withModulesManager(injectIntl(withTheme(withStyles(styles)(SendClaimForEvaluation))));
