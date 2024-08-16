import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        let response = await axios.post("http://127.0.0.1:8000/loginAuth", {
            "email": values.email,
            "password": values.password,
        })
        if (response.status == 200) {
            await login(response.data)
            navigate("/")
        } else {
            alert("Invalid username or password");
        }
        console.log(response)
    };

    return (
        <div className="vh-100 vw-100 text-white d-flex justify-content-center align-items-center">

            <div className="card d-flex align-items-center justify-content-center" style={{ minWidth: '450px', maxWidth: '500px', maxHeight: '600px' }}>
                {/* <h4 className="">Who TF Are You ?</h4> */}
                {/* <img src="src/assets/images/logo-main.png" alt="" /> */}
                <img src='./src/assets/images/login-meme.jpg' alt="" className="login-img" style={{ width: '300px', height: '300px', borderRadius: '5px', margin: "20px 0 20px 0" }} />
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: '400px', width: '400px' }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me (It's not working now)</Checkbox>
                            </Form.Item>
                            <a href="">Forgot password (this too)</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                        or <a href="/regester">Register now!</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;