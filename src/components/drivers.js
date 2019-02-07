import React, { Component } from 'react';
import { Table, Card } from 'antd';
import { Bar } from 'react-chartjs-2';

class Drivers extends Component {
  constructor(props){
    super(props);

    this.state = { 
      drivers: [],
      chartDataSource: this.props.drivers.slice(0, 10),
      currentPage: 1
   };

   this.onTableChange = this.onTableChange.bind(this);
  }

  onTableChange(pagination, filters, sorter, currentDataSource) {
    // console.log(typeof currentDataSource.currentDataSource, currentDataSource.currentDataSource);
    // console.table(currentDataSource.currentDataSource.slice(0, 10));
    console.log(pagination.current);
    // console.log(this.state.currentPage);
    let first = (pagination.current * 10) - 10;
    let last = (pagination.current * 10)

    this.setState({
      // chartDataSource: currentDataSource.currentDataSource.slice(11, 21)
      chartDataSource: currentDataSource.currentDataSource.slice(first, last)
    });
  }

  render(){

    // console.log(this.props.drivers);

    const columns = [{
      title: 'Features',
      dataIndex: 'feature',
      key: 'feature.id',
      width: 250,
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score.id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.score - b.score,
      width: 100
    }];

    const chartData = {
      labels: this.state.chartDataSource.map(value => value.feature.substring(0,6)),
      datasets: [
        {
          // label: this.state.chartDataSource.map(value => value.feature),
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.chartDataSource.map(value => value.score)
        }
      ]
    };

    // console.log(chartData);
    // console.log(this.state.chartDataSource);
    console.log(this.state.chartDataSource.map(value => value.feature));
    // console.log(this.state.chartDataSource.map(value => value.score));

    return (

      <div>
        <Table
          title={() => 'Drivers'}
          columns={columns}
          bordered
          size="small"
          onChange={this.onTableChange}
          dataSource={this.props.drivers}
        />
        <Card
          size="small"
          title="Features Importance"
        >
          <Bar
            data={chartData}
            legend={{ display: false }}
          />
        </Card>
      </div>
    );
  }
}

export default Drivers;