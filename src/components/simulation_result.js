import React, { Component } from 'react';
import { Table } from 'antd';
import { Bar } from 'react-chartjs-2';

class SimulationResult extends Component {
  constructor(props){
    super(props);

    this.state = { 
      newValue: []
   };
  }

  render(){

    const columns = [
      {
        title: 'Result',
        dataIndex: 'result'
      }, 
      {
        title: 'Original',
        dataIndex: 'original'
      }, 
      {
        title: 'New',
        dataIndex: 'new'
      }];
      
      const data = [
      {
        key: '1',
        result: 'Total Patient Count',
        original: 6420,
        new: 12683,
      }];

      const chartData = {
        labels: ['Original', 'New'],
        datasets: [
          {
            // label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [6420, 12683]
          }
        ]
      };

      const chartOptions = {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 0
          }
        }
      };
      

    return (
      <div>
          <Table
              title={() => 'Simulation Result'}
              className="results-table"
              columns={columns}
              bordered
              size="small"
              pagination={false}
              dataSource={data}
          />
          <Bar
            options={chartOptions}
            data={chartData}
            legend={{ display: false }}
          />
      </div>
    );
  }
}

export default SimulationResult;