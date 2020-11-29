import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class PirChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                labels: ['Team A', 'Team B'],
                
            },
            series: [0, 0],
        }
    }

    render() {
        return (
            <div className="donut">
                <Chart options={this.props.options} series={this.props.series}  type="pie" width="380"  minHeight="217"/>
            </div>
        );
    }
}

export default PirChart;