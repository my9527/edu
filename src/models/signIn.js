
import { routerRedux } from 'dva/router';
import { message } from 'antd';

import { pull } from "../utils/request";


const getStudents = (options) => {
  return pull('/v1/usersStatus', { data: { ...options }})
}

export default {

  namespace: 'signIn',

  state: {
    records: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetchData({ payload: { page, grade} }, { put, call }) {
      const students = yield call(getStudents, { page, grade });
      students.data = students.data || {};
      students.data.classes = [null, 1,4,7];
      // console.log(students, 'dddfff')
      // console.log(students);
      // const students = {
      //   data: [{
      //     "id":4,
      //     "user_name":"徐照钱",
      //     "ding_user_id":"",
      //     "wechat_open_id":"",
      //     "phone":"18355165930",
      //     "user_type":0,
      //     "user_status":0,
      //     "update_time":"0001-01-01T00:00:00Z",
      //     "checkin_status":"0000000000",
      //     "last_checkin_record_id":0,
      //     grade: 3,
      //     class: 3
      //   }]
      // }
      yield put({
        type: 'save',
        payload: {
          data: [...students.data.user_extends],
          classes: [...students.data.classes]
        }
      })
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, records: [...action.payload.data], classes: [...action.payload.classes] };
    },
  },

};
