import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';

const items = [
    {
      key: '/employeestable',
      label: 'Сотрудники',
    },
    {
      key: '/sectionstable',
      label: 'Кварталы',
    },
    {
      key: '/leavestable',
      label: 'Отпуска',
    },
    {
      key: '/travelsheetstable',
      label: 'Путеводные листы',
    },
    {
      key: '/reportstable',
      label: 'Отчеты по работам',
    },
    {
      key: '/orderstable',
      label: 'Приказы',
    },
    {
      key: '/workststable',
      label: 'Работы',
    },
    {
      key: '/workststable',
      label: 'Детализация пожарной опасности',
    },
    {
      key: 'sub1',
      label: 'Дополнительные таблицы',
      children: [
        {
          key: '/leavetypestable',
          label: 'Типы отпусков',
        },
        {
          key: '/worktypestable',
          label: 'Типы проводимых работ',
        },
        {
          key: '/territorietypestable',
          label: 'Типы пород',
        },
        {
          key: '/teamstable',
          label: 'Бригады',
        },
        {
          key: '/positionstable',
          label: 'Должности',
        },
        {
          key: '/ordertypestable',
          label: 'Типы приказов',
        },
        {
          key: '/firehazardlevelstable',
          label: 'Уровни пожарной опасности',
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