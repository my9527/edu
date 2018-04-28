import React from 'react';

import { Layout, Menu, Icon } from 'antd';
import { routerRedux, Route, Switch, Link, Redirect } from 'dva/router';
import { menu } from './menu';

import PageSignIn from '../signIn';
import PageUploadFiles from '../uploadFiles';
import PageLogin from '../login';

import style from './index.less';


const { Header, Sider, Content } = Layout;


class PageIndex extends React.Component {

  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const { location } = this.props;
    const activeItem = menu.filter((menuItem) => {
      return menuItem.path === location.pathname;
    })[0] || {};

    if( location.pathname === '/login'){
      return <PageLogin/>;
    }
    const base = ()=>{
      return <Redirect to='/edu/sign-in' />
    }

    return (
      <div>
        <Layout className={style.PageIndex}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeItem.id]}>
              <Menu.Item >
                <div onClick={this.toggle} className={style.triggerCnt}>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}

                  />
                </div>
              </Menu.Item>
              { menu.map((menuItem) => {
                return (
                  <Menu.Item key={menuItem.id}>
                    <Link to={menuItem.path}>
                      <Icon type={menuItem.icon}/>
                      <span>{ menuItem.name }</span>
                    </Link>
                  </Menu.Item>
                )
              })}

            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Switch>
                <Route path='/' exact component={base} />
                <Route exact path="/edu/sign-in" component={PageSignIn} />
                <Route exact path="/edu/upload-files" component={PageUploadFiles} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default PageIndex;


