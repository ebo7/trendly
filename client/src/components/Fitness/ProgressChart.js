import Chart from "chart.js";

import React, { Component } from "react";

function getConfig(textInp) {
  let configProgress = {
    type: "doughnut",
    data: {
      labels: ["completed"],
      datasets: [],
    },
    plugins: [
      {
        afterDraw: function (chart) {
          var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
          ctx.restore();
          var fontSize = (height / 150).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.fillStyle = "#9b9b9b";
          ctx.textBaseline = "middle";
          var text = textInp,
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2 - 17;
          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      },
    ],
    options: {
      legend: {
        display: true,
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
    this.arr = [totalCaloriesSum, totalDistanceSum, totalStepsSum];
    // goals preset currently
    this.goals = [2000, 5000, 5000];
    let percent = Math.min(
      100,
      (this.arr[this.props.logIdx] / this.goals[this.props.logIdx]) * 100
    );

    let config = getConfig(`${percent}%`);
    let statNames = ["Calories", "Steps", "Distance"];
    config.data.labels = [statNames[this.props.logIdx]];

    config.data.datasets = [
      {
        data: [Math.min(100, percent), Math.max(0, 100 - percent)],
        backgroundColor: ["#5283ff"],
      },
    ];

    this.ctx = this.chartRef.current.getContext("2d");

    this.chart = new Chart(this.ctx, config);
  }
  updateState = ({ logIdx }) => {
    let percent = Math.min(100, (this.arr[logIdx] / this.goals[logIdx]) * 100);

    console.log(percent);
    console.log(this.arr);
    this.chart.config = getConfig(`${percent}%`);
    let statNames = ["Calories", "Steps", "Distance"];
    this.chart.config.data.labels = [statNames[logIdx]];

    this.chart.config.data.datasets = [
      {
        data: [percent, 100 - percent],
        backgroundColor: ["#5283ff"],
      },
    ];
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
