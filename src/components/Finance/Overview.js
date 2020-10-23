import React from 'react';


export const Overview = props => {
    return (
        <React.Fragment>
            <h3>Overview</h3>
            <hr/>

            Assets add value to your company and increase your company's equity, while liabilities decrease your company's value and equity.
            The more your assets outweigh your liabilities, the stronger the financial health of your business.
            But if you find yourself with more liabilities than assets, you may be on the cusp of going out of business.

            <br />
            <br/>

            <h6><b>Examples of Assets are:</b></h6>
            <ul>
                <li>Cash</li>
                <li>Investments</li>
                <li>Inventory</li>
                <li>Real estate</li>
            </ul>

            <h6><b>Examples of Liabilities are:</b></h6>
            <ul>
                <li>Bank debt</li>
                <li>Mortgage debt</li>
                <li>Money owed to suppliers (accounts payable)</li>
                <li>Wages owed</li>
                <li>Taxes owed</li>
            </ul>
        </React.Fragment>
    );
}