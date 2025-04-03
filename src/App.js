import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ConfigProvider, theme, Col, Row } from "antd";
import Navbar from "./components/Navbar/Navbar";
import Employees from "./components/Employees/Employees";
import Sections from "./components/Sections/Sections";

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
            <Routes>
              <Route path="/employees" element={<Employees />} />
              <Route path="/sections" element={<Sections />} />
              <Route path="/" element={<Navigate to="/employees" />} />
            </Routes>
          </Col>
        </Row>
      </ConfigProvider>
    </div>
  );
}

export default App;
