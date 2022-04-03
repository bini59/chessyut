import Piece from "./piece";
import Dot from "./dot";

const Plate = (props)=>{
    // props : {
    //     store
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
    let B = []
    for(var i = 0; i < 7; i++){
        B.push([0,0,0,0,0,0,0,0])
        for(var j = 0; j < 8; j++){
            if(i == 0 || j == 0 || j == 7) B[i][j] = 5;
            else if(i == 1 || j == 1 || j == 6) B[i][j] = 1;
            else if(i == j) B[i][j] = 1;
        }
    }

    const {pieceinfo, dot} = props.store();

    let board = B.map((R, ri)=>{
        let row = R.map((I, iI)=>{
            // piece있으면 정해주기
            var content = [];
            for(var i = 0; i < 10; i++){
                if(pieceinfo[i].location.length != 1){
                    if(ri == pieceinfo[i].location[0] && iI == pieceinfo[i].location[1]){
                        content.push(<Piece key={"Piece"+ri+iI} name={pieceinfo[i].name} store={props.store}/>)
                    }
                }
            }
            if(dot.location.length == 2){
                if(ri == dot.location[0] && iI == dot.location[1]){
                    content.push(<Dot key={"dot"+ri+iI} store={props.store}/>)
                }
            }
            return(
                <td 
                    key={ri*10+iI} 
                    className={((!(ri%2)||(iI%2))&&(!(iI%2)||(ri%2)) ? "light": "dark")+(I>0 ? ((I < 5) ? " use-normal": " use-knight")  : " not-use")} 
                >                    
                    {content}
                </td>
            )
        })
        return(
            <tr key={ri*100}>{row}</tr>
        )
    })
    return(
        <section className="board">
            <table className="chess-board">
                <tbody>{board}</tbody>
            </table>
        </section>
    )
}

export default Plate;