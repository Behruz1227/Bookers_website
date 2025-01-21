import React from 'react';
import { Spin } from 'antd';

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const Loading: React.FC = () => (
  <div style={containerStyle}>
    <Spin tip="Loading" size="large">
      <div style={contentStyle} />
    </Spin>
  </div>
);

export default Loading;
