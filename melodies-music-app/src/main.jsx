import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { usePlayerStore } from './store/usePlayerStore.js';

const Root = () => {
  const currentTheme = usePlayerStore((state) => state.theme);

  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1DB954',
          colorInfo: '#1DB954',
          colorSuccess: '#28a745',
          colorWarning: '#ffc107',
          colorError: '#dc3545',
          colorBgBase: currentTheme === 'dark' ? '#121212' : '#ffffff',
          colorTextBase: currentTheme === 'dark' ? '#ffffff' : '#000000',
        },
        components: {
          Layout: {
            bodyBg: currentTheme === 'dark' ? '#121212' : '#ffffff',
            headerBg: currentTheme === 'dark' ? '#121212' : '#ffffff',
            footerBg: currentTheme === 'dark' ? '#121212' : '#ffffff',
            siderBg: currentTheme === 'dark' ? '#040404' : '#f0f2f5',
          },
          Menu: {
            darkItemBg: '#040404',
            darkSubMenuItemBg: '#040404',
            darkItemSelectedBg: '#1DB954',
            darkItemSelectedColor: '#ffffff',
            darkItemHoverBg: '#282828',
            darkItemHoverColor: '#ffffff',
          },
          Card: {
            headerBg: currentTheme === 'dark' ? '#282828' : '#f0f2f5',
            actionsBg: currentTheme === 'dark' ? '#282828' : '#f0f2f5',
            extraColor: currentTheme === 'dark' ? '#ffffff' : '#000000',
            colorBgContainer: currentTheme === 'dark' ? '#181818' : '#ffffff',
          },
          Slider: {
            handleColor: '#1DB954',
            trackBg: '#1DB954',
            trackHoverBg: '#1ED760',
            dotActiveBorderColor: '#1DB954',
            dotBorderColor: '#1DB954',
            railBg: '#535353',
            railHoverBg: '#535353',
          },
          Progress: {
            remainingColor: '#535353',
            defaultColor: '#1DB954',
          },
          Input: {
            activeBorderColor: '#1DB954',
            hoverBorderColor: '#1DB954',
            activeShadow: '0 0 0 2px rgba(29, 185, 84, 0.2)',
            colorTextPlaceholder: currentTheme === 'dark' ? '#b3b3b3' : '#8c8c8c',
            colorBgContainer: currentTheme === 'dark' ? '#282828' : '#ffffff',
            colorBorder: currentTheme === 'dark' ? '#535353' : '#d9d9d9',
            colorText: currentTheme === 'dark' ? '#ffffff' : '#000000',
          },
          Button: {
            colorPrimary: '#1DB954',
            colorPrimaryHover: '#1ED760',
            colorText: '#ffffff',
            colorBorder: '#1DB954',
            colorBgContainer: '#1DB954',
            colorBgTextHover: 'rgba(29, 185, 84, 0.1)',
            colorTextHover: '#1ED760',
            colorTextActive: '#1ED760',
          },
          Table: {
            headerBg: currentTheme === 'dark' ? '#282828' : '#f0f2f5',
            headerColor: currentTheme === 'dark' ? '#ffffff' : '#000000',
            rowHoverBg: currentTheme === 'dark' ? '#282828' : '#f0f2f5',
            colorBgContainer: currentTheme === 'dark' ? '#181818' : '#ffffff',
            colorText: currentTheme === 'dark' ? '#ffffff' : '#000000',
            borderColor: currentTheme === 'dark' ? '#535353' : '#d9d9d9',
          },
          Modal: {
            headerBg: currentTheme === 'dark' ? '#181818' : '#ffffff',
            contentBg: currentTheme === 'dark' ? '#121212' : '#ffffff',
            footerBg: currentTheme === 'dark' ? '#181818' : '#ffffff',
            titleColor: currentTheme === 'dark' ? '#ffffff' : '#000000',
            colorText: currentTheme === 'dark' ? '#ffffff' : '#000000',
          },
          Switch: {
            colorPrimary: '#1DB954',
            colorPrimaryHover: '#1ED760',
            colorText: currentTheme === 'dark' ? '#ffffff' : '#000000',
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  );
};

export default Root;

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);
