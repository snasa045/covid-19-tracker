import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';

import './Cards.module.scss';

const Cards = ( {data : { Confirmed, Deaths, Recovered, DateUpdate }}) => {
    if(!Confirmed) {
        return 'Loading...';
    }

    console.log(Confirmed);
    return (
        <div className="container">
            <Grid container className="" justify="center" spacing={3}>
                <Grid item className="totalCases" component={Card} elevation={3} xs={12} md={3}>
                    <CardContent>
                        <Typography className="" color="textSecondary" gutterBottom>
                            Total Cases
                        </Typography>
                        <Typography variant="h4" component="h2">
                            <CountUp start={0} end={+Confirmed} duration={2.75} separator=","/>
                        </Typography>
                        <Typography className="" color="textSecondary" gutterBottom>
                            {new Date(DateUpdate).toDateString()}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item className="deaths" component={Card} elevation={3} xs={12} md={3}>
                    <CardContent>
                        <Typography className="" color="textSecondary" gutterBottom>
                           Deaths
                        </Typography>
                        <Typography variant="h4" component="h2">
                            <CountUp start={0} end={+Deaths} duration={2.75} separator=","/>
                        </Typography>
                        <Typography className="" color="textSecondary" gutterBottom>
                            {new Date(DateUpdate).toDateString()}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item className="recovered" component={Card} elevation={3} xs={12} md={3}>
                    <CardContent>
                        <Typography className="" color="textSecondary" gutterBottom>
                            Recovered
                        </Typography>
                        <Typography variant="h4" component="h2">
                            <CountUp start={0} end={+Recovered} duration={2.75} separator=","/>
                        </Typography>
                        <Typography className="" color="textSecondary" gutterBottom>
                            {new Date(DateUpdate).toDateString()}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cards;
