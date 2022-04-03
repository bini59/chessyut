import { useEffect } from "react";


import PieceRoom from "./board/pieceRoom";
import Plate from "./board/plate";
const Board = (props)=>{
    // 콘솔 출력용
    // useEffect(()=>{
    //     console.log(props)
    // })

    // props : {
    //     socket : socket,
    //     room : String // Game room name
    //     picsInfo : Object Array[],
    //     setPics : function(),
    //     dice : int,
    // }

    // picsInfo = [
    //     {
    //         name : Stiring // target Piece
    //         location : int Array[2], bool // true : arrive, false : waiting, int Array[2] : in Board
    //     }
    // ]

    // const piecesInfo = props.picsInfo


    // socket으로 이동정보 받아오기.
    // useEffect(()=>{
    //     if(props.socket){
    //         props.socket.off("updatePics")
    //         props.socket.on("updatePics", data=>{
    //             console.log("on으로 받았음")
    //             let pics = "w"+data.target[1]+(data.target[2] ? data.target[2] : "");
    //             setTarget(pics)
    //             moveOpp(data.loc, pics);
    //         })
    //     }
    // }, [props.socket])
    


    return (

        <div className="Game">
            <PieceRoom camp={"me"} store={props.store} />
            <Plate store={props.store} />
            <PieceRoom camp={"opp"} store={props.store} />
        </div>
        
    );
}



export default Board