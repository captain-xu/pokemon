import React from 'react';
import LazyLoad from 'components/LazyLoad';

// layout
const PageLayout = LazyLoad(() => import('components/Layout'));

const Dashboard = LazyLoad(() => import('pages/Dashboard'));
const Psyduck = LazyLoad(() => import('pages/Psyduck'));
const Pikachu = LazyLoad(() => import('pages/Pikachu'));
const Squirtle = LazyLoad(() => import('pages/Squirtle'));

// 初始化路由配置
export const baseRoutes = [
  {
    path: '/',
    component: PageLayout,
    key: 'pageLayout',
    routes: [
      {
        path: '/',
        key: 'dashboard',
        title: '首页',
        exact: true,
        component: Dashboard
      },
      {
        path: '/psyduck',
        key: 'psyduck',
        title: '可达鸭',
        exact: true,
        component: Psyduck
      },
      {
        path: '/pikachu',
        key: 'pikachu',
        title: '皮卡丘',
        exact: true,
        component: Pikachu
      },
      {
        path: '/squirtle',
        key: 'squirtle',
        title: '杰尼龟',
        exact: true,
        component: Squirtle
      }
    ]
  }
]