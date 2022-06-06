import React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { SettingFilled } from '@ant-design/icons';

/**
 * 
 * @param {object} param
 * @param {() => void} param.logout
 */
export default function Setting({ logout }) {
  const items = [
    { label: '로그아웃', key: 'logout' }
  ];
  function onMenuClick(event) {
    const { key } = event;
    if(key === 'logout') {
      logout();
    }
  }
  return (
    <Dropdown 
      overlay={
        <Menu items={items} onClick={onMenuClick} />
      } 
      trigger={['click']}
      placement="bottomRight"
    >
      <Button shape="circle" icon={<SettingFilled />} />
    </Dropdown>
  );
}
