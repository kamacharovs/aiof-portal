import React from 'react';
import { Table } from 'react-bootstrap';
import { numberWithCommas } from './Common';

export const AssetTable = props => {
    if (props.assets) {
        return (
            <Table responsive="sm"
            borderless={true}>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>type</th>
                        <th>value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.assets.map(asset => {
                            return (
                                <tr>
                                    <td>{asset.name}</td>
                                    <td>{asset.typeName}</td>
                                    <td>${numberWithCommas(asset.value)}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        )
    }
    return null;
}

export const LiabilitiesTable = props => {
    if (props.liabilities) {
        return (
            <Table responsive="sm"
            borderless={true}>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>type</th>
                        <th>value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.liabilities.map(liability => {
                            return (
                                <tr>
                                    <td>{liability.name}</td>
                                    <td>{liability.typeName}</td>
                                    <td>${numberWithCommas(liability.value)}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        )
    }
    return null;
}

export const GoalsTable = props => {
    if (props.goals) {
        return (
            <Table responsive="sm"
            borderless={true}>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>type</th>
                        <th>amount</th>
                        <th>current amount</th>
                        <th>contribution</th>
                        <th>contribution frequency</th>
                        <th>planned date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.goals.map(goal => {
                            return (
                                <tr>
                                    <td>{goal.name}</td>
                                    <td>{goal.typeName}</td>
                                    <td>${numberWithCommas(goal.amount)}</td>
                                    <td>${numberWithCommas(goal.currentAmount)}</td>
                                    <td>${numberWithCommas(goal.contribution)}</td>
                                    <td>{goal.contributionFrequencyName}</td>
                                    <td>{goal.plannedDate}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        )
    }
    return null;
}