import { useEffect, useState } from "react";
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
    .piece{
        cursor:pointer;
    }
    .dot{
        cursor:pointer;
        width: 1.5vw;
        height: 1.5vw;
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
    const [B, setB] = useState([
        [0, 5, 5, 5, 5, 5, 5, 0],
        [5, 1, 1, 1, 1, 1, 1, 5],
        [5, 1, 1, 0, 0, 0, 1, 5],
        [5, 1, 0, 1, 0, 0, 1, 5],
        [5, 1, 0, 0, 1, 0, 1, 5],
        [5, 1, 0, 0, 0, 1, 1, 5],
        [5, 2, 0, 0, 0, 0, 3, 5],
    ])
    const pics = props.picsInfo.pieces;
    // 콘솔 출력용
    // useEffect(()=>{
    //     console.log(pics)
    // })
    const [select, setSel] = useState([0,0])

    const click = (e, n)=>{
        console.log(n)
        var i = n[0]-(n[1] < 6 ? props.dice : -props.dice);
        var j = n[1]

        if (i < 1){
            j += 1-i
            i = 1
        }
        if(j > 6){
            i -= 6-j
            j = 6
        }
        var _B = [...B]
        if(select[0] == n[0] && select[1] == n[1]){
            _B[i][j] = 1
            setSel([0, 0])
        }
        else{
            _B[i][j] = 4
            setSel([n[0], n[1]])
        }
        setB(_B)
    }

    const movePcs = (loc)=>{
        console.log(loc)
        let ps = pics[select[0]][select[1]]
        let piece = [...pics]
        piece[select[0]][select[1]]= 0
        piece[loc[0]][loc[1]] = ps

        props.setPics({
            ...props.pieceInfo,
            pieces : piece
        })
        click("", select)
        setSel([0, 0])

    }

    

    let Board = B.map((R, ri)=>{
        let row = R.map((I, iI)=>{
            return(
                <td 
                    key={ri*10+iI} 
                    className={((!(ri%2)||(iI%2))&&(!(iI%2)||(ri%2)) ? "light": "dark")+(I>0 ? ((I < 5) ? " use-normal": " use-knight")  : " not-use")} 
                    onClick={(I == 4 ? ()=>{movePcs([ri, iI])}: ()=>{})}
                    style={(I == 4 ? {"cursor" : "pointer"} : {})}
                >                    {(pics[ri][iI] != 0) ? <Image onClick={(e)=>{click(e, [ri, iI])}} className="piece" src={"/pieces/"+(pics[ri][iI])+".png"} layout="fill" /> : "" }
                    {(I == 3 ? "End" : (I == 2 ? "start" : ""))}
                    {(I == 4 ? <Image className="dot" src={"/dot.svg"} width="20" height="20" /> : "")}
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

    const [diceN, setDice] = useState(3)
    const [pieceInfo, setPics] = useState({
        meNotArrive : ["bK", "bB", "bN", "bP", "bP"],
        myArrive : [],
        oppNotArrive : ["wK", "wB", "wN", "wP", "wP"],
        oppArrive : [],
        pieces : [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, "bk", 0, 0, 0, 0, 0, 0]
        ]
    })
    


    return (
        <>
            <Timer time={time} settime={(t)=>{setTime(t)}}/>
            <User/>
            
            <Board picsInfo={pieceInfo} setPics={(e)=>setPics(e)}dice={diceN}/>
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
