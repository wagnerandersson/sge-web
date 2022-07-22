import React, { useState} from "react";
import { Form, Input, Button, Checkbox } from "antd";
import logo from "../assets/iconSmall.png";
import { Redirect, Route, useHistory } from "react-router-dom";
import Menu from "./Menu";

import Api from "../api/api";
import "./login.css";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const history = useHistory()

  const token = localStorage.getItem("id");
  
  if (token) {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('id')
    localStorage.removeItem('role')
  }
  
  
  async function handleLogin(e) {
      e.preventDefault()
      try {
          const res = await Api.post('employee/login', { email, password })

          console.log("RESPONSE ",res)

          localStorage.setItem('name', res.data.employee.name)
          localStorage.setItem('id', res.data.employee.id)
          localStorage.setItem('role', res.data.employee.role)
          localStorage.setItem('token', res.data.token)

          if (res.data.employee.role === 'emp') {
              history.push('/menu')
          } else if (res.data.employee.role === 'admin') {
              history.push('/menu')
          } else {
              alert('Usuário ou senha incorreto')
          }
      } catch (err) {
          alert('Usuário ou senha incorreto')
      }
  }


  // const onFinish = (values) => {
  //   console.log("Success:", values);
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  // const history = useHistory();
  // const onLogin = () => {
  //   history.push("/menu");
  // };

  return (
    <div className="container1">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="form">
        <Form
          {...layout}
          name="basic"
          onSubmitCapture={handleLogin}
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your username!",
            //   },
            // ]}
          >
            <input
              type="text"
              className="input-form rounded border"
              placeholder="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your password!",
            //   },
            // ]}
          >
            <input
              type="password"
              className="input-form rounded border"
              placeholder="Senha"
            />
          </Form.Item>
        <div className="div-button">
          <button className="button-form rounded" htmlType="submit">
            Entrar
          </button>
        </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
{/* <Button type="primary" htmlType="submit">Login</Button> */}