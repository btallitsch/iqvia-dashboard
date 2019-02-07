import React, { Component } from 'react';
import { Layout, Menu, Row, Col } from 'antd';

import driverData from './data/data.json';

import Drivers from './components/drivers';
// import SelectedTable from './components/selected_driver';
import Simulation from './components/simulation';

const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      drivers: driverData
    }

  }

  render() {
    return (
      <Layout className="layout">
        {/* <div className="title">
          Brand Performance Analyzer
        </div> */}
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Simulation</Menu.Item>
            <Menu.Item key="3">Output</Menu.Item>
            <Menu.Item key="4">Logout</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Row gutter={32}>
              <Col className="gutter-row" span={12}>
                <Drivers 
                  drivers={this.state.drivers}
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <Simulation />
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

export default App;
