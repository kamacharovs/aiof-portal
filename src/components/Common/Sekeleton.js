import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';


const defaultHeight = 200;
const defaultWidth = "100%";
const defaultVariant = "rect";

export const RectSkeleton = props => {
    const height = props.height ? props.height : defaultHeight;
    const width = props.width ? props.width : defaultWidth;
    const variant = props.variant ? props.variant : defaultVariant;

    return (
        <Skeleton variant={variant} width={width} height={height} />
    );
}