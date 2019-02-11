import React, { Component } from 'react';
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor(props){
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push('/main')
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

        <div style={{ background: '#ECECEC', height: '100%', padding: '30px' }}>
            <Card
            title="Login"
            // extra={<a href="#">More</a>}
            style={{ 
                width: 300,
                margin: '0 auto'
            }}
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email address" />
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Link className="login-form-forgot" to="/forgot">Forgot password?</Link>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to="/register">register now!</Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
  }
}

export default Form.create({ name: 'login' })(Login);