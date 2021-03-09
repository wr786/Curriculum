import './App.css';
import Course from './Course.js'

function App() {
  return (
    <div className="App">
      <Course
        classname = "测试"
        classroom = "理教404"
      />
      <Course 
        classname = "__DISABLED"
        classroom = ""
      />
    </div>
  );
}

export default App;
