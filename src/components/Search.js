import React , { useState , useRef } from 'react';
import searchImg from '../images/search.svg';
import close from '../images/close.svg';

function Search () {
    const [ isType , setIsType ] = useState(false);
    const searchInputRef = useRef(null);
    const urlName = 'https://restcountries.com/v3.1/name/';

    // 清除input內容，使用於叉叉圖片點選
    const clearInput = () => {
        if (searchInputRef.current) {
            searchInputRef.current.value = "";
            setIsType(false);
        }
    }

    useState( () => {
        const fetchName = async (name) => {
            try{
                const response = await fetch( urlName + name );
                const data = await response.json();

                console.log(data);
            }
            catch (error) { console.log( error ) }
        }
        fetchName("china");
    })

    return (
    <>
        <div className='max-w-120 md:w-120 shrink-0'>
            <input
                ref={searchInputRef}
                onInput={ () => {} }
                onChange={ (e) => { !e.target.value ? setIsType(false) : setIsType(true) } }    // 根據input是否有內容，來調整叉叉圖片的出現與否
                type="text"
                placeholder='Search for a country...'
                className='w-full max-w-120 mt-6 mb-10 h-12 lightMode__shadow rounded-md pl-18.5 py-3.5
                        md:my-12 md:w-120 md:h-14'/>
            
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

export default Search;