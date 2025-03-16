import React from "react";
import { Route } from "react-router-dom";
import { Col, Row } from 'antd';
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Row>
      <Col span={6}>
        <Navbar/>
      </Col>
      <Col span={18}>
        col-6 col-pull-18
      </Col>
    </Row>
  );
}

export default App;
