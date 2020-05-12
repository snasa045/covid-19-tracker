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

const Cards = ( {data : { Confirmed, Deaths, Recovered, DateUpdate }, 
                history : [dailyNewDeaths, dailyNewRecovered]} ) => {

    // console.log(dailyNewDeaths, dailyNewRecovered);
    if(!Confirmed) {
        return 'Loading...';
    }

    const [newDeaths] = dailyNewDeaths.slice(-1);
    const [newRecoveries] = dailyNewRecovered.slice(-1);
    const totalActiveCases = (Confirmed - Deaths - Recovered);

    const pieChart = (
        <Pie 
            data = {{
                datasets: [{
                    data: [+totalActiveCases, +Deaths, +Recovered],
                    backgroundColor: ['#0055DE', '#AF3C43', '#03883B'],
                }],
                labels: [
                    'Active Cases',
                    'Deaths',
                    'Recovered'
                ]
            }}
            options={{ 
                maintainAspectRatio: false,
                legend: { display: true }
            }}
            width = {450}
            height = {500}
        />
    );

    // const date = new Date(DateUpdate).toLocaleDateString();
    // console.log(date);
    // console.log(DateUpdate);
    return (
        <div className="global_cards_wrapper" >

            <ThemeProvider theme={theme}> 
                <Grid container className="cards_container">
                    <Grid item className="totalCases card_wrapper" component={Card} elevation={3}>
                        <CardContent>
                            <Typography className="title" color="textSecondary" gutterBottom>
                                Active Cases
                            </Typography>
                            <Typography variant="h4" component="h2" color="primary">
                                <CountUp start={0} end={+totalActiveCases} duration={1.75} separator=","/>
                            </Typography>
                            <Typography className="date" color="textSecondary" gutterBottom>
                                {new Date().toDateString()}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item className="deaths card_wrapper" component={Card} elevation={3}>
                        <CardContent>
                            <Typography className="title" color="textSecondary" gutterBottom>
                            Deaths
                            </Typography>
                            <Typography variant="h4" component="h2" color="secondary">
                                <CountUp start={0} end={+Deaths} duration={1.75} separator=","/>
                            </Typography>
                            <Typography className="newDeaths" color="textSecondary" gutterBottom>
                                Today: ( +<CountUp start={0} end={+newDeaths} duration={1.75} separator=","/> )
                            </Typography>
                            <Typography className="date" color="textSecondary" gutterBottom>
                                {new Date().toDateString()}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item className="recovered card_wrapper" component={Card} elevation={3}>
                        <CardContent>
                            <Typography className="title" color="textSecondary" gutterBottom>
                                Recovered
                            </Typography>
                            <Typography variant="h4" component="h2">
                                <CountUp start={0} end={+Recovered} duration={1.75} separator=","/>
                            </Typography>
                            <Typography className="newRecoveries" color="textSecondary" gutterBottom>
                                Today: ( +<CountUp start={0} end={+newRecoveries} duration={1.75} separator=","/> )
                            </Typography>
                            <Typography className="date" color="textSecondary" gutterBottom>
                                {new Date().toDateString()}
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
