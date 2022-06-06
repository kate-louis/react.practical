import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import AuthLayout from '../component/AuthLayout';

export default function Signup() {
  return (
    <AuthLayout onFinish={() => {}}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please input your email' }]}
      >
        <Input 
          autoFocus
          addonAfter={EMAIL_SUFFIX}
          placeholder="" 
        />
      </Form.Item>
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          style={{ width: '100%' }}
        >
          인증 메일 받기
        </Button>
        Or <Link to="/login">login</Link>
      </Form.Item>
    </AuthLayout>     
  );
}

const EMAIL_SUFFIX = '@company.com';
  