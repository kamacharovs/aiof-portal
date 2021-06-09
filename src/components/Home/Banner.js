import React from 'react';

import Grid from '@material-ui/core/Grid';

import { H1Alt6, PAlt7 } from '../../style/common';
import { SquarePaper } from '../../style/mui';


const BannerView = props => {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs>
          <SquarePaper variant="outlined" square>
            <H1Alt6>Welcome to {props.appFullName}</H1Alt6>
            <PAlt7>
              We provide personal finance tools and information to make your life easier
            </PAlt7>
          </SquarePaper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default BannerView;
