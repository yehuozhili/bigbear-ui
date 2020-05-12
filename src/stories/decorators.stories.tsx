import React from 'react'

const darkwrapper =(storyFn:any)=>(
    <div style={{background:'black',display:'flex',justifyContent:'center',
    alignItems:'center',height:'5em'}}>
        {storyFn()}
    </div>
);
export default darkwrapper;

export const lightwrapper =(storyFn:any)=>(
    <div style={{background:'white',display:'flex',justifyContent:'center',
    alignItems:'center'}}>
        {storyFn()}
    </div>
);