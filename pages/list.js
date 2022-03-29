import Link from "next/link"
import { useState, useEffect } from "react";

import socketio from "socket.io-client";

import Style from "./style/list";

const Create = (props)=>{

    // 방 제목 결정해서 서버로 보내는 코드 필요
    // 이 createroom이 서버로 보내는 코드가 될것.
    // 했음
    const createRoom = ()=>{
        var title = document.getElementById("roominput").value;

        // socket으로 방 제목을 보내기
        props.socket.emit("updateRoom", {title: title, np: 0});
        props.removeWindow();
    }

    return(
        <section className="create-window">
            <div>
                방 생성하기
            </div>
            <div className="input-title-wrapper">
                <span>제목 : </span>
                <input id="roominput" className="create-input-title" placeholder="제목을 입력해주세요" onKeyDown={(e)=>{if(e.key==="Enter"){createRoom()}}}/>
            </div>
            <div className="det-btn-wrapper">
                <button className="create-window-det-btn" onClick={createRoom}>만들기</button>
                <button className="create-window-det-btn" onClick={()=>{props.removeWindow()}}>취소</button>
            </div>
        </section>
    );
}



const List = ()=>{
    const [showCreate, setCreate] = useState(false)
    const [roomlist, setRoomlist] = useState([])

    /*
        임시로 만들어보는 코드
        useEffect로 socket에 연결해보기


    */
    
    const [socket, setSocket] = useState("")
    // 소켓 연결
    useEffect(()=>{
        setSocket(socketio.connect("http://localhost:3002"))
    }, [])
    useEffect(()=>{
        if(socket){
            console.log(socket);
            socket.on("updateRoom", (data)=>{
                setRoomlist(data.room)
            })
        }
    }, [socket]);
    



    const navbar = (
        <div className="Nav-container">
            <nav className="nav container">
                <div>
                    <Link href="/list"><a>Chess</a></Link>
                </div>
                <div className="profile">nickname</div>
            </nav>
        </div>
    )


    const lists = roomlist.map((r, i)=>{
        return(
            <Link href="/game" key={"room"+i}>
                <tr><td>{i+1}</td><td>{r.title}</td><td>{r.np}/2</td></tr>
            </Link>
        )
    })

    return(
        <>
            {navbar}
            <div className="container">
                {/* 
                    test용 코드로 setRoomlist 넣어줌
                    위쪽 서버로 부터 방 정보 갱신받기 하면,
                    setRoomlist 삭제할것.

                 */}
                {showCreate ? <Create socket={socket} room={roomlist} removeWindow={()=>{setCreate(false)}} /> : ""}
                <div className="create-btn-wrapper">
                    <button className="create-btn" onClick={()=>{setCreate(!showCreate)}}>방 생성하기</button>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th className="first-item" style={{width: "14%"}}>#</th>
                            <th className="second-item" style={{width: "60%"}}>T</th>
                            <th className="third-item" style={{width: "26%"}}>사람</th>
                        </tr>
                    </thead>
                    <tbody>{lists}</tbody>
                </table>
            </div>

            <style jsx>{Style}</style>
        </>
    )
}



export default List;