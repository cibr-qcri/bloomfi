/* eslint-disable sort-imports */
/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import React from 'react';
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Chart as ChartJS } from 'chart.js/auto';
import THEME from '../../../constants/theme';

import useStyles from './Chart-styles';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    scales: {
      xAxis: {
        min: 0,
        max: 100,
      },
    },
  },
};

const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 3, 12];

export const data = {
  labels,
  datasets: [
    {
      label: 'Data..',
      data: labels.map(() => faker.datatype.number({ min: -80, max: 80 })),
      backgroundColor: THEME.palettes.dark.primary.main,
      borderWidth: 15,
      borderRadius: 20,
      borderSkipped: false,
    },
  ],
};

export const Graph = () => {
  const styles = useStyles();

  return (
    <Card css={styles.Card}>
      <CardHeader
        action={
          <Button endIcon={<ArrowDropDownIcon css={styles.ArrowRightIcon} />} css={styles.Button}>
            Last 7 days
          </Button>
        }
        title="Daily Returns"
      />
      <Divider />
      <CardContent>
        <Bar data={data} options={options} />
      </CardContent>
      <Divider />
      <Grid css={styles.OverviewGrid}>
        <Button endIcon={<ArrowRightIcon css={styles.ArrowRightIcon} />} css={styles.Button}>
          Overview
        </Button>
      </Grid>
    </Card>
  );
};

export default Graph;
