import Piece from "./piece";

const PieceRoom = (props)=>{
    // props : {
    //     store : zustand
    //     camp : String
    // }
    // store : {
    //     pieceinfo : Obejct Array[],
    //     change_pieceInfo : function()
    // }
    // pieceinfo : {
    //     name : String, // piece name
    //     location : int Array[2] // piece state, [0] : wait/ [1] : arrive/ [x, y] : in plate
    // }
    // dot : {
    //     target : String,
    //     location : int Array[2]        
    // }
    let range = [props.camp == "me" ? 0 : 5, props.camp == "me" ? 5 : 10]
    const {pieceinfo} = props.store();

    const notArr = pieceinfo.map((p, i)=>{
        if(p.location.length == 1 && (i >= range[0]) && (i < range[1])){
            if(!p.location[0]){
               return(
                    <div key={"mypieceNotArr"+i} className="pieceWait">
                        <Piece name={p.name} store={props.store}/>
                    </div>
                )
            }
        }
        return (
            <span key = {"mypieceNotArr"+i}></span>
        )
    });
    const Arr = pieceinfo.map((p, i)=>{
        if(p.location.length == 1 && (i >= range[0]) && (i < range[1])){
            if(p.location[0]){
                return <div key={"mypieceArr"+i} className="pieceWait"><Piece name={p.name} store={props.store}/></div>
            }
        }
        return(
            <span key = {"mypieceArr"+i}></span>
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

export default PieceRoom;