
import axios from "axios"
import React, { useEffect, useState } from "react";

const API_URL = "https://codeforces.com/api/contest.list?gym=false"
const regesterUrl = "https://codeforces.com/contestRegistration/"

function convertSecondsToDate(seconds: number): string {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${days > 0 ? days + ' days' : ''} 
            ${hours > 0 ? hours + ' hours' : ''} 
            ${minutes > 0 ? minutes + ' minutes' : ''} 
            ${remainingSeconds > 0 ? remainingSeconds + ' seconds' : ''}`;
}

interface ContestInterface {
    name: string
    beforeStart: string
    duration: string
    id: string
}

async function getCodeforceContest() {
    let contestList: ContestInterface[] = [];
    const response = await axios.get(API_URL)
    console.log(response.data.result)
    for (let constest of response.data.result) {
        if (constest.phase == "FINISHED") break;
        contestList.push({
            id: constest.id,
            name: constest.name,
            beforeStart: convertSecondsToDate(-constest.relativeTimeSeconds),
            duration: convertSecondsToDate(constest.durationSeconds)
        })
    }
    return contestList
}

function CodeforceContest() {
    const [constestList, setContestList] = useState<ContestInterface[]>([]);
    const handleUpdateContest = async () => {
        let updatedContestList = await getCodeforceContest()
        setContestList(updatedContestList)
    }
    useEffect(() => {
        handleUpdateContest()
    }, []);

    const handleRegester = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let link = regesterUrl + event.currentTarget.getAttribute('data-id')
        window.open(link, '_blank')
    }

    return <div className="card">
        <h3 className="card-header text-center" >Codefores Upcomming Contest List</h3>
        <ul className="list-group">
            {constestList.map((contest) => (
                <li className="list-group-item">
                    <h5 className="">{contest.name}</h5>
                    <div className="">Before start : {contest.beforeStart}</div>
                    <div className="">Duration : {contest.duration}</div>
                    <button className="btn btn-outline-secondary" data-id={contest.id} onClick={handleRegester}>Regester</button>
                </li>
            ))}
        </ul>
    </div>

}

export default CodeforceContest