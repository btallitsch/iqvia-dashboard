import React, { Component } from 'react';
import { Card, Form, Icon, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

class Forgot extends Component {
  constructor(props){
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push(process.env.PUBLIC_URL + "/")
      }
    });
  }

    componentDidMount() {
        document.body.classList.add("background-grey");
    }

    componentWillUnmount() {
        document.body.classList.remove("background-grey");
    }

  render(){
    
    const { getFieldDecorator } = this.props.form;

    return (

        <div style={{ padding: '30px' }}>
            <Card
                title="Reset Password"
                style={{ 
                    width: 400,
                    margin: '0 auto'
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Forgot your password?</h2>
                <p style={{ textAlign: 'center' }}>Enter your email address and we will send you instructions on how to reset your password.</p>
                <Form onSubmit={this.handleSubmit} className="forgot-form">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter Email Address" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Reset Password
                        </Button>
                    </Form.Item>
                </Form>
                <Link to={process.env.PUBLIC_URL + "/register"}>Register an Account</Link>
                <br />
                <Link to={process.env.PUBLIC_URL + "/"}>Login</Link>
            </Card>
        </div>
    );
  }
}

export default Form.create({ name: 'login' })(Forgot);