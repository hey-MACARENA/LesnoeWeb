import { Col, Row, Typography } from "antd";
import React from "react";

const { Title } = Typography;

function MainHeader(props) {
  return (
    <div>
      <Row>
        <Col span={2}>
          <Title level={4}>Всего: {props.totalRows}</Title>
        </Col>
      </Row>
    </div>
  );
}

export default MainHeader;
