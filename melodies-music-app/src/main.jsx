import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1DB954',
          colorInfo: '#1DB954',
          colorSuccess: '#28a745',
          colorWarning: '#ffc107',
          colorError: '#dc3545',
          colorBgBase: '#121212',
          colorTextBase: '#ffffff',
        },
        components: {
          Layout: {
            bodyBg: '#121212',
            headerBg: '#121212',
            footerBg: '#121212',
            siderBg: '#040404',
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
            headerBg: '#282828',
            actionsBg: '#282828',
            extraColor: '#ffffff',
            colorBgContainer: '#181818',
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
            colorTextPlaceholder: '#b3b3b3',
            colorBgContainer: '#282828',
            colorBorder: '#535353',
            colorText: '#ffffff',
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
            headerBg: '#282828',
            headerColor: '#ffffff',
            rowHoverBg: '#282828',
            colorBgContainer: '#181818',
            colorText: '#ffffff',
            borderColor: '#535353',
          },
          Modal: {
            headerBg: '#181818',
            contentBg: '#121212',
            footerBg: '#181818',
            titleColor: '#ffffff',
            colorText: '#ffffff',
          },
          Switch: {
            colorPrimary: '#1DB954',
            colorPrimaryHover: '#1ED760',
            colorText: '#ffffff',
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </BrowserRouter>
);
