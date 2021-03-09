import React from 'react';
import Course from './Course.js'
import { Row, Col } from 'antd';

class Curriculum extends React.Component {
  constructor(props) {
    super(props);
    /*
      对于北京大学，
      一周有七天，每天有十二节课，那么我们总共有84个单元格
      从左到右排，
          1  2  3  4  5  6  7
          月 火 水 木 金 土 日
      一  0  1  2  3  4  5  6
      二  7  8  9 10 11 12 13 ...
    */
    this.state = {
      dates: 7,
      totclasses: 12,
      classes: Array(84).fill({
        classname: "__DISABLED",
        classroom: "",
      }),
    };
  }

  // 获取日期
  get_date = (idx) => {
    return idx % this.state.dates + 1;
  }

  // 获取是第几节课
  get_classtime = (idx) => {
    return Math.floor(idx / this.state.dates) + 1;
  }

  // 计算编号
  calc_idx = (date, classtime) => {
    return (date-1) + (classtime-1)*this.state.dates;
  }

  // 渲染课程
  render_class = (date, classtime) => {
    let idx = this.calc_idx(date, classtime);
    return (<Course
      classname = {this.state.classes[idx].classname}
      classroom = {this.state.classes[idx].classroom}
    />);
  }

  // 渲染一周的一行课程
  render_row = (rowNum) => {
    let row = [];
    for (let j = 1; j <= this.state.totclasses; j++) {
      row.push(<Col>{this.render_class(rowNum, j)}</Col>)
    }
    return row;
  }

  render() {
    /* 一行有24格，那么每格就是3 */
    let curriculum = [];
    for (let i = 1; i <= this.state.dates; i++) {
      curriculum.push(
        <Row type="flex" justify="center" align="middle">
          {this.render_row(i)}
        </Row>
      )
    }
    return (
      <div className="curriculum">
        {curriculum}
      </div>
    );
  }
}

export default Curriculum;