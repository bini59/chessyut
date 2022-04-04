import Image from "next/image";



/*
    나이트는 이동시 옆칸이동체크 해주기.
    비숍은 +1해주기
    킹 도착할때 이벤트
    폰
    업기 이벤트 설정 해주기

*/

// knight 이동 계산 ㅇㅇ..
const knight = (loc, dice)=>{
    if(loc[0] == 0 || loc[0] == 7 || loc[1] == 0){
        let loc_2 = [...loc]
        if(loc[0] == 0 && loc[1] == 0)
            loc = [1, 1]
        else if(loc[0] == 0)
            loc[0] = 1
        else if(loc[1] == 0)
            loc[1] = 1
        else if(loc[1] == 7)
            loc[1] = 6

        
        loc_2[0] -= loc_2[1] < 7 ? dice : -dice;
        if(loc_2[0] < 0) {loc_2[1] -= loc_2[0]; loc_2[0] = 0;}
        if(loc_2[1] > 7){ loc_2[0] -= 7-loc_2[1]; loc_2[1] = 7;}
        if(loc_2[0] > 7){ loc_2[0] = 7;}
        return [loc, loc_2];
    }
    else{
        let loc_2 = []
        if(loc[0] != 7){
            loc_2 = [...loc]
            if(loc_2[0] == 1 && loc_2[1] == 1)
                loc_2 = [0, 0]
            else if(loc_2[0] == 1)
                loc_2[0] = 0
            else if(loc_2[1] == 1)
                loc_2[1] = 0
            else if(loc_2[1] == 6)
                loc_2[1] = 7
        }


        // calculate where dot locate
        if(loc[0] == loc[1]){loc[0] = loc[1] = (dice+loc[0] > 6 ? 6 : loc[0]+dice)}
        else {loc[0] -= loc[1] < 6 ? dice : -dice;}
        if(loc[0] < 1) {loc[1] += (1-loc[0]); loc[0] = 1;}
        if(loc[1] > 6){ loc[0] -= 6-loc[1]; loc[1] = 6;}
        if(loc[0] > 6){ loc[0] = 6;}

        return loc_2.length > 0 ? [loc_2, loc] : loc
    }
    

}

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

    const {pieceinfo, change_pieceInfo, dot, change_dot, dice} = props.store();

    const Click = (e)=>{


        let loc = []
        for(var i = 0; i < 10; i++){
            if(pieceinfo[i].name == props.name[0]){
                loc = [...pieceinfo[i].location]
                if(loc.length == 1){
                    if(loc[0]) return;
                    loc = [7, 1]
                }
                break;
            }
        }
        if (dot.location.length != 0){
            if(dot.target[0] == props.name[0]){
                change_dot({target : "", location : []})
                return;
            }
        }
        let B = dice
        if(props.name[0][1] == "R"){
            B = dice + 1
        }
        if(props.name[0][1] == "N"){
            loc = knight(loc, dice)
        }
        else{
            // calculate where dot locate
            if(loc[0] == loc[1]){loc[0] = loc[1] = (B+loc[0] > 6 ? 6 : loc[0]+B)}
            else {loc[0] -= loc[1] < 6 ? B : -B;}
            if(loc[0] < 1) {loc[1] += (1-loc[0]); loc[0] = 1;}
            if(loc[1] > 6){ loc[0] -= 6-loc[1]; loc[1] = 6;}
            if(loc[0] > 6){ loc[0] = 6;}
        }


        console.log("if clicked Piece "+loc)
        console.log(pieceinfo)


        // set Dot
        change_dot({
            target : props.name, 
            location : loc
        })
    }
    const Ponclick = (e)=>{
        console.log(props.name)
        if(props.King){
            console.log("King take one piece")
            let piece = [...pieceinfo]
            for(var i = 0; i < 10; i++)
                if(piece[i].name == props.name[0]) piece[i].location = [1];
            change_pieceInfo(piece);
            props.setKing(false)
        }
        else{
            if((dice > -2) && (props.name[0][0]=="b")){
                Click(e)
            }
            else{
                console.log("you can't move that")
            }
        }
    }


    return (
        <Image 
            onClick={Ponclick} 
            className="piece" 
            src={"/pieces/"+(props.name[0])+".png"}
            layout="fill" 
        />
    )

}


export default Piece;