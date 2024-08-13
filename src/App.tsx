import './App.css'
import Cnn from './components/Cnn'
import TodoList from './components/TodoList'
import LeetcodeDaily from './components/LeetcodeDaily'
import Vnexpess from './components/Vnexpress'
import CodeforceContest from './components/CodeforceContest'

function App() {

  return (
    <>
      <div className="row">
        <div className="col">
        </div>
        <div className="col"></div>
      </div>
      <CodeforceContest></CodeforceContest>
      <Vnexpess></Vnexpess>
      <LeetcodeDaily></LeetcodeDaily>
      <TodoList oldLists={[
        { text: "done this shit", done: true },
        { text: "done that shit", done: false },
        { text: "done the other shit", done: false }]}></TodoList>
      <Cnn></Cnn>
    </>
  )
}

export default App
