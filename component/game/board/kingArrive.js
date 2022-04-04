import Piece from "./piece";

const ArriveKing = (props)=>{
    // props : {
    //     store
    // }
    // store : {
    //     pieceinfo : Obejct Array[],
    //     change_pieceInfo : function()
    //     dot : Object
    // }
    // pieceinfo : {
    //     name : String, // piece name
    //     location : int Array[2] // piece state, [0] : wait/ [1] : arrive/ [x, y] : in plate
    // }
    // dot : {
    //     target : String,
    //     location : int Array[2]        
    // }
    const {pieceinfo} = props.store();
    console.log(pieceinfo)
    const notArr = pieceinfo.map((p, i)=>{
        if(p.location.length == 1){
            if(!p.location[0] && p.name[0][0] == "b"){
               return(
                    <div key={"KingpieceNotArr"+i} className="pieceWait">
                        <Piece name={p.name} store={props.store} King={true} setKing={props.setKing}/>
                    </div>
                )
            }
        }
        return (
            <span key = {"KingpieceNotArr"+i}></span>
        )
    });


    return(
        <section className="king-arrive-select">
            <div>도착시킬 말을 선택해주세요</div>
            <div className="piece-box notArr">{notArr}</div>
        </section>
    )
}

export default ArriveKing