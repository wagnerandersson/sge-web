import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  DollarCircleOutlined,
  BarChartOutlined,
  CarOutlined,
  UserAddOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useState } from "react";
// import logo from "../assets/iconSmall.png";
import "./Menu.css";
import { Link } from "react-router-dom"

import { useMenu } from "../context/MenuContext";

import {
  StartScreen,
  ClientData,
  PersonLists,
  PersonForm,
  Configuration,
  UserAdd,
  Cashier,
  Reports,
  ReportsDailyBilling,
  BoxForm,
  BoxScreen,
} from "../utils/MenuContext";

const { Sider } = Layout;

const SideMenu = ({ navigation }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { state, setState } = useMenu();

  const renderPG = (state) => {
    let type = {
      start: StartScreen(),
      clientAdd: ClientData(),
      insertClient: PersonLists(),
      clientForm: PersonForm(),
      config: Configuration(),
      funcAdd: PersonLists(),
      funcAddForm: UserAdd(),
      cashier: Cashier(),
      reports: Reports(),
      dailyBilling: ReportsDailyBilling(),
      boxForm: BoxForm(),
      boxScreen: BoxScreen()
    };
    return type[state] || StartScreen();
  };

  // const extiFunction = (state) => {
  //   if (state === "exit") {
  //     <Login />
  //   }
  // }

  useEffect(() => {
    renderPG();
  }, []);

  return (
    <div className="container-fluid col-md-12">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          {/* <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="welcome">
          <h4 className="title">
            Bem Vindo <br></br>Username
          </h4>
        </div> */}
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item
              key="1"
              onClick={() => {
                setState("start");
              }}
              icon={<DesktopOutlined />}
            >
              T. Inicial
            </Menu.Item>

            <Menu.Item
              key="2"
              icon={<DollarCircleOutlined />}
              onClick={() => {
                setState("cashier");
              }}
            >
              Caixa
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<UserAddOutlined />}
              onClick={() => {
                setState("insertClient");
              }}
            >
              Cad. Clientes
            </Menu.Item>
            <Menu.Item
              key="8"
              icon={<CarOutlined />}
              onClick={() => {
                setState("boxScreen");
              }}
            >
              Vagas
            </Menu.Item>
            <Menu.Item
              key="9"
              icon={<BarChartOutlined />}
              onClick={() => setState("reports")}
            >
              Relatórios
            </Menu.Item>
            <Menu.Item
              key="10"
              icon={<SettingOutlined />}
              onClick={() => {
                setState("config");
              }}
            >
              Configurações
            </Menu.Item>
            <Menu.Item key="11" icon={<LogoutOutlined />}>
              <Link to="/">Sair</Link>
              
            </Menu.Item>
          </Menu>
        </Sider>
        {renderPG(state)}
      </Layout>
    </div>
  );
};

export default SideMenu;
