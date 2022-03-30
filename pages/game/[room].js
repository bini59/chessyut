import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import socketio from "socket.io-client";

import Timer from "../../component/timer";
import Board from "../../component/board";
import Style from "../../style/game"


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



const Game = ()=>{
    const [time, setTime] = useState(0);
    const router = useRouter();
    const { room } = router.query;

    const [socket, setSocket] = useState("")
    
    useEffect(()=>{
        setSocket(socketio.connect("http://192.168.0.150:3002"))
    }, [])


    const [turn, _] = useState(Math.ceil(Math.random()*1000)) 
    const [start, setStarter] = useState(true)

    useEffect(()=>{ 
        if(room && socket){
            console.log("방 입장")
            socket.emit("joinRoom", {title:room, n : turn});
        }
    }, [socket])


    //선공 후공
    useEffect(()=>{
        if(socket){
            socket.off("setStarter")
            socket.on("setStarter", data=>{
                if(data.n != turn){
                    setStarter(false);
                }
            })
        }
    }, [socket])


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

    const [diceOn, setStart] = useState(false)

    return (
        <>
            <Timer time={time} settime={(t)=>{setTime(t)}}/>
            <User/>
            
            <Board 
                socket={socket} 
                room={room} 
                picsInfo={pieceInfo} 
                setPics={(e)=>setPics(e)} 
                dice={diceN} 
                starter={start}
                start={e=>setStart(e)}
            />
            {diceOn ? <Dice dice={diceN} setDice={(t)=>{setDice(t)}}/> : ""}

            <style jsx>{Style}</style>
        </>
    );
}


export default Game
