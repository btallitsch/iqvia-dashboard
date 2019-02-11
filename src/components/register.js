import React, { Component } from 'react';
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd'
import { Link } from 'react-router-dom'

class Register extends Component {
  constructor(props){
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push('/')
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
            title="Register an Account"
            style={{ 
                width: 500,
                margin: '0 auto'
            }}
            >
                <Form onSubmit={this.handleSubmit} className="register-form">
                    <Form.Item>
                        {getFieldDecorator('firstname', {
                            rules: [{ required: true, message: 'Please input your first name!' }],
                        })(
                            <Input placeholder="first name" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('lastname', {
                            rules: [{ required: true, message: 'Please input your last name!' }],
                        })(
                            <Input placeholder="last name" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input placeholder="email address" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('confirmpassword', {
                            rules: [{ required: true, message: 'Please confirm your Password!' }],
                        })(
                            <Input type="password" placeholder="Confirm Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <Link to="/">Login Page</Link>
                <br />
                <Link to="/forgot">Forgot Password?</Link>
            </Card>
        </div>
    );
  }
}

export default Form.create({ name: 'login' })(Register);