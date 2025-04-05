import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
    {
      key: '/employeestable',
      icon: <PieChartOutlined />,
      label: 'Сотрудники',
    },
    {
      key: '/leavestable',
      icon: <DesktopOutlined />,
      label: 'Отпуска',
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
        defaultSelectedKeys={['/employeestable']}
        mode="inline"
        onClick={handleMenuClick}
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
}

export default Navbar;