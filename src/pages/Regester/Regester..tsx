import React from 'react';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Select,
} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Regester: React.FC = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        let response = await axios.post("http://127.0.0.1:8000/userRegester", {
            "email": values.email,
            "displayName": values.username,
            "password": values.password,
        })
        if (response.status == 201) {
            alert("you already in my organization dumpass")
            return
        }
        navigate("/login")
        console.log(response)
    };


    return (
        <div className="vh-100 vw-100 text-white d-flex justify-content-center align-items-center">

            <div className="card d-flex align-items-center justify-content-center" style={{ minWidth: '500px', maxWidth: '600px', maxHeight: '800px' }}>
                <img src='./src/assets/images/signup-meme.jpg' alt="" className="login-img" style={{ width: '300px', height: '300px', borderRadius: '5px', margin: "20px 0 20px 0" }} />

                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                    style={{ maxWidth: 600, minWidth: 450 }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label="Display Name"
                        tooltip="what do we have to call you bitch?"
                        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>



                    <Form.Item
                        name="gender"
                        label="Gender"
                        tooltip="Gay are not allow in my web page"
                        rules={[{ required: true, message: 'Please select gender!' }]}
                    >
                        <Select placeholder="select your gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Croissant</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                        <span style={{ marginLeft: '20px' }}>go back to
                            <a href="/login"> Login Page</a>
                        </span>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Regester;