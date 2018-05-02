import React from 'react';
import { Row, Col, Select, Tabs, Radio } from 'antd';
import { connect } from 'dva';
import SignTable from './table/createColumns';
import style from './index.less';

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

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
    classes: state.signIn.classes,
    loading: state.loading.effects['signIn/fetchData']
  }
})
class PageSignIn extends React.Component {

  state = {
     pagination: {
      current: 1,
      pageSize: 9,
      showQuickJumper: true,
    },
    grade: 1,
    clas: null,
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

  /**
   * 签到后刷新当前的table
   */
  updateTable = () => {
    const {grade, pagination} = this.state;
    this.getData(grade, pagination.current);
  };


  /**
   * table 翻页，记录当前的页码
   * @param pagination
   * @param filters
   * @param sorter
   */
  onTableChange = (pagination, filters, sorter) => {
     const { disptach } = this.props;
     const { grade } = this.state;
     this.setState({pagination});
     // 暂时未分页
     // this.getData(grade, pagination.current);
  };

  /**
   * 获取信息， 与 models 中的 signIn 里面的 fetch 挂钩
   * @param grade
   * @param page
   */
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
  /**
   * 年级变化后重新请求数据
   * @param grade
   */
  handleChange = (grade)=>{
    this.setState({grade});
    this.setState({
      clas: null,
    });
    this.getData(grade, 1);

  };
  changeClas = (e) => {
    this.setState({
      clas: e.target.value,
    })
  }
  /**
   * 快速查询年级
   * @param input
   * @param option
   * @returns {boolean}
   */
  handleFilter = (input, option) => {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  render() {
    const { records, loading } = this.props;
    const { pagination, grade, clas } = this.state;

    let classMap = new Map();

    const filteredRecords = records.filter((record) => {
      classMap.set(record.class, -1);
      if (clas || clas === 0){
        return record.class === clas;
      }
      return true;
    });

    console.log(classMap,Array.from(classMap));
    // 年级获取
    const classes = (Array.from(classMap)).map(c=> c[0]);
    classes.unshift('');

    return (
      <div>
        <div className={style.FilterRow}>
          {/*<div>年纪：</div>*/}
          {/*<Select*/}
            {/*showSearch*/}
            {/*style={{ width: 200 }}*/}
            {/*placeholder="Select a person"*/}
            {/*optionFilterProp="children"*/}
            {/*onChange={this.handleChange}*/}
            {/*filterOption={this.handleFilter}*/}
            {/*defaultValue={1}*/}
          {/*>*/}
            {/*{ Grade.map((grade) => {*/}
              {/*return <Option key={grade.id} value={grade.id}>{grade.name}</Option>;*/}
            {/*})}*/}
          {/*</Select>*/}

          <Tabs className={style.tabs} defaultActiveKey="1" onChange={this.handleChange}>
            { Grade.map((grade) => {
              return <TabPane tab={grade.name} key={grade.id} >
                  {classes.length ? (<RadioGroup onChange={this.changeClas} value={this.state.clas}>
                    {classes.map((cls)=>{
                      if (cls === undefined || cls === null || cls === '') {
                        return <Radio key="all">全部</Radio>
                      }
                      return <Radio key={cls} value={cls}>{cls} 班</Radio>
                    })}
                  </RadioGroup>) : null}
                <div style={{marginBottom: '1em'}}></div>
              </TabPane>;
            })}
          </Tabs>
        </div>
        <div>
          <SignTable
            data={filteredRecords}
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
