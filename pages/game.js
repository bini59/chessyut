import { useState } from "react";

import Timer from "./component/timer";

const style = `
    .user-section{
        display: flex;
        justify-content: space-between;    
    }
    .user-info{
        display:flex;


        width: 300px;
        height: 100px;
        background-color: #fff;        
    }

    #usr-me{
        border-bottom-right-radius: 10px;
    }
    #usr-opp{
        border-bottom-left-radius: 10px;
    }
    .user-info img{
        width : 100px;
        height: 100px;
    }
    .user-info .usr-data{
        width: 200px;
        height: 100px;

        text-overflow: ellipsis;
    }

    .user-info .usr-data .usr-data-text{
        padding: 6px 10px 6px 10px;
    }

    .timer{
        position: absolute;
        top: 5px;
        left: 48vw;
        font-size: 3rem;
    }

`

const User = ()=>{
    return (
        <section className="user-section">
            <div className="user-info" id="usr-me">
                <img className="usr-image" />
                <div className="usr-data">
                    <div className="usr-1 usr-data-text">
                        <span className="lvl" style={{"marginRight":"10px"}}>Lv.0</span>
                        <span className="usr-name">me</span>
                    </div>
                    <div className="usr-2 usr-data-text">
                        <span className="usr-rating">Rating : 1000</span>
                    </div>
                    <div className="usr-3 usr-data-text">
                        <span className="usr-win" style={{"marginRight":"10px"}}>승 : 0</span>
                        <span className="usr-lose">패 : 0</span>
                    </div>
                </div>

            </div> 
            <div className="user-info" id="usr-opp">
                <img className="usr-image" />
                <div className="usr-data">
                    <div className="usr-1 usr-data-text">
                        <span className="lvl" style={{"marginRight":"10px"}}>Lv.0</span>
                        <span className="usr-name">opp</span>
                    </div>
                    <div className="usr-2 usr-data-text">
                        <span className="usr-rating">Rating : 1000</span>
                    </div>
                    <div className="usr-3 usr-data-text">
                        <span className="usr-win" style={{"marginRight":"10px"}}>승 : 0</span>
                        <span className="usr-lose">패 : 0</span>
                    </div>
                </div>
            </div> 
        </section>
    )
}

const Game = ()=>{
    const [time, setTime] = useState(0);


    return (
        <>
            <Timer time={time} settime={(t)=>{setTime(t)}}/>
            <User/>

            {/* test timer button */}
            {/* <button onClick={()=>{setTime(10)}}>tt</button>
            <button onClick={()=>{setTime(5)}}>tt</button> */}

            <style jsx>{style}</style>
        </>
    );
}


export default Game
