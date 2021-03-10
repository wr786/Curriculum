import React from 'react';
import { Tag } from 'antd';
import { Card } from 'antd';
import { Tooltip } from 'antd';
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
      <Tag color={color} >{this.props.classroom}</Tag>
    )
  }
}

class Course extends React.Component {
  render() {
    const ISEMPTY = (this.props.classname === "__DISABLED")? true: false;

    let styles = {
      width: "100%", 
      height: "100%",
    };
    let backgroundcolor = "#fff";
    if (this.props.timetype === "even") {
      backgroundcolor = "#ddf";
    } else if (this.props.timetype === "odd") {
      backgroundcolor = "#fdd";
    } else if (!ISEMPTY) {
      backgroundcolor = "#dfd"
    }
    styles.background = backgroundcolor;

    let titleStyle = {fontWeight: "bold"};
    if (ISMOBILE) {
      titleStyle.fontSize = "0.4em";
    }

    return (
      <Tooltip placement="topLeft" title={ISEMPTY? "": this.props.classname + '： ' + this.props.classroom} arrowPointAtCenter>
        <Card 
          style = {styles}
          size = {ISMOBILE? 'small': 'default'}
          bodyStyle = {ISMOBILE? { padding: "4px" }: {}}
        >
          <Meta
            title = {ISEMPTY? "　": <div style={titleStyle}>{this.props.classname}</div>}
            description = {
              ISEMPTY?
              <div>　</div>:
              <ClassroomTag classroom={this.props.classroom}/>
            }
          />
        </Card>
      </Tooltip>
    );
  }
}

export default Course;