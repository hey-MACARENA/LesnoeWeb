import React from "react";
import { Route } from "react-router-dom";
import { ConfigProvider, theme, Col, Row } from 'antd';
import Navbar from "./components/Navbar/Navbar";
import Employees from "./components/Employees/Employees";

function App() {
  return (
    <div style={{backgroundColor: "#010005"}}>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm, // Установка темной темы
      }}
    >
      <Row>
        <Col span={5}>
          <Navbar/>
        </Col>
        <Col span={18}>
          <Employees/>
        </Col>
      </Row>
    </ConfigProvider>
    </div>
  );
}

export default App;
