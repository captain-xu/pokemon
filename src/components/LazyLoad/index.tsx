import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const LazyLoad = (loader: any) => {
  return Loadable({
    loader,
    loading() {
      return <Spin />
    }
  });
}

export default LazyLoad