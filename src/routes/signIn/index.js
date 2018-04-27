import React from 'react';
import { Row, Col, Select } from 'antd';
import SignTable from './table/createColumns';
import style from './index.less'

const Option = Select.Option;

const tempData = [
    {
      "id":4,
      "user_name":"徐照钱",
      "ding_user_id":"",
      "wechat_open_id":"",
      "phone":"18355165930",
      "user_type":0,
      "user_status":0,
      "update_time":"0001-01-01T00:00:00Z",
      "checkin_status":"0000000000",
      "last_checkin_record_id":0
    },
    {
      "id":6,
      "user_name":"赖庆财",
      "ding_user_id":"",
      "wechat_open_id":"",
      "phone":"13096372503",
      "user_type":0,
      "user_status":0,
      "update_time":"0001-01-01T00:00:00Z",
      "checkin_status":"0110000000",
      "last_checkin_record_id":0
    }
];

const Grade = [{
  name: '一年级',
  id:1,
},{
  name: '二年级',
  id:2,
},{
  name: '三年级',
  id:3,
},{
  name: '四年级',
  id:4,
},{
  name: '五年级',
  id:5,
},{
  name: '六年级',
  id:6,
}];

class PageSignIn extends React.Component {

  state = {
     pagination: {
      current: 1,
      pageSize: 1,
      showQuickJumper: true,
    },
  };

  onTableChange = (pagination, filters, sorter) => {
      this.setState({pagination})
  };
  handleChange = (e)=>{

  };
  handleFilter = (input, option) => {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  render() {
    // const { pagination } = this.props;
    const { pagination } = this.state;

    return (
      <div>
        <div className={style.FilterRow}>
          <div>年纪：</div>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={this.handleFilter}
            defaultValue={1}
          >
            { Grade.map((grade) => {
              return <Option key={grade.id} value={grade.id}>{grade.name}</Option>;
            })}
          </Select>
        </div>
        <div>
          <SignTable
            data={tempData}
            onChange={this.onTableChange}
            pagination={pagination}
          />
        </div>
      </div>
    )
  }
}

export default PageSignIn;
