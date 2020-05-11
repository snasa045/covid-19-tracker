import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import { Pie } from 'react-chartjs-2'; 
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';


import './Cards.scss';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0055DE',
        },
        secondary: {
            main: '#AF3C43',
        },
    },
  });

const Cards = ( {data : { Confirmed, Deaths, Recovered, DateUpdate }}) => {
    if(!Confirmed) {
        return 'Loading...';
    }

    const pieChart = (
        <Pie 
            data = {{
                datasets: [{
                    data: [+Confirmed, +Deaths, +Recovered],
                    backgroundColor: ['#0055DE', '#AF3C43', '#03883B'],
                }],
                labels: [
                    'Total Cases',
                    'Deaths',
                    'Recovered'
                ]
            }}
            options={{ 
                maintainAspectRatio: false,
                legend: { display: false }
            }}
            width = {400}
            height = {300}
        />
    );

    return (
        <div className="global_cards_wrapper" >

            <ThemeProvider theme={theme}> 
                <Grid container className="cards_container">
                    <Grid item className="totalCases card_wrapper" component={Card} elevation={3}>
                        <CardContent>
                            <Typography className="title" color="textSecondary" gutterBottom>
                                Total Cases
                            </Typography>
                            <Typography variant="h4" component="h2" color="primary">
                                <CountUp start={0} end={+Confirmed} duration={2.75} separator=","/>
                            </Typography>
                            <Typography className="date" color="textSecondary" gutterBottom>
                                {new Date(DateUpdate).toDateString()}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item className="deaths card_wrapper" component={Card} elevation={3}>
                        <CardContent>
                            <Typography className="title" color="textSecondary" gutterBottom>
                            Deaths
                            </Typography>
                            <Typography variant="h4" component="h2" color="secondary">
                                <CountUp start={0} end={+Deaths} duration={2.75} separator=","/>
                            </Typography>
                            <Typography className="date" color="textSecondary" gutterBottom>
                                {new Date(DateUpdate).toDateString()}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item className="recovered card_wrapper" component={Card} elevation={3}>
                        <CardContent>
                            <Typography className="title" color="textSecondary" gutterBottom>
                                Recovered
                            </Typography>
                            <Typography variant="h4" component="h2">
                                <CountUp start={0} end={+Recovered} duration={2.75} separator=","/>
                            </Typography>
                            <Typography className="date" color="textSecondary" gutterBottom>
                                {new Date(DateUpdate).toDateString()}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>

                <div className="pie_chart_div">
                    {pieChart}
                </div>
            </ThemeProvider>

           
        </div>
    );
}

export default Cards;
