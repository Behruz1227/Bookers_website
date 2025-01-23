import React from 'react';
import { Flex, Spin } from 'antd';
import '../../index.css'; // CSS faylini import qilish

const Loading: React.FC = () => (
  <div className='h-screen w-full flex justify-center items-center fixed top-0 left-0 z-[100000] backdrop-blur-sm'>
    <Flex align="center" gap="middle">
      <Spin size="large" className="red-spin" />
    </Flex>
  </div>
);

export default Loading;
