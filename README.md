# openIMIS Frontend Claim AI Quality reference module
This repository holds the files of the openIMIS Frontend Claim AI Quality reference module.
It is dedicated to be deployed as a module of [openimis-fe_js](https://github.com/openimis/openimis-fe_js).

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

## Main Menu Contributions
None



## Other Contributions
* `claim.ReviewsFilter`: new filter allowing filtering claims by AI Evaluation 
* `claim.ReviewsFilter`: new button allowing generating Claim AI Report with data based on rest of the filters 

## Available Contribution Points
None

## Published Components
* `claim_ai_quality.ResendClaimForEvaluation`, additional Searcher menu entry for sending selected checked claims for reevaluation

## Dispatched Redux Actions
* `CLAIM_AI_MUTATION_{REQ|RESP|ERR}`: sending checked claims for reevaluation


## Other Modules Listened Redux Actions
None

## Other Modules Redux State Bindings
* `state.core.user`, to access user info (rights,...)


## Configurations Options
##### ClaimAiProcessed
Information regarding claim evaluation is stored in json_ext. In order for the ClaimAiProcessed column to be visible in the claim searcher results, an additional extField configuration for fe-claim is required. 
Example content of fe-claim config json added through django admin panel:
```
{ 
 "extFields": ["claim_ai_quality.was_categorized"]
}
```