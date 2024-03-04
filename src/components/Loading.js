import React from 'react';
import loadingImg from '../images/loadingImg.gif';

function Loading() {
    return (
    <>
        <div className='flex items-center space-x-3.5 justify-center'>
            <img src={loadingImg} className='size-20'/>
            <span className="loader w-40"></span>
        </div>
    </>
    )
}

export default Loading;
