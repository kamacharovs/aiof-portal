import React from 'react';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


const LiabilityOverview = props => {
    return (
        <React.Fragment>
            <Paper>
                <Typography variant="h1">
                    Liabilities
                </Typography>
                <p>
                    A financial liabilities definition. Any future sacrifices of economic benefits that an
                    entity is required to make as a result of its past transactions or any other activity
                    in the past. The future sacrifices to be made by the entity can be in the form of any
                    money or service owed to the other party.
                </p>
            </Paper>
        </React.Fragment>
    );
}

export default LiabilityOverview;