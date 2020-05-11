import React from 'react';
import { Line, Bar } from 'react-chartjs-2'; 

import './Graph.scss';


const Graph = ({history, name}) => {

    console.log(history);
    if (!history) {
        return "Loading...";
    }

    // Function to get the difference between current day and prev day total cases
    const diffMaker = (array) => {
        const newArray = [];

        for (let index = 1; index < array.length; index++) {
            newArray.push(array[index] - array[index - 1]);
        }

        return newArray;
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
    

    let dailyNewCases = diffMaker(history.map(day => day.Confirmed));
    let dailyNewDeaths = diffMaker(history.map(day => day.Deaths));
    let dailyNewRecovered = diffMaker(history.map(day => day.Recovered));

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
                    }}
                />
            </div>

            <div className="daily_new_recovered_chart chart">
                <h2>Daily New Recovered in {name}</h2>
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
                        title: { display: true, text: `Daily New Recovered People` },
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
