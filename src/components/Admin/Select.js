import React, { useState } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import { SquarePaper } from '../../style/mui';

import { userEntity, clientEntity, entities, userApis, clientApis } from './Common';
import UserView from './User';
import ClientView from './Client';


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const SelectView = props => {
    const [entity, setEntity] = useState("");
    const [api, setApi] = useState("");
    const [apiCallList, setApiCallList] = useState("");

    const handleSetEntity = (value) => {
        setEntity(value);
        handleSetApiCallList(value);
    }
    const handleSetApiCallList = (value) => {
        setApi("");

        if (value === userEntity) {
            setApiCallList(userApis);
        } else if (value === clientEntity) {
            setApiCallList(clientApis);
        }
    }

    return (
        <React.Fragment>
            <SquarePaper variant="outlined" square>
                <Grid container>
                    <Grid item xs>
                        <Grid container direction="column">
                            <Grid item xs>
                                <Typography variant="h6">
                                    What entity are you looking for?
                                </Typography>
                            </Grid>

                            <Grid item xs>
                                <Select
                                    required
                                    value={entity}
                                    onChange={e => handleSetEntity(e.target.value)} >
                                    {
                                        entities.map(e => {
                                            return (
                                                <MenuItem key={e} value={e}>{e}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>

                    {apiCallList.length > 0
                        ? <Grid item xs>
                            <Grid container direction="column">
                                <Grid item xs>
                                    <Typography variant="h6">
                                        Choose an API call
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Select
                                        required
                                        value={api}
                                        onChange={e => setApi(e.target.value)} >
                                        {
                                            apiCallList.map(a => {
                                                return (
                                                    <MenuItem key={a} value={a}>{a}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                </Grid>
                            </Grid>
                        </Grid>
                        : null
                    }
                </Grid>
            </SquarePaper>

            <UserView
                api={api} />

            <ClientView
                api={api} />
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectView);