import React from 'react';
import { Row, Col, Select } from 'antd';
import { connect } from 'dva';
import SignTable from './table/createColumns';
import style from './index.less';

const Option = Select.Option;

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

@connect((state) => {
  return {
    records: state.signIn.records,
    loading: state.loading.effects['signIn/fetchData']
  }
})
class PageSignIn extends React.Component {

  state = {
     pagination: {
      current: 1,
      pageSize: 10,
      showQuickJumper: true,
    },
    grade: 1,
  };
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'signIn/fetchData',
      payload: {
        grade: 1,
        page: 1,
      }
    })
  }

  updateTable = () => {
    const {grade, pagination} = this.state;
    this.getData(grade, pagination.current);
  };



  onTableChange = (pagination, filters, sorter) => {
     const { disptach } = this.props;
     const { grade } = this.state;
     this.setState({pagination});
     // 暂时未分页
     // this.getData(grade, pagination.current);
  };

  getData = (grade, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'signIn/fetchData',
      payload: {
        grade,
        page,
      }
    });
    this.setState({
      grade,
      pagination: { ...this.state.pagination, current: page},
    })
  }
  handleChange = (grade)=>{
    this.setState({grade});
    this.getData(grade, 1);

  };
  handleFilter = (input, option) => {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  render() {
    const { records, loading } = this.props;
    const { pagination, grade } = this.state;

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
            data={records}
            grade={grade}
            loading={loading}
            update={this.updateTable}
            onChange={this.onTableChange}
            pagination={pagination}
          />
        </div>
      </div>
    )
  }
}

export default PageSignIn;
