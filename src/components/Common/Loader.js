import React from 'react';
import Grid from '@mui/material/Grid';
import ClipLoader from "react-spinners/ClipLoader";

const defaultSize = 50;
const defaultFirstGridSize = 5;
const defaultSecondGridSize = 7;
const defaultColor = "#123abc";

export const AiofLoader = props => {
    const inProgress = props.inProgress ? props.inProgress : false;
    const size = props.size ? props.size : defaultSize;
    const br = props.br ? props.br : false;
    const color = props.color ? props.color : defaultColor;

    return (
        <div className="sweet-loading">
            { br ? <br/> : null }
            <ClipLoader
                size={size}
                color={color}
                loading={inProgress}
            />
        </div>
    );
}

export const AiofGridLoader = props => {
    const inProgress = props.inProgress ? props.inProgress : false;
    const size = props.size ? props.size : defaultSize;
    const br = props.br ? props.br : true;
    const color = props.color ? props.color : defaultColor;
    const firstGridSize = props.firstGridSize ? props.firstGridSize : defaultFirstGridSize;
    const secondGridSize = props.secondGridSize ? props.secondGridSize : defaultSecondGridSize;

    return (
        <Grid container spacing={1}>
            <Grid item xs={firstGridSize}>
            </Grid>
            <Grid item xs={secondGridSize}>
                <div className="sweet-loading">
                    { br ? <br/> : null }
                    <ClipLoader
                        size={size}
                        color={color}
                        loading={inProgress}
                    />
                </div>
            </Grid>
        </Grid>
    );
}