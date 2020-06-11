import React, { useState, useMemo } from 'react';


interface ProgressType{
    /** 传入数字*/
    count:number,
      /** 是否要末尾计数文本*/
    countNumber?:boolean;
      /** 进度条高度*/
    height?:number;
}

function Progress(props:ProgressType){
    const {count,countNumber,height}=props;
    const [state,setState]=useState(0)
    useMemo(()=>{
        if(count<0){
            setState(0)
        }else if(count>100){
            setState(100)
        }else{
            setState(count)
        }
    },[count])

    return(
        <div className='bigbear-progress-wrapper'>
           
            <div className='bigbear-progress-bar'>
                <div className='bigbear-progress-inner' style={{width:`${state}%`,height:`${height?height:8}px`}}>
                </div>
            </div>
            {countNumber&&<div className="bigbear-progress-number" style={{lineHeight:`${height?height:8}px`}}>{state}%</div>}
        </div>
    )
}

Progress.defaultProps={
    countNumber:true
}



export default Progress;