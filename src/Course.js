import React from 'react';
import { Tag } from 'antd';
import { Card } from 'antd';
import isMobile from 'ismobilejs';
const { Meta } = Card;

// 针对移动端优化
const DEVICE = isMobile(window.navigator);
const ISMOBILE = DEVICE.any;

class ClassroomTag extends React.Component {

  pick_color = (classroom) => {
    let color = "geekblue";   // The default color
    if (classroom.indexOf("理教") !== -1) {
      color = "purple";
    } else if (classroom.indexOf("二教") !== -1) {
      color = "orange";
    } else if (classroom.indexOf("三教") !== -1) {
      color = "red";
    } else if (classroom.indexOf("一教") !== -1) {
      color = "green";
    } else if (classroom.indexOf("邱德拔") !== -1) {
      color = "cyan";
    } else if (classroom.indexOf("王克桢") !== -1) {
      color = "gold";
    }
    return color;
  }

  render() {
    // Select the color of classroom
    let color = this.pick_color(this.props.classroom);
    return (
      <Tag color={color}>{this.props.classroom}</Tag>
    )
  }
}

class TimetypeTag extends React.Component {

  render() {
    if (this.props.timetype === "even") {
      return <Tag color="#2db7f5">双周</Tag>
    } else if (this.props.timetype === "odd") {
      return <Tag color="#f50">单周</Tag>
    } else {
      return <></>;
    }
  }

}

class Course extends React.Component {
  render() {
    const ISEMPTY = (this.props.classname === "__DISABLED")? true: false;
    return (
      <div classclassname="disabled course">
        <Card 
          style = {{ width: "100%", height: "100%" }}
          bodyStyle = {{ padding: "4px" }}
        >
          <Meta
            title = {ISEMPTY? "　": this.props.classname}
            description = {
              ISEMPTY?
              <div>　</div>:
              <div>
                <ClassroomTag classroom={this.props.classroom}/>
                <TimetypeTag  timetype={this.props.timetype}/>
              </div>
            }
          />
        </Card>
      </div>
    );
  }
}

export default Course;