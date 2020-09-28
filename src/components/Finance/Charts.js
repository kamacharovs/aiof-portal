import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export const DefaultOptions = props => {
    const title = props.title;

    return {
        title: {
            display: true,
            text: title,
            fontSize: 20
        },
        legend: {
            display: true,
            position: 'right'
        }
    }
}

export class AssetLiabilityChart extends React.Component {
    render() {
        if (!this.props.assets 
            || !this.props.liabilities) {
            return null;
        }

        const title = 'Assets vs. Liabilities';
        const assetsSum = this.props.totalAssets 
            ? this.props.totalAssets
            : this.props.assets
                .map(a => a.value)
                .reduce((sum, current) => sum + current, 0);
        const liabilitiesSum = this.props.totalLiabilities 
            ? this.props.totalLiabilities
            : this.props.liabilities
                .map(a => a.value)
                .reduce((sum, current) => sum + current, 0);

        const state = {
            labels: ['Assets', 'Liabilities'],
            datasets: [
                {
                    label: title,
                    backgroundColor: [
                        '#2FDE00',
                        '#B21F00',
                    ],
                    hoverBackgroundColor: [
                        '#2FDE00',
                        '#B21F00',
                    ],
                    data: [assetsSum, liabilitiesSum]
                }
            ]
        }

        return (
            <Doughnut
                data={state || []}
                options={{
                    title: {
                        display: true,
                        text: title,
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        );
    }
}
