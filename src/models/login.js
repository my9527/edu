
import { post } from "../utils/request";
import { routerRedux } from 'dva/router';
import { message } from 'antd';


export default {

  namespace: 'login',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *login({ payload }, { put }) {
      const { username, password } = payload.data;
      console.log( username, password );
      yield put({
        type: 'app/login',
        payload: {
          isLogin: true,
        }
      });
      yield put(routerRedux.push('/edu/sign-in'));

      return;
      post('/v1/login', {
        data: { ...payload.data }
      })
        .then(res=>{
          routerRedux.push('/edu/sign-in')
        }, err=>{
          message.error(err);
        })

    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
