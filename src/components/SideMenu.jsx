import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const SideMenu = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const { fullName } = useSelector((state) => state);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  return (
    <Menu vertical inverted pointing style={styles.container}>
      <h4
        data-cy='greeting'
        style={{
          color: 'white',
          fontSize: 14,
          textAlign: 'center',
          marginBottom: 20,
        }}>
        {`WELCOME BACK ${fullName.toUpperCase()}`}
      </h4>
      <Menu.Item
        name='dashboard'
        active={activeItem === 'dashboard'}
        onClick={handleItemClick}
        as={Link}
        to='/dashboard'>
        Dashboard
      </Menu.Item>

      <Menu.Item
        name='backyard'
        active={activeItem === 'backyard'}
        onClick={handleItemClick}>
        Backyard Articles
      </Menu.Item>

      <Menu.Item
        name='admin'
        active={activeItem === 'admin'}
        style={{ marginBottom: 50 }}
        onClick={handleItemClick}>
        Admin
      </Menu.Item>
    </Menu>
  );
};

export default SideMenu;

const styles = {
  container: {
    position: 'absolute',
    zIndex: 100,
    height: '100vh',
    top: 0,
    display: 'flex',
    paddingTop: 75,
  },
};
