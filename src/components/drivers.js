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
    let first = (pagination.current * 10) - 10;
    let last = (pagination.current * 10)

    this.setState({
      chartDataSource: currentDataSource.currentDataSource.slice(first, last)
    });
  }

  render(){

    const columns = [{
      title: 'Features',
      dataIndex: 'feature',
      key: 'feature.id',
      width: '75%'
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score.id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.score - b.score,
      width: '25%'
    }];

    const chartData = {
      labels: this.state.chartDataSource.map(value => value.feature.substring(0,6)),
      datasets: [
        {
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.chartDataSource.map(value => value.score)
        }
      ]
    };

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        if(selectedRowKeys.length <= 2) {
          this.props.onSelectRow(selectedRows);
        }
        // this.props.onSelectRow(selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name
      }),
    };

    return (

      <div>
        <Table
          title={() => 'Drivers'}
          columns={columns}
          bordered
          size="small"
          onChange={this.onTableChange}
          rowSelection={rowSelection}
          dataSource={this.props.drivers}
          onRow={(record) => ({
            onClick: () => {
              this.rowSelection(record);
            },
          })}
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