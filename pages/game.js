import { useEffect, useState } from "react";
import Image from "next/image";

import Timer from "./component/timer";
import Style from "./style/game"

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

            <style jsx>{Style}</style>
        </>
    );
}


export default Game
