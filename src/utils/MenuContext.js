import Start from "../pages/Start";
import FormSizeDemo from "../pages/IncludeVehicle";
import ClientAdd from "../pages/ClientData";
import AddUser from "../pages/UserInsertForm";
import PersonList from "../pages/PersonList";
import Configurations from "../pages/Configurations";
import Cashiers from "../pages/Cashier";
import Report from "../pages/Reports.js";
import ReportDailyBilling from "../pages/reports/OccupationChart"
import BoxForms from "../pages/BoxForm";
import BoxButtons from "../pages/BoxScreen";

import React from "react";
import { Layout } from "antd";

const { Content, Footer } = Layout;

export const StartScreen = () => {
  return (
    <Layout className="site-layout">
      <Content style={{ margin: "0 16px" }}>
        <div className="int-container">
          <div
            className="site-layout-background mt-4 "
            style={{
              padding: 24,
              borderRadius: 10,
              maxHeight: 510,
              overflow: "scroll",
            }}
          >
            <Start />
          </div>
          <div
            className="site-layout-background mt-3"
            style={{
              display: "grid",
              padding: 1,
              minHeight: 250,
              maxWidth: 950,
              borderRadius: 10,
            }}
          >
            <FormSizeDemo />
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Sistema de Gerenciamento de Estacionamentos 2021
      </Footer>
    </Layout>
  );
};

export const ClientData = () => {
  return (
    <Layout className="site-layout">
      <Content
        style={{
          margin: "0 16px",
          maxWidth: 1950,
        }}
      >
        <ClientAdd />
      </Content>
    </Layout>
  );
};

export const PersonLists = () => {
  return (
    <Layout className="site-layout">
      <Content
        style={{
          margin: "0 16px",
          maxWidth: 1950,
        }}
      >
        <PersonList />
      </Content>
    </Layout>
  );
};

export const PersonForm = () => {
  return (
    <Layout className="site-layout">
      <Content
        style={{
          margin: "0 16px",
          maxWidth: 1950,
        }}
      >
        <ClientAdd />
      </Content>
    </Layout>
  );
};

export const Configuration = () => {
  return (
    <Layout className="site-layout">
      <Content
        style={{
          margin: "0 16px",
          maxWidth: 1950,
        }}
      >
        <Configurations />
      </Content>
    </Layout>
  );
};

export const UserAdd = () => {
  return (
    <Layout className="site-layout">
      <Content
        style={{
          margin: "0 16px",
          maxWidth: 1950,
        }}
      >
        <AddUser />
      </Content>
    </Layout>
  );
};

export const Cashier = () => {
  return (
    <Layout className="site-layout">
      <Content
        style={{
          margin: "0 16px",
          maxWidth: 1950,
        }}
      >
        <Cashiers />
      </Content>
    </Layout>
  );
};

export const Reports = () => {
  return (
    <Layout className="site-layout">
      <Content
        style={{
          margin: "0 16px",
          maxWidth: 1950,
        }}
      >
        <Report />
      </Content>
    </Layout>
  );
};

export const ReportsDailyBilling = () => {
  return (
    <Layout className="site-layout">
      <Content
        style={{
          margin: "0 16px",
          maxWidth: 1950,
        }}
      >
        <ReportDailyBilling />
      </Content>
    </Layout>
  );
};

export const BoxForm = () => {
  return (
    <Layout className="site-layout">
      <Content
        style={{
          margin: "0 16px",
          maxWidth: 1950,
        }}
      >
        <BoxForms />
      </Content>
    </Layout>
  );
};

export const BoxScreen = () => {
  return (
    <Layout className="site-layout">
      <Content
        style={{
          margin: "0 16px",
          maxWidth: 1950,
        }}
      >
        <BoxButtons />
      </Content>
    </Layout>
  );
};
