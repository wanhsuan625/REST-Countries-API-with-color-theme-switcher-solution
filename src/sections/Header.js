import React , { useState } from 'react';
import moon from '../images/moon.png';
import sun from '../images/sun.png';

function Header () {
    const [ isDarkMode , setIsDarkMode ] = useState(false);

    const changeColorModeHandle = () => {
        if(isDarkMode) document.documentElement.classList.remove('dark');
        else document.documentElement.classList.add('dark');
        
        setIsDarkMode(!isDarkMode);
    };
    
    return (
    <>
    <div className='fixed w-full shadow top-0 z-[1] bg-white dark:bg-dark-gray dark:text-white dark:shadow-md dark:shadow-slate-800'>
        <header className='max-w-7xl mx-auto py-7.5 px-4 font-extrabold flex justify-between items-center md:px-10 2xl:px-0'>
            {/* logo zone */}
            <a href="/">
                <p className='md:text-2xl'>Where in the world?</p>
            </a>
            
            {/* dark-light mode switch button */}
            <input type='checkbox' id='modeSwitch' className='h-0 w-0 invisible' checked={isDarkMode} onClick={changeColorModeHandle}/>
            <label htmlFor="modeSwitch" className='toggle'>
                <img src={moon} alt="" className='w-4 absolute top-1 left-1.5'/>
                <img src={sun} alt="" className='w-4.5 absolute top-1 right-1.5'/>
            </label>
        </header>
    </div>
    </>
    )
}

export default Header;