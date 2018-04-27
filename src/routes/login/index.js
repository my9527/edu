import React from 'react';
import { Card, Form, Input, Button, Icon, message } from 'antd';
import { connect } from 'dva';

import style from './index.less';

import { post } from '../../utils/request';



@connect((state) => {
  return {
    app: {},
  };
})
@Form.create()
class PageLogin extends React.Component {

  handleSubmit = (e) => {
    const { form, dispatch } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if(err){
        message.error(err);
        return
      }
      dispatch({
        type: 'login/login',
        payload: {
          data: { ...values },
        },
      })
    })
  }
  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <div className={style.pageLogin}>
        <Card className={style.loginCard} title="Login" bordered={false}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item>

              {/*<a className="login-form-forgot" href="">Forgot password</a>*/}
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              {/*Or <a href="">register now!</a>*/}
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default PageLogin;
