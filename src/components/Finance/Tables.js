import React from 'react';
import { Table } from 'react-bootstrap';

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
                                    <td>{asset.value}</td>
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