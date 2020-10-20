import React from 'react';
import Grid from '@material-ui/core/Grid';
import ClipLoader from "react-spinners/ClipLoader";

const defaultSize = 50;
const defaultFirstGridSize = 5;
const defaultSecondGridSize = 7;

export const AiofLoader = props => {
    const inProgress = props.inProgress ? props.inProgress : false;
    const size = props.size ? props.size : defaultSize;

    return (
        <div className="sweet-loading">
            <ClipLoader
                size={size}
                color={"#123abc"}
                loading={inProgress}
            />
        </div>
    );
}

export const AiofGridLoader = props => {
    const inProgress = props.inProgress ? props.inProgress : false;
    const size = props.size ? props.size : defaultSize;
    const firstGridSize = props.firstGridSize ? props.firstGridSize : defaultFirstGridSize;
    const secondGridSize = props.secondGridSize ? props.secondGridSize : defaultSecondGridSize;

    return (
        <Grid container spacing={1}>
            <Grid item xs={firstGridSize}>
            </Grid>
            <Grid item xs={secondGridSize}>
                <div className="sweet-loading">
                    <ClipLoader
                        size={size}
                        color={"#123abc"}
                        loading={inProgress}
                    />
                </div>
            </Grid>
        </Grid>
    );
}