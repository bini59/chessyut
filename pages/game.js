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
        display:flex;
        margin-top : 10vh;
        width : 30vw;
        height: 28.25vw;
        margin-left : auto;
        margin-right: auto;
        justify-content: center;
    }

    .dot{
        cursor:pointer;
        width: 100%;

    }

    .dice{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    // .chess-board { border: 1px solid; border-spacing: 0; border-collapse: seperate; }
    .chess-board td { width: 3.75vw; height: 3.75vw; position:relative; text-align: center; font-size:1vw;}
    .chess-board .light { background: #f0d9b5; }
    .chess-board .dark { background: #b58863; }    
    .chess-board .use-normal{ border-radius : 10px; border: 3px solid #8f2700; }
    .chess-board .use-knight{ border: 3px solid #8f2700; }

    .pieceWait{
        display:block;
        width: 2vw;
        height: 2vw;
        margin-left:2%;
        margin-right:2%;
    }
    .pieceWait span{
        position:inherit !important;
    }
    .piece{
        position:inherit !important;
        width:100% !important;
        height:100% !important;
        cursor:pointer;
    }
    .myPiece{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 18vw;
        height: 25vw;
        margin-left:auto;
        margin-right:auto;
        
    }
    .piece-box{
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        border:1px solid;
        width: 80%;
        height: 20%;
        margin-bottom: 2%;
    }

    .Game{
        display:flex;
        align-items:center;
    }

    @media (max-width:1500px){
        .Game{
            flex-wrap: wrap;
        }
        .Game section:first-child{
            order:2;
        }
        .Game section:nth-child(2){
            order:1;
        }
        .Game section:last-child{
            order:3;
        }
        .board{
            width: 100%;
            height:56vw;
        }
        .chess-board td{
            width:7.5vw;
            height:7.5vw;
        }
        .myPiece{
            width: 40vw;
            height: 30vw;
        }
        .pieceWait{
            width:5vw;
            height:5vw;
        }
    }
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
    // 콘솔 출력용
    // useEffect(()=>{
    //     console.log(props)
    // })


    const [target, setTarget] = useState("")
    const piecesInfo = props.picsInfo;
    const move = (loc)=>{
        let info = {...piecesInfo};
        for(var i = 0; i < 7; i++)
            for(var j = 0; j < 8; j++)
                if(info.pieces[i][j] == target) info.pieces[i][j] = 0;

        (loc[0] == 6 && loc[1] == 6) ? info.myArrive.push(target) : info.pieces[loc[0]][loc[1]] = target;
        if(info.myNotArrive.indexOf(target) != -1){
            info.myNotArrive.splice(info.myNotArrive.indexOf(target), 1);
        }


        // 이 부분은 서버로 보내서 처리할것. 
        // 서버로 보낸후 받아오는걸로 setPics..
        props.setPics(info);
        Click("moved", target, loc);
    }
    const Click = (event, selPics, loc)=>{
        let _b = [...B];
        if(event == "moved"){
            _b[loc[0]][loc[1]] = 1;
            setB(_b);
            setTarget("");
            return;
        }
        const dice = props.dice;

        // console.log("주사위값 확인 : "+dice);


        if(loc[0] == loc[1]){loc[0] = loc[1] = (dice+loc[0] > 6 ? 6 : loc[0]+dice)}
        else {loc[0] -= loc[1] < 6 ? dice : -dice;}
        if(loc[0] < 1) {loc[1] += (1-loc[0]); loc[0] = 1;}
        if(loc[1] > 6){ loc[0] -= 6-loc[1]; loc[1] = 6;}
        if(loc[0] > 6){ loc[0] = 6;}

        // console.log("최종 location 좌표 : "+ loc)


        if(selPics == target){
            // console.log("test\n" + _b[4]);
            _b[loc[0]][loc[1]] = 1;
            setB(_b);
            setTarget("");
            return;
        }
        _b[loc[0]][loc[1]] = 4
        setTarget(selPics);
        setB(_b);
    }

    let Board = B.map((R, ri)=>{
        let row = R.map((I, iI)=>{
            return(
                <td 
                    key={ri*10+iI} 
                    className={((!(ri%2)||(iI%2))&&(!(iI%2)||(ri%2)) ? "light": "dark")+(I>0 ? ((I < 5) ? " use-normal": " use-knight")  : " not-use")} 
                    onClick={(I == 4 ? ()=>{move([ri, iI])}: ()=>{})}
                    style={(I == 4 ? {"cursor" : "pointer"} : {})}
                >                    
                    {(piecesInfo.pieces[ri][iI] != 0) ? <Image onClick={(e)=>{Click(e,piecesInfo.pieces[ri][iI], [ri, iI])}} className="piece" src={"/pieces/"+(piecesInfo.pieces[ri][iI])+".png"} layout="fill" /> : "" }
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

        <div className="Game">
            <Piece click={(target, loc)=>{Click("new", target, loc)}}dice={props.dice} piece={[piecesInfo.myNotArrive, piecesInfo.myArrive]}/>
            <section className="board">
                <table className="chess-board">
                    <tbody>{Board}</tbody>
                </table>
            </section>
            <Piece click={(target, loc)=>{Click("new", target, loc)}}dice={props.dice} piece={[piecesInfo.oppNotArrive, piecesInfo.oppArrive]}/>
        </div>
        
    );
}

const Dice = (props)=>{
    // 서버로 보내야함.
    // 주사위 결과값
    return(
        <section className="dice">
            <div>주사위 결과 값 : {props.dice}</div>
            <button onClick={()=>{props.setDice(Math.floor(Math.random()*4)+1);}}>주사위 굴리기</button>
        </section>
    )
}

const Piece = (props)=>{
    // console.log(props)

    const notArr = props.piece[0].map((p, i)=>{
        return(
            <div className="pieceWait" key={"mypice"+i}>
                <Image className="piece" onClick={()=>{props.click(p, [7, 1])}} src={"/pieces/"+p+".png"} layout="fill"style={{"width":"null", "height":"5vw","resizeMode":"cover"}} />
            </div>
        )
    });
    const Arr = props.piece[1].map((p, i)=>{
        return(
            <div className="pieceWait" key={"mypice"+i}>
                <Image className="piece" src={"/pieces/"+p+".png"} width="50" height="50" />
            </div>
        )
    });
    
    return(
        <section className="myPiece">
            <div>대기말</div>
            <section className="piece-box notArr">{notArr}</section>
            <div>도착말</div>
            <section className="piece-box Arr">{Arr}</section>
        </section>
    )
}

const Game = ()=>{
    const [time, setTime] = useState(0);

    const [diceN, setDice] = useState(3)
    const [pieceInfo, setPics] = useState({
        myNotArrive : ["bK", "bB", "bN", "bP", "bP1"],
        myArrive : [],
        oppNotArrive : ["wK", "wB", "wN", "wP", "wP1"],
        oppArrive : [],
        pieces : [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]
    })


    return (
        <>
            <Timer time={time} settime={(t)=>{setTime(t)}}/>
            <User/>
            
            <Board picsInfo={pieceInfo} setPics={(e)=>setPics(e)} dice={diceN}/>

            <Dice dice={diceN} setDice={(t)=>{setDice(t)}}/>
            
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
