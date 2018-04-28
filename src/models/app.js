
import { post } from "../utils/request";
import { routerRedux } from 'dva/router';
import { message } from 'antd';


export default {

  namespace: 'app',

  state: {
    user: {},
    isLogin: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(location => {
        if (location.pathname.includes('edu')) {
          // dispatch({
          //   type: 'loginhook',
          // });
        }
      });
    },
  },

  effects: {
    *loginhook({ payload },{ select, call, put }){
      const isLogin = yield select(({app}) => app.isLogin);
      console.log('logincheck',isLogin);
      if(isLogin === false){
        yield put((routerRedux.push('/login')));
      }

    },
    *login({ payload }, { put }){
      yield put({
        type: 'save',
        payload: {
          isLogin: payload.isLogin,
        }
      })
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, isLogin: action.payload.isLogin };
    },
  },

};
