import Chart from "chart.js";

import React, { Component } from "react";

function getConfig() {
  let configProgress = {
    type: "doughnut",
    data: {
      labels: ["completed"],
      datasets: [],
    },

    options: {
      legend: {
        // display: false,
        position: "bottom",
      },
      responsive: true,
      maintainAspectRatio: true,
      cutoutPercentage: 85,
    },
  };
  return configProgress;
}

export default class ChartClass extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    if (!this.props.stats) {
      return;
    }
    let totalCalories = new Array(this.props.stats.length).fill(0);
    let totalSteps = new Array(this.props.stats.length).fill(0);
    let totalDistance = new Array(this.props.stats.length).fill(0);
    let bla = 0;
    let labels = this.props.stats.map((stat) => stat.statName);
    console.log(labels);
    this.props.stats.map((stat, i) => {
      console.log(stat);
      // calories - last 30
      // check empty
      if (stat.logList[0].data.slice(-30).length === 0) {
        totalCalories[i] = 0;
      } else {
        stat.logList[0].data.slice(-30).map((entry) => {
          console.log(entry);
          totalCalories[i] += entry.value;
        });
      }

      // steps
      if (stat.logList[1].data.slice(-30).length === 0) {
        totalSteps[i] = 0;
      } else {
        stat.logList[1].data.slice(-30).map((entry) => {
          console.log(entry);
          totalSteps[i] += entry.value;
        });
      }
      // distance
      if (stat.logList[2].data.slice(-30).length === 0) {
        totalDistance[i] = 0;
      } else {
        stat.logList[2].data.slice(-30).map((entry) => {
          console.log(entry);
          totalDistance[i] += entry.value;
        });
      }
    });

    let totalCaloriesSum = totalCalories.reduce((acc, el) => acc + el);
    let totalDistanceSum = totalDistance.reduce((acc, el) => acc + el);
    let totalStepsSum = totalSteps.reduce((acc, el) => acc + el);
    totalCalories = totalCalories.map((el) => (el / totalCaloriesSum) * 100);
    totalDistance = totalDistance.map((el) => (el / totalDistanceSum) * 100);
    totalSteps = totalSteps.map((el) => (el / totalStepsSum) * 100);

    console.log(totalCalories);
    this.arr = [totalCalories, totalSteps, totalDistance];
    let config = getConfig();
    config.data.labels = labels;

    config.data.datasets = [
      {
        data: totalCalories,
        backgroundColor: [
          "#46BFBD",
          "#949FB1",
          "#4D5360",
          "#5283ff",

          "#FDB45C",
          "#F7464A",
        ],
      },
    ];

    this.ctx = this.chartRef.current.getContext("2d");

    this.chart = new Chart(this.ctx, config);
  }
  updateState = ({ logIdx }) => {
    console.log(this.arr);
    this.chart.config.data.datasets[0].data = this.arr[logIdx];
    this.chart.update();
  };
  render() {
    return (
      <canvas
        id="doughnutChart"
        ref={this.chartRef}
        width="1000px"
        height="1000px"
        // width="fit-content(100%)"
      />
    );
  }
}
