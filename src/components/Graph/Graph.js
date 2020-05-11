import React from 'react';
import { Line, Bar } from 'react-chartjs-2'; 

import './Graph.scss';


const Graph = ({history: [history, dailyNewCases, dailyNewDeaths, dailyNewRecovered], name}) => {

    // console.log(history,dailyNewCases, dailyNewDeaths, dailyNewRecovered);
    if (!history) {
        return "Loading...";
    }

    const lineChartForWorld = (
        <div className="line_chart">
            <Line
                data={{
                labels: history.map(day => day.Date),
                datasets: [
                {
                    data: history.map(day => day.Confirmed),
                    label: 'Total Cases',
                    borderColor: '#0055DE',
                    backgroundColor: 'rgba(0, 85, 222, 0.2)',
                    fill: true,
                }, {
                    data: history.map(day => day.Deaths),
                    label: 'Deaths',
                    borderColor: '#AF3C43',
                    backgroundColor: 'rgba(175, 60, 67, 0.5)',
                    fill: true,
                }, {
                    data: history.map(day => day.Recovered),
                    label: 'Recovered',
                    borderColor: 'green',
                    backgroundColor: 'rgba(3, 136, 59, 0.5)',
                    fill: true,
                    }],
                }}
                options = {{
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display:false
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Days'
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display:true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Number of People'
                            }
                        }]
                    }
                }}
            /> 
        </div>
    );

    const barChartDailyNewCases = (
        <React.Fragment>
            <div className="daily_new_cases_chart chart">
                <h2>Daily New Cases in {name}</h2>
                <Bar
                    data={{
                    labels: history.slice(1).map(day => day.Date),
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: '#0055DE',
                            data: dailyNewCases.map(newCases => newCases),
                        },
                    ],
                    }}
                    options={{
                        // legend: { display: false },
                        title: { display: true, text: `Daily New Cases` },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display:false
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Days'
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    display:true
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Number of People'
                                }
                            }]
                        }
                    }}
                />
            </div>

            <div className="daily_new_deaths_chart chart">
                <h2>Daily New Deaths in {name}</h2>
                <Bar
                    data={{
                    labels: history.slice(1).map(day => day.Date),
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: '#AF3C43',
                            data: dailyNewDeaths.map(newCases => newCases),
                        },
                    ],
                    }}
                    options={{
                        // legend: { display: false },
                        title: { display: true, text: `Daily New Deaths` },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display:false
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Days'
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    display:true
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Number of People'
                                }
                            }]
                        }
                    }}
                />
            </div>

            <div className="daily_new_recovered_chart chart">
                <h2>Daily New Recoveries in {name}</h2>
                <Bar
                    data={{
                    labels: history.slice(1).map(day => day.Date),
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: '#03883B',
                            data: dailyNewRecovered.map(newCases => newCases),
                        },
                    ],
                    }}
                    options={{
                        // legend: { display: false },
                        title: { display: true, text: `Daily New Recoveries` },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display:false
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Days'
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    display:true
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Number of People'
                                }
                            }]
                        }
                    }}
                />
            </div>
        </React.Fragment>
    );

    return (
        <div className="global_graph">
            {lineChartForWorld}
            { name === "World" ? null : barChartDailyNewCases }
        </div>
    );
}

export default Graph;
