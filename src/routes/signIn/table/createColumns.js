import React from 'react';
import { Table, Icon, Divider, Button, message } from 'antd';
import { patch } from "../../../utils/request";




// const createColumns = (data, tableProps) => {
//   return <Table columns={columns} {...tableProps} dataSource={data} />
// };
export default class SignTable extends React.Component {

  render() {
    const {data, ...tableProps} = this.props;

    /**
     * 签到
     * @param isCanCheck 是否能签到
     * @param id  学生id
     * @returns {*}
     */
    const checkIn = (isCanCheck, id) => {
      if(isCanCheck !== '0') return;
      return patch('/v1/checkin', {
        data: {
          id
        }
      }).then(res=>{
        tableProps.update && tableProps.update(tableProps.grade);
      }, err=>{
        message.error(err);
      })
    };

    // table 每一列的对应，dataIndex 为对应的数据字段名
    const columns = [{
      title: '名字',
      dataIndex: 'user_name',
      key: 'name',
      width: '200px',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '所属年（班）级',
      key: 'grade',
      render: (v)=>{
        return `${v.grade || '-'}年级${v.class || '-'}班`;
      }
    },{
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '签到',
      key: 'action',
      render: (text, record) => {
        const {checkin_status} = record;
        const checkArr = checkin_status.split('').slice(0, 4);
        console.log(checkArr);
        return (
          <span>
      <Button disabled={checkArr[0]==='1'} onClick={e=>checkIn(checkArr[0], record.id)}>签到(中午)</Button>
      <Divider type="vertical"/>
      <Button disabled={checkArr[1]==='1'} onClick={e=>checkIn(checkArr[1], record.id)}>签到(晚上)</Button>
      <Divider type="vertical"/>
      <Button disabled={checkArr[2]==='1'} onClick={e=>checkIn(checkArr[2], record.id)}>作业完成(晚上)</Button>
      <Divider type="vertical"/>
      <Button disabled={checkArr[3]==='1'} onClick={e=>checkIn(checkArr[3], record.id)}>离开(晚上)</Button>
    </span>
        )
      },
    }];
    return (
      <Table rowKey='id' columns={columns} {...tableProps} dataSource={data} />
    )
  }
}

// export default SignTable;
