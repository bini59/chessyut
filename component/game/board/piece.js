import Image from "next/image";

const Piece = (props)=>{
    // props : {
    //     store : zustand
    //     name : String
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

    const {pieceinfo, dot, change_dot, dice} = props.store();

    const Click = (e)=>{


        let loc = []
        for(var i = 0; i < 10; i++){
            if(pieceinfo[i].name == props.name){
                loc = [...pieceinfo[i].location]
                if(loc.length == 1){
                    loc = [7, 1]
                }
                break;
            }
        }
        if (dot.location.length != 0){
            if(dot.target == props.name){
                change_dot({target : "", location : []})
                return;
            }
        }
        // calculate where dot locate
        if(loc[0] == loc[1]){loc[0] = loc[1] = (dice+loc[0] > 6 ? 6 : loc[0]+dice)}
        else {loc[0] -= loc[1] < 6 ? dice : -dice;}
        if(loc[0] < 1) {loc[1] += (1-loc[0]); loc[0] = 1;}
        if(loc[1] > 6){ loc[0] -= 6-loc[1]; loc[1] = 6;}
        if(loc[0] > 6){ loc[0] = 6;}

        console.log("if clicked Piece "+loc)
        console.log(pieceinfo)


        // set Dot
        change_dot({
            target : props.name, 
            location : loc
        })
    }
    return (
        <Image 
            onClick={(e)=>{(dice > -2) && (props.name[0]=="w") ? Click(e) : console.log("you can't control that")}} 
            className="piece" 
            src={"/pieces/"+(props.name)+".png"}
            layout="fill" 
        />
    )

}


export default Piece;