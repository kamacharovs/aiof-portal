import React from 'react';

import { useTheme } from '@material-ui/core/styles';

import { SquarePaper } from '../../../style/mui';


const AssetOverview = props => {
    const theme = useTheme();

    return (
        <React.Fragment>
            <SquarePaper variant="outlined" square>
                <div style={{ color: theme.palette.secondary.dark }}>
                    <h2><strong>Assets</strong></h2>
                </div>
                <p>
                    A financial asset is a liquid asset that gets its value from a contractual right or ownership claim.
                    Cash, stocks, bonds, mutual funds, and bank deposits are all are examples of financial assets.
                    Unlike land, property, commodities, or other tangible physical assets, financial assets do not necessarily have inherent physical worth or even a physical form.
                    Rather, their value reflects factors of supply and demand in the marketplace in which they trade, as well as the degree of risk they carry.
                </p>
            </SquarePaper>
        </React.Fragment>
    );
}

export default AssetOverview;