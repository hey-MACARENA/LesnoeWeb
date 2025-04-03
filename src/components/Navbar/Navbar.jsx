import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
    {
      key: '/employees',
      icon: <PieChartOutlined />,
      label: 'Сотрудники',
    },
    {
      key: '/sections',
      icon: <DesktopOutlined />,
      label: 'Кварталы',
    },
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <MailOutlined />,
      children: [
        {
          key: '5',
          label: 'Option 5',
        },
        {
          key: '6',
          label: 'Option 6',
        },
      ],
    },
  ];

function Navbar() {
  const [collapsed] = useState(false);

  const navigate = useNavigate();
  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <div
    style={{
      marginRight: 30,
    }}
    >
      <Menu
        defaultSelectedKeys={['/employees']}
        mode="inline"
        onClick={handleMenuClick}
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
}

export default Navbar;