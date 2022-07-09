import React, { useEffect, useState, useRef } from "react";

function Timer(){

    // const [time, setTime] = useState(0)
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    // const [flag, setFlag] = useState(false);
    const flag = useRef(false);
    const userTime = useRef(0);
    const interval = useRef(null);
    const Clock = () => {
        let copySecond = (second == 60 ? 0 : second)
        
        return <div>
            {String(minute).padStart(2, '0')} : {String(copySecond).padStart(2, '0')}
            <br/>
            {minute} 분 {copySecond}초<br/>{userTime.current}초
        </div>
    }

    function handleMinuteChange(event){
        setMinute(Number(event.target.value))
    }
    function handleSecondChange(event){
        setSecond(Number(event.target.value))
    }
    function handleSubmit(event){
        event.preventDefault();
        console.log(minute + "분 " + second + "초")
        // setTime(minute*60 + second)
        userTime.current = minute * 60 + second;
        console.log(userTime.current)
        starting();
        
    }

    function starting() {
        useEffect(()=>{
            console.log(flag.current)
            interval.startTimer = setInterval(()=>{
                    userTime.current -= 1;
                    setSecond(userTime.current % 60);
                    setMinute(Math.floor(userTime.current / 60));
            }, 1000)
            return () => clearInterval(interval.startTimer);
        }, [])
    }


    useEffect(()=>{
        if(userTime.current <= 0){
            clearInterval(interval.startTimer);
            console.log("타이머 종료")
        }
        flag.current = false;
    }, [second])
    return <>
        <Clock></Clock>
        <form >
            <label>Select a time : </label>
            <input name='minute' type = "number" placeholder="min" min='0' max='59' onChange={handleMinuteChange}></input>
            <input name='second' type = "number" placeholder="sec" min='0' max='59' onChange={handleSecondChange}></input>
            {flag.current == false?<button onClick={handleSubmit} type="submit">START</button>:<></>}
        </form>
    </>

}


export default Timer;