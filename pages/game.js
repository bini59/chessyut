import { useState } from "react";
import Image from "next/image";

import Timer from "./component/timer";

const style = `
    .user-section{
        display: flex;
        justify-content: space-between;    
    }
    .user-info{
        display:flex;


        width: 300px;
        height: 100px;
        background-color: #fff;        
    }

    #usr-me{
        border-bottom-right-radius: 10px;
    }
    #usr-opp{
        border-bottom-left-radius: 10px;
    }
    .user-info img{
        width : 100px;
        height: 100px;
    }
    .user-info .usr-data{
        width: 200px;
        height: 100px;

        text-overflow: ellipsis;
    }

    .user-info .usr-data .usr-data-text{
        padding: 6px 10px 6px 10px;
    }

    .timer{
        position: absolute;
        top: 5px;
        left: 50vw;
        font-size: 3rem;
    }

    .board{
        margin-top : 10vh;
        width : 30vw;
        height: 30vw;
        margin-left : auto;
        margin-right: auto;
    }
    
    .chess-board { border: 1px solid; border-spacing: 0; border-collapse: collapse; }
    .chess-board td { width: 3.75vw; height: 3.75vw; position:relative; text-align: center;}
    .chess-board .light { background: #f0d9b5; }
    .chess-board .dark { background: #b58863; }    
    .chess-board .use-normal{ border-radius : 20px; border: 3px solid #8f2700; }
    .chess-board .use-knight{ border: 3px solid #8f2700; }
`

const User = ()=>{
    return (
        <section className="user-section">
            <div className="user-info" id="usr-me">
                <img className="usr-image" />
                <div className="usr-data">
                    <div className="usr-1 usr-data-text">
                        <span className="lvl" style={{"marginRight":"10px"}}>Lv.0</span>
                        <span className="usr-name">me</span>
                    </div>
                    <div className="usr-2 usr-data-text">
                        <span className="usr-rating">Rating : 1000</span>
                    </div>
                    <div className="usr-3 usr-data-text">
                        <span className="usr-win" style={{"marginRight":"10px"}}>승 : 0</span>
                        <span className="usr-lose">패 : 0</span>
                    </div>
                </div>

            </div> 
            <div className="user-info" id="usr-opp">
                <img className="usr-image" />
                <div className="usr-data">
                    <div className="usr-1 usr-data-text">
                        <span className="lvl" style={{"marginRight":"10px"}}>Lv.0</span>
                        <span className="usr-name">opp</span>
                    </div>
                    <div className="usr-2 usr-data-text">
                        <span className="usr-rating">Rating : 1000</span>
                    </div>
                    <div className="usr-3 usr-data-text">
                        <span className="usr-win" style={{"marginRight":"10px"}}>승 : 0</span>
                        <span className="usr-lose">패 : 0</span>
                    </div>
                </div>
            </div> 
        </section>
    )
}

// (!(p%2)||(q%2))&&(!(q%2)||(p%2))

const Board = (props)=>{
    let B = [
        [0, 4, 4, 4, 4, 4, 4, 0],
        [4, 1, 1, 1, 1, 1, 1, 4],
        [4, 1, 1, 0, 0, 0, 1, 4],
        [4, 1, 0, 1, 0, 0, 1, 4],
        [4, 1, 0, 0, 1, 0, 1, 4],
        [4, 1, 0, 0, 0, 1, 1, 4],
        [4, 2, 0, 0, 0, 0, 3, 4],
    ]

    const pics = props.pics;

    let Board = B.map((R, ri)=>{
        let row = R.map((I, iI)=>{
            return(
                <td key={ri*10+iI} className={((!(ri%2)||(iI%2))&&(!(iI%2)||(ri%2)) ? "light": "dark")+(I>0 ? ((I < 4) ? " use-normal": " use-knight")  : " not-use")} >
                    {(pics[ri][iI] != 0) ? <Image src={"/pieces/"+(pics[ri][iI])+".png"} layout="fill" /> : "" }
                    {(I == 3 ? "End" : (I == 2 ? "start" : ""))}
                </td>
            )
        })
        return(
            <tr key={ri*100}>{row}</tr>
        )
    })
    


    return (
        <section className="board">
            <table className="chess-board">
                <tbody>{Board}</tbody>
            </table>
        </section>
    );
}


const Game = ()=>{
    const [time, setTime] = useState(0);

    const [peices, setPics] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, "bB", 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ])
    

    return (
        <>
            <Timer time={time} settime={(t)=>{setTime(t)}}/>
            <User/>

            <Board pics={peices}/>
            {/* test timer button */}
            {/* <button onClick={()=>{setTime(10)}}>tt</button>
            <button onClick={()=>{setTime(5)}}>tt</button> */}

            {/* <button onClick={()=>{setPics([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, "bB", 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ])}}>12</button> */}

            <style jsx>{style}</style>
        </>
    );
}


export default Game
