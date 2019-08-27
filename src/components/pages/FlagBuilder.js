import React from 'react';
import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';

import { Page } from '../Layout';
import Flag from '../Flag';
import ArrowNav from '../ArrowNav';

export const FlagBuilder = ({ userFlag, stepId }) => (
  <Page>
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <h3>Ut sint excepteur Lorem aliqua occaecat ea nostrud et.</h3>

        <p>Irure officia esse tempor aliquip in proident est deserunt enim culpa commodo tempor do exercitation. Excepteur reprehenderit deserunt id sit Lorem laboris. Enim ad deserunt pariatur tempor mollit dolore reprehenderit occaecat aute aliqua nulla.</p>

        <p>Irure nisi veniam cillum ullamco dolore excepteur consequat sit exercitation quis sit officia pariatur. Quis nostrud laboris ad ea dolor culpa eiusmod qui elit sit cupidatat voluptate quis. Cupidatat esse magna mollit occaecat irure velit laboris sint consectetur veniam ut proident culpa.</p>
      </Grid>

      <Grid item xs={12} sm={6}>
        <div>
          <Flag
            {...userFlag}
          />
        </div>
      </Grid>
    </Grid>

    <ArrowNav stepId={stepId} />
  </Page>
);
