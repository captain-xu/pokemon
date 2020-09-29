import React from 'react';
import { Layout, Menu } from 'antd';
import { Switch, Link, RouteComponentProps } from 'react-router-dom';
import { getRoutesData, baseRoutes, renderRoutes } from '../../routers';
import Icon from '../Icon'

import './index.less'

const { Header, Sider, Content } = Layout;

const route = getRoutesData(baseRoutes);

interface Props extends RouteComponentProps {

};

export default class PageLayout extends React.Component<Props> {

  render() {
    const selectedKeys = this.props.history.location.pathname.split('/')
    return (
      <Layout className="page-layout">
        <Sider trigger={null} theme="light">
          <Link to="/">
            <div className="page-logo">
              <img src='/static/pokemon.jpg' width="20" height="20" />
              <span className="m-l-10 text-bold">宝可梦</span>
            </div>
          </Link>
          <Menu mode="inline" selectedKeys={selectedKeys}>
            <Menu.Item key="psyduck" icon={<Icon type="icon-psyduck" />}>
              <Link style={{display: 'inline'}} to={`/psyduck`}>可达鸭</Link>
            </Menu.Item>
            <Menu.Item key="pikachu" icon={<Icon type="icon-pikachu" />}>
              <Link style={{display: 'inline'}} to={`/pikachu`}>皮卡丘</Link>
            </Menu.Item>
            <Menu.Item key="squirtle" icon={<Icon type="icon-squirtle" />}>
              <Link style={{display: 'inline'}} to={`/squirtle`}>杰尼龟</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="page-header"></Header>
          <Content className="site-layout-background p-20">
            <Switch>
              {renderRoutes(route)}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}