import React from 'react';
import { Table, Icon, Divider } from 'antd';
const columns = [{
  title: '名字',
  dataIndex: 'user_name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '联系方式',
  dataIndex: 'phone',
  key: 'phone',
}, {
  title: '签到',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">签到(中午) 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">签到(晚上)</a>
      <Divider type="vertical" />
      <a href="javascript:;">作业完成(晚上)</a>
      <Divider type="vertical" />
      <a href="javascript:;">离开(晚上)</a>
    </span>
  ),
}];

// const createColumns = (data, tableProps) => {
//   return <Table columns={columns} {...tableProps} dataSource={data} />
// };
export default class SignTable extends React.Component {

  render() {
    const {data, ...tableProps} = this.props;
    return (
      <Table rowKey='id' columns={columns} {...tableProps} dataSource={data} />
    )
  }
}

// export default SignTable;
