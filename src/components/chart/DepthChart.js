// import { width } from '@material-ui/system';
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DepthChart extends Component {
  render() {

    let dataPoint1 = this.props.data.asks.map(ask => ({ x: Number(ask.price), y: ask.sum_amount, z: ask.sum_total }));
    let dataPoint2 = this.props.data.bids.map(bid => ({ x: Number(bid.price), y: bid.sum_amount, z: bid.sum_total }));
    const options = {
      theme: "light2",
      animationEnabled: true,
      height: 350,
      title: {
        // text: "Comparison of Exchange Rates - 2017"
      },
      subtitles: [{
        // text: "GBP & USD to INR"
      }],
      axisY: {
        includeZero: true,
        // prefix: "Price: "
      },
      toolTip: {
        shared: true,
        contentFormatter: (e) => {
          let content = "";
          content += "Price: " + e.entries[0].dataPoint.x + "<br />";
          content += `Sum ${this.props.symbol[0]}: ` + e.entries[0].dataPoint.y + "<br />";
          content += `Sum ${this.props.symbol[1]}: ` + e.entries[0].dataPoint.z + "<br />";
          return content;
        }
      },
      data: [
        {
          type: "area",
          name: "BTC",
          lineColor: 'red',
          // showInLegend: true,
          // xValueFormatString: "MMM YYYY",
          // yValueFormatString: "₹#,##0.##",
          color: '#F9DADB',
          dataPoints: dataPoint1
        },
        {
          type: "area",
          name: "USD",
          lineColor: 'blue',
          // showInLegend: true,
          // xValueFormatString: "MMM YYYY",
          // yValueFormatString: "#,###.##",
          color: '#D7EAEA',
          dataPoints: dataPoint2
        }
      ]
    }

    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
        <CanvasJSChart options={options}
        /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default DepthChart;