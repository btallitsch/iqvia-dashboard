import React, { Component } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom'

import driverData from '../data/data.json';

import Drivers from './drivers';
import Simulation from './simulation';

const { Header, Content, Footer } = Layout;

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      drivers: driverData,
      rowData: []
    }

  }

  rowSelection = (rowValue) => {
    this.setState({
      rowData: rowValue
    });
  }

  render() {
    return (
      <Layout className="layout">
        <div className="title">
          Brand Performance Analyzer
          <div className="logo" />
        </div>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Simulation</Menu.Item>
            <Menu.Item key="3">Output</Menu.Item>
            {/* <Menu.Item key="4">Logout</Menu.Item> */}
            <Menu.Item key="4">
              <Link to="/">Logout</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '25px 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Row gutter={32}>
              <Col className="gutter-row" span={12}>
                <Drivers 
                  drivers={this.state.drivers}
                  onSelectRow={this.rowSelection}
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <Simulation
                  onSelectRow={this.state.rowData}
                 />
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2019 by IQVIA
        </Footer>
      </Layout>
    );
  }
}

export default Main;
