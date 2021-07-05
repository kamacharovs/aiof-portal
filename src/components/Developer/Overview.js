import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { SquarePaper, TextMain } from '../../style/mui';


const OverviewView = props => {
    return (
        <React.Fragment>
            <SquarePaper variant="outlined" square>
                <Grid container>
                    <Grid item xs>
                        <Typography variant="h1">
                            Developer
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs>
                        <TextMain>
                            Welcome to our developer page. Here, you'll find our latest snapshot information
                            on all of our <a href="https://en.wikipedia.org/wiki/API" target="_blank" rel="noopener noreferrer">API's</a>. 
                            Additionally, if you click on the "Full documentation" links to any of them, you'll be taken to their
                            ReDoc definitions based on their corresponding <a href="https://swagger.io/specification/" target="_blank" rel="noopener noreferrer">Open API</a> specs.
                            
                            <br/><br/>

                            If you have any questions or would like further assistance, please reach out to the corresponding contact.
                            Full documentation and quickstart guides are coming soon.
                        </TextMain>
                    </Grid>
                </Grid>
            </SquarePaper>
        </React.Fragment>
    );
}

export default OverviewView;