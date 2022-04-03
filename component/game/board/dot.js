import Image from "next/image";

const Dot = (props)=>{
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
    const {dot, pieceinfo, change_pieceInfo, change_dot, change_dice} = props.store()
    const Click = ()=>{
        let _dot = {...dot}
        if(_dot.location[0] == 6 && _dot.location[1] == 6) _dot.location = [1]
        let _pieceinfo = [...pieceinfo]
        for(var i = 0; i < 10; i++){
            if(_dot.target == _pieceinfo[i].name){
                _pieceinfo[i].location = _dot.location;
            }
        }
        _dot.target = ""
        _dot.location = []
        change_pieceInfo(_pieceinfo)
        change_dot(_dot)
        change_dice(-2)
    }

    return (
        <Image onClick={()=>{Click()}} className="dot" src={"/dot.svg"} width="20" height="20" />
    )
}

export default Dot;