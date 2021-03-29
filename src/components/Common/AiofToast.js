import React from 'react';
import { toast } from "react-toastify";

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';


export function success(nodeOrMsg) {
    return toast.success(
        <div>
            <CheckOutlinedIcon style={{ marginRight: '0.25rem' }} />
            {nodeOrMsg}
        </div>
    );
}