import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import socketio from "socket.io-client";
import create from "zustand"
import {devtools} from "zustand/middleware"

import Timer from "../../component/timer";
import Board from "../../component/game/board";
import Style from "../../style/game"
import User from "../../component/game/user";

const Dice = (props)=>{
    // 서버로 보내야함.
    // 주사위 결과값
    const {dice, change_dice} = props.store();
    return(
        <section className="dice">
            <div>주사위 결과 값 : {dice}</div>
            <button onClick={()=>{change_dice(Math.floor(Math.random()*4)+1);}}>주사위 굴리기</button>
        </section>
    )
}

const useStore = create(devtools((set)=>({
    pieceinfo : [
        {name : "bK", location : [0]},
        {name : "bB", location : [0]},
        {name : "bN", location : [0]},
        {name : "bP", location : [0]},
        {name : "bP1", location : [0]},
        {name : "wK", location : [0]},
        {name : "wB", location : [0]},
        {name : "wN", location : [0]},
        {name : "wP", location : [0]},
        {name : "wP1", location : [0]},
    ],
    change_pieceInfo(piece){
        console.log("changed pieceinfo")
        set((state)=>({pieceinfo : piece}))
    },
    dot : {
        target : "",
        location : []
    },
    change_dot(dot){
        set((state)=>({dot : dot}))
    },
    dice : 1,
    change_dice(dice){
        set((state)=>({dice : dice}))
    }
})));



const Game = ()=>{
    const [time, setTime] = useState(0);


    // for join Room
    // router, room Id value
    const router = useRouter();
    const { room } = router.query;
    // Connect socket
    const [socket, setSocket] = useState("")
    useEffect(()=>{
        setSocket(socketio.connect("http://192.168.0.150:3002"))
    }, [])
    // join room
    useEffect(()=>{ 
        if(room && socket){
            console.log("방 입장")
            socket.emit("joinRoom", {title:room});
        }
    }, [socket])


    // 유저 데이터
    const [me, setMe] = useState({
        name : "me",
        lvl : 1,
        rating : 1000,
        win_lose : [100, 100]
    })
    const [opp, setOpp] = useState({
        name : "opp",
        lvl : 1,
        rating : 1000,
        win_lose : [101, 100]
    })

    return (
        <>
            <Timer time={time} settime={(t)=>{setTime(t)}}/>
            <section className="user-section">
                <User user={me} me={"usr_me"}/>
                <User user={opp} me={"usr_opp"}/>
            </section>
            <Board 
                store = {useStore}
                socket={socket} 
            />
            <Dice store={useStore}/>

            <style jsx>{Style}</style>
        </>
    );
}


export default Game
