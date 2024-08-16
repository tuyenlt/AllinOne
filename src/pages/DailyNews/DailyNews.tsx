import Cnn from './components/Cnn'
import TodoList from './components/TodoList'
import LeetcodeDaily from './components/LeetcodeDaily'
import Vnexpess from './components/Vnexpress'
import CodeforceContest from './components/CodeforceContest'
import CoinAndStock from './components/CoinAndStock'

function DailyNews() {
    return (
        <div className="row">
            <div className="col w-50">
                <CodeforceContest></CodeforceContest>
                <CoinAndStock></CoinAndStock>
                <Cnn></Cnn>
            </div>
            <div className="col w-50">
                <TodoList>
                </TodoList>
                <LeetcodeDaily></LeetcodeDaily>
                <Vnexpess></Vnexpess>

            </div>
        </div>
    )
}

export default DailyNews
