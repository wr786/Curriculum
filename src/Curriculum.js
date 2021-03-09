import React from 'react';
import Course from './Course.js'
import { Row, Col } from 'antd';
import coursedata from './courses.json'

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
      validDates: 7,
      totclasses: 12,
      classes: Array(84).fill({
        classname: "__DISABLED",
        classroom: "",
        timetype: "every",
      }),
    };

    // 解析./courses.json
    const state = this.state;
    const courses = coursedata.courses;
    for (let idx in courses) {
      const course = courses[idx];
      for (let tidx in course.times) {
        let time = course.times[tidx];
        time.classes.map( (classtime) => {
          let cidx = this.calc_idx(time.weekday, classtime);
          state.classes[cidx] = {
            classname: course.name,
            classroom: course.place,
            timetype: time.type
          };
          return true;
        } )
      }
    }
    this.setState(state);

    // 判断是否省略周六周日
    // 先判断是否能省略周日
    let omitSunday = this.has_no_class(7);
    if (omitSunday) {
      // 再判断能否省略周六
      let omitSaturday = this.has_no_class(6);
      if(omitSaturday) {
        const state = this.state;
        state.validDates = 5;
        this.setState(state);
      } else {
        const state = this.state;
        state.validDates = 6;
        this.setState(state);
      }
    }

  }

  // 判断某天是否没课
  has_no_class = (date) => {
    for (let classtime = 1; classtime <= this.state.totclasses; classtime++) {
      if (this.state.classes[this.calc_idx(date, classtime)].classname !== "__DISABLED") {
        return false;
      }
    }
    return true;
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
      timetype = {this.state.classes[idx].timetype}
    />);
  }

  // 渲染一周的一行课程
  render_row = (rowNum) => {
    let row = [];
    for (let j = 1; j <= this.state.validDates; j++) {
      row.push(
        <Col 
          key={rowNum.toString() + j.toString()}
          span={this.state.validDates === 7? 3: 4}
        >
          {this.render_class(j, rowNum)}
        </Col>)
    }
    return row;
  }

  render() {
    /* 一行有24格，那么每格就是3 */
    let curriculum = [];
    for (let i = 1; i <= this.state.totclasses; i++) {
      curriculum.push(
        <Row 
          key={i} 
          // type="flex" 
          justify="center" 
          align="middle"
        >
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