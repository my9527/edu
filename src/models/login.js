
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
    *login({ payload }, { put, call }) {
      const { username, password } = payload.data;
      console.log( username, password );
      const login = function () {
        return post('/v1/login', {
          data: { ...payload.data }
        });
      };
      // yield put({
      //   type: 'app/login',
      //   payload: {
      //     isLogin: true,
      //   }
      // });
      // yield put(routerRedux.push('/edu/sign-in'));
      const result = yield call(login);
      console.log(result, 'dddd');
      if(result.data.err_code === 0) {
        yield put(routerRedux.push('/edu/sign-in'));
      }

      return;

    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
