import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';


const defaultAnimation = "pulse";
const defaultHeight = 200;
const defaultWidth = "100%";
const defaultVariant = "rect";
const defaultBoxMy = 1;

export const RectSkeleton = props => {
    const animation = props.animation || defaultAnimation;
    const height = props.height || defaultHeight;
    const width = props.width || defaultWidth;
    const variant = props.variant || defaultVariant;
    const my = props.boxMy || defaultBoxMy;

    return (
        <Box my={my}>
            <Skeleton
                animation={animation}
                variant={variant}
                width={width}
                height={height}
            />
        </Box>
    );
}
