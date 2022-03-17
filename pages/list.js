import Link from "next/link"
import { useState, useEffect } from "react";

const style = `
.Nav-container{
    background-color: #fff;
}

.create-btn-wrapper{
    width: 100%;
    display:flex;
    justify-content: flex-end;
}

nav{
    height: 40px;
    
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding : 0 15px 0 15px;
}
table{
    width: 100%;
    border-collapse: collapse;
}
table td, th{
    text-align: center;
    font-size: 14px;

    padding: 0.75rem;
    margin:0;
}
table th{
    vertical-align: bottom;
    border-top: 1px solid #dee2e6;
    border-bottom: 2px solid #dee2e6;
    font-weight: bold;
}
table td{
    border-bottom: 1px solid #dee2e6;
}
tbody tr:hover{
    background-color: #f1f1f1;
}

.container{
    width: 100%;
    margin: 0 auto 0 auto;

}

div.container{
    display:flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
}


.create-window{
    display:flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 200px;
    width: 60%;
    height: 170px;
    background-color: #fff;
    border-radius: 15px;
}
.create-btn{
    float: right;
}
.create-input-title{
    background-color: #c9c9c9;
    text-align: center;
    border-radius : 6px;
    border-style: solid;
    bodrer-width: 1px;
    bodrer-color: rgb(184, 184, 184);
    margin-left: 2%;

    width: 90%;
    font-size:20px;
}
.create-window-det-btn{
    margin-right: 10px;
}
.create-window div{
    display:flex;
    margin-bottom: 10px;
    margin-top: 10px;
    padding-left: 4%;
    padding-right: 4%;
}
.input-title-wrapper{
    align-items: center;
    font-size:20px;
}
.det-btn-wrapper{
    
    justify-content: flex-end;
}
.det-btn-wrapper button{
    width: 75px;
}

@media (max-width: 1200px){
    .input-title-wrapper, .create-input-title{
        font-size: 18px;
        margin-left: 1%;
    }
    .create-input-title{
        width: 85%;
    }
}
@media (max-width: 768px) {
    .input-title-wrapper, .create-input-title{
        font-size: 17px;
    }
    .create-input-title{
        width: 83%;
    }
}
// @media (max-width)

@media (min-width: 576px) {
    .container{
        max-width: 540px;
    }
    .create-window{
        max-width: 378px;
    }
}
@media (min-width: 768px) {
    .container{
        max-width: 720px;
    }
    .create-window{
        max-width: 504px;
    }
}
@media (min-width: 992px) {
    .container{
        max-width: 960px;
    }
    .create-window{
        max-width: 692px;
    }
}
@media (min-width: 1200px) {
    .container{
        max-width: 1040px;
    }
    .create-window{
        max-width: 728px;
    }
}
    
`

const fetchRoom = (room, set)=>{
    const recipeUrl = "http://192.168.1.21:3001/room";
    const requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(room)
    };
        //rendering Main
    fetch(recipeUrl, requestMetadata)
    .then(res => res.json())
    .then(json => set(JSON.parse(json)))

}


const Create = (props)=>{

    // 방 제목 결정해서 서버로 보내는 코드 필요
    // 이 createroom이 서버로 보내는 코드가 될것.
    // 했음
    const createRoom = ()=>{
        var title = document.getElementById("roominput").value;
        fetchRoom({title: title, np: 1},props.setRoom);

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

    useEffect(()=>{fetchRoom({}, setRoomlist);}, [])

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
                {showCreate ? <Create room={roomlist} setRoom={(e)=>{setRoomlist(e)}}removeWindow={()=>{setCreate(false)}} /> : ""}
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

            <style jsx>{style}</style>
        </>
    )
}



export default List;