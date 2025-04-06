import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ConfigProvider, theme, Col, Row } from "antd";
import Navbar from "./components/Navbar/Navbar";
import MainContainer from "./components/Main/MainContainer";

function App() {
  return (
    <div style={{ backgroundColor: "#010005" }}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Row>
          <Col span={5}>
            <Navbar />
          </Col>
          <Col span={18}>
            <MainContainer />
            <Routes>
              <Route path="/" element={<Navigate to="/employeestable" />} />
            </Routes>
          </Col>
        </Row>
      </ConfigProvider>
    </div>
  );
}

export default App;
