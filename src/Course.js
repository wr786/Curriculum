import React from 'react';
import { Tag } from 'antd';
import { Card } from 'antd';
const { Meta } = Card;

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

class Course extends React.Component {
  render() {
    if (this.props.classname === "__DISABLED") {
      return (
        <div classclassname="disabled course">
          <Card style={{ width: 200, marginTop: 16 }}>
          </Card>
        </div>
      );
    } else {
      return (
        <div classclassname="course">
          <Card style={{ width: 200, marginTop: 16 }}>
              <Meta
                title = {this.props.classname}
                description = {<ClassroomTag classroom={this.props.classroom}/>}
              />
            </Card>
        </div>
      )
    }
  }
}

export default Course;