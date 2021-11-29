import React from 'react'
import { Chart } from 'chart.js'

export default class LineChart extends React.Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }
  
    componentDidUpdate() {
      console.log(this.props.data)
      this.myChart.data = this.props.data;
      
      this.myChart.update('active');
    }
  
    componentDidMount() {
      this.myChart = new Chart(this.canvasRef.current, {
        type: 'line',
        options: this.props.options,
        data: this.props.data
      });
    }
  
    render() {
      return <canvas ref={this.props.refChart} />;
    }
  }