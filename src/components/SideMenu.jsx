import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import avatar from '../assets/avatar.jpg';

const SideMenu = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const { fullName } = useSelector((state) => state);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  return (
    <Menu vertical inverted pointing style={styles.container}>
      <div style={styles.avatar}>
        <h4
          data-cy='greeting'
          style={{ fontSize: 18, color: '#333', textAlign: 'center', textTransform: 'uppercase' }}>
          welcome back <br />
          {fullName}
        </h4>
      </div>

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
        data-cy='create-article-btn'
        active={activeItem === 'backyard'}
        onClick={handleItemClick}
        as={Link}
        to='/create'>
        Write new article
        <Icon name='plus'></Icon>
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
    position: 'fixed',
    zIndex: 100,
    height: '100%',
    top: 0,
    display: 'flex',
    paddingTop: 95,
    width: 250,
  },
  avatar: {
    backgroundImage: `url(${avatar})`,
    display: 'flex',
    height: 200,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
