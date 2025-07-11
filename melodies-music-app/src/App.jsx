import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Layout, Menu, Switch } from 'antd';
import {
  HomeOutlined,
  SearchOutlined,
  GlobalOutlined,
  UserOutlined,
  PlayCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import DiscoverPage from './pages/Discover/index.jsx';
import ArtistPage from './pages/Artist/index.jsx';
import MusicPage from './pages/Music/index.jsx';

const { Header, Content, Footer, Sider } = Layout;

// Navigation menu items configuration
const menuItems = [
  { key: 'home', icon: <HomeOutlined />, label: 'Trang chủ', path: '/' },
  { key: 'discover', icon: <GlobalOutlined />, label: 'Khám phá', path: '/discover' },
  { key: 'search', icon: <SearchOutlined />, label: 'Tìm kiếm', path: '/search' },
  { key: 'artist', icon: <UserOutlined />, label: 'Nghệ sĩ', path: '/artists' },
  { key: 'music', icon: <PlayCircleOutlined />, label: 'Đang phát', path: '/music/1' },
];

// Sidebar Logo Component
const SidebarLogo = ({ collapsed }) => (
  <div className="logo p-4 flex items-center justify-center">
    <img
      src="https://placehold.co/40x40/1DB954/FFFFFF?text=M"
      alt="Melodies Logo"
      className="rounded-full"
    />
    {!collapsed && <h1 className="text-white text-xl font-bold ml-2">Melodies</h1>}
  </div>
);

// Dark Mode Toggle Component
const DarkModeToggle = ({ darkMode, onToggle }) => (
  <Menu.Item key="dark-mode" icon={<SettingOutlined />}>
    <div className="flex items-center justify-between">
      <span>Chế độ tối</span>
      <Switch checked={darkMode} onChange={onToggle} size="small" />
    </div>
  </Menu.Item>
);

// Navigation Menu Component
const NavigationMenu = ({ darkMode, onToggleDarkMode }) => (
  <Menu
    theme="dark"
    mode="inline"
    defaultSelectedKeys={['discover']}
    className="bg-gray-900 dark:bg-gray-950"
  >
    {menuItems.map((item) => (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link to={item.path}>{item.label}</Link>
      </Menu.Item>
    ))}
    <DarkModeToggle darkMode={darkMode} onToggle={onToggleDarkMode} />
  </Menu>
);

// Header Component
const AppHeader = () => (
  <Header className="site-layout-background bg-gray-800 dark:bg-gray-900 p-0 px-4 flex items-center justify-end">
    <span className="text-white mr-4">Chào mừng, Người dùng!</span>
  </Header>
);

// Footer Component
const AppFooter = () => (
  <Footer
    style={{ textAlign: 'center' }}
    className="bg-gray-800 dark:bg-gray-900 text-gray-400"
  >
    Melodies ©{new Date().getFullYear()} Created by Your Team
  </Footer>
);

// 404 Page Component
const NotFoundPage = () => (
  <h2 className="text-center text-2xl text-gray-700 dark:text-gray-300">
    Trang này chưa được xây dựng hoặc không tồn tại.
  </h2>
);

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="bg-gray-900 dark:bg-gray-950"
      >
        <SidebarLogo collapsed={collapsed} />
        <NavigationMenu darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      </Sider>
      
      <Layout className="site-layout">
        <AppHeader />
        
        <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
          <div className="site-layout-background p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 min-h-[calc(100vh-160px)]">
            <Routes>
              <Route path="/" element={<Navigate to="/discover" replace />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/artists" element={<ArtistPage />} />
              <Route path="/music/:id" element={<MusicPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Content>
        
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default App;
