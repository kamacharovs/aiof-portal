import React from 'react';
import { toast } from "react-toastify";

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';


export function success(nodeOrMsg) {
    return toast.success(
        <div>
            <CheckOutlinedIcon style={{ marginRight: '0.25rem' }} />
            {nodeOrMsg}
        </div>
    );
}

export function error(nodeOrMsg) {
    return toast.error(
        <div>
            <CloseOutlinedIcon style={{ marginRight: '0.25rem' }} />
            {nodeOrMsg}
        </div>
    );
}