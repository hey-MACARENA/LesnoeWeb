import React from "react";
import { Route } from "react-router-dom";
import { Col, Row } from 'antd';
import Navbar from "./components/Navbar/Navbar";
import Employees from "./components/Employees/Employees";

function App() {
  return (
    <Row>
      <Col span={6}>
        <Navbar/>
      </Col>
      <Col span={18}>
        <Employees/>
      </Col>
    </Row>
  );
}

export default App;
