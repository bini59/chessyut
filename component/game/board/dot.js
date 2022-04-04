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
        let loc = [..._dot.location]
        if(props.knight > 0){
            loc = loc[props.knight-1];
        }
        if(loc[0] == 6 && loc[1] == 6) {
            loc = [1]
            if(_dot.target[0][1] == "K"){
                props.setKing(true)
            }
        }
        let _pieceinfo = [...pieceinfo]
        for(var i = 0; i < 10; i++){
            for(var j = 0; j < _dot.target.length; j++){
                if(_dot.target[j] == _pieceinfo[i].name){
                    _pieceinfo[i].location = loc;
                    break;
                }
            }
        }
        for(var i = 0; i < 10; i++){
            if((pieceinfo[i].location[0] == dot.location[0])&&(pieceinfo[i].location[1] == dot.location[1])){
                if(i > 5){
                    _pieceinfo[i].location = [0];
                }
            }
        }
        _dot.target = ""
        _dot.location = []
        change_pieceInfo(_pieceinfo)
        change_dot(_dot)
        change_dice(-2)
    }

    const dotpng = ()=>{
        let img = "/dot.png"
        for(var i = 0; i < 10; i++){
            if((pieceinfo[i].location[0] == dot.location[0])&&(pieceinfo[i].location[1] == dot.location[1])){
                if(i > 5){
                    img = "/kill.png"
                }
                else{
                    img = "/combine.png"
                }
            }
        }

        return img
    }


    return (
        <Image onClick={()=>{Click()}} className="dot" src={dotpng()} layout="fill" />
    )
}

export default Dot;