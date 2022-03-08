import { useEffect } from "react";

const Timer = (props)=>{
    let time = props.time;
    const setTime = props.settime;

    useEffect(()=>{
        // test use Effect
        // console.log("Timer : useEffect Test");
        const count = setInterval(()=>{
            if(time > 0) setTime(time-1);
            else clearInterval(count);
            
            // test timer interval
            // console.log("Timer : Interval test");
        }, 1000)
        return ()=>clearInterval(count);
    }, [time])

    return(
        <section className="timer">
            <span className="time">{time}</span>
        </section>
    )
}

export default Timer;