import React , { useState , useRef } from 'react';
import searchImg from '../../images/search.svg';
import close from '../../images/close.svg';
import PropTypes from 'prop-types';

function Search ( { onSearchChange } ) {
    const [ isType , setIsType ] = useState(false);         //  input 裡是否有文字
    const searchInputRef = useRef(null);

    // 清除input內容，使用於叉叉圖片點選
    const clearInput = () => {
        if (searchInputRef.current) {
            searchInputRef.current.value = "";
            setIsType(false);
            onSearchChange("");      // 要將 onSearchChange 改回空值，這樣打完叉叉，才會顯示回全部國家的畫面
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setIsType(!!value);
        onSearchChange(value);
    };

    return (
    <>
        <div className='max-w-120 md:w-120 shrink-0'>
            <input
                ref={searchInputRef}
                onChange={handleInputChange}
                type="text"
                placeholder='Search for a country...'
                className='w-full max-w-120 mt-6 mb-10 h-12 lightMode__shadow rounded-md pl-18.5 py-3.5
                        md:my-12 md:w-120 md:h-14 dark:bg-dark-gray dark:shadow-none dark:text-white'/>
            
            {/* 搜尋圖片 */}
            <img src={searchImg} alt="" className='cursor-text absolute top-10 left-8 md:top-17'/>
            
            {/* 刪除input的叉叉圖片 */}
            <img src={close} alt=""
                 className={`${ isType ? "inline" : 'hidden'} cursor-pointer absolute top-10 right-4 md:top-17 hover:scale-125`}
                 onClick={clearInput}/>
        </div>
    </>
    )
}

Search.propTypes = {
    onSearchChange: PropTypes.string
}

export default Search;