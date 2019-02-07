import React, { Component } from 'react';
import { Table, Button } from 'antd';

class SelectedTable extends Component {
  constructor(props){
    super(props);

    this.state = { 
      conditions: []
   };
  }

  render(){

    const columns = [
      {
        title: 'Features',
        dataIndex: 'features'
      }, 
      {
        title: 'Current Value',
        dataIndex: 'current'
      }, 
      {
        title: 'Next Value',
        dataIndex: 'next'
      }];
      
      const data = [
      {
        key: '1',
        features: 'Copay Card',
        current: 'Y',
        next: 'N',
      },
      {
        key: '2',
        features: 'Product Average Copay',
        current: 35.8,
        next: 23.6,
      }];
      

    return (
        <div>
            <Table
                title={() => 'Selected Driver to Change'}
                columns={columns}
                bordered
                size="small"
                pagination={false}
                dataSource={data}
            />
            <Button
                type="primary"
                className='simulation-button'
                size="large">
                Run Simulation
            </Button>
        </div>
    );
  }
}

export default SelectedTable;