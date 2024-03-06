import React , { useState , useEffect } from 'react';
import { ReactComponent as Arrow } from '../images/arrow.svg';
import PropTypes from 'prop-types';

function Category ( { onFilterChange } ) {
    const [ categories, setCategories ] = useState([]);
    const [ isClick , setIsClick ] = useState(false);
    const [ filterOption , setFilterOption ] = useState('Filter by Region');

    const handleClick = (e) => {
        e.stopPropagation();
        setIsClick(!isClick);
    };

    // 將所選定的region顯示在選項框中
    const handleFilter = (option) => {
        setFilterOption(option);
        onFilterChange(option);
    };

    useEffect ( () => {
        const fetchCategory = async () => {
            try {
                const response = await fetch( 'https://restcountries.com/v3.1/all?fields=region' );
                const data = await response.json();
                
                // 先取出總共有哪些洲
                const allRegion = new Set(data.map((dt) => dt.region));
                // 篩選掉重複的
                const categoriesArr = Array.from(allRegion);
                setCategories(categoriesArr.sort());
            }
            catch ( error ) { console.log(error) }
        }
        fetchCategory();
    } , [] );

    useEffect ( () => {
        const filterBox = document.getElementById("filterBox");
        const categoryBox = document.getElementById("categoryBox");

        const handleOutsideClick = (e) => {
            // 排除 filterBox 和 categoryBox 的範圍
            if ( !filterBox.contains(e.target) && !categoryBox.contains(e.target) ) setIsClick(false);
        };

        // 點選特定範圍外的任一點，都可以將category選單隱藏
        window.addEventListener( "mousedown", handleOutsideClick );
    } , [] );

    return (
    <>
        <section className='w-50 md:mt-12 dark:text-white'>
            <div id='filterBox' onClick={ handleClick } className='py-3.5 pl-6 pr-5 flex justify-between items-center rounded-md lightMode__shadow cursor-pointer mb-1 dark:shadow-none dark:bg-dark-gray'>
                <span className='font-semibold' >{filterOption}</span>
                <Arrow className={`h-2.5 ${ isClick ? 'rotate-180': '' } transition-all duration-300 dark:fill-white`}/>
            </div>

            <ul id='categoryBox' onClick={ handleClick } className={`${ isClick ? 'absolute' : 'hidden'} w-full bg-white lightMode__shadow rounded-md z-10 dark:bg-dark-gray dark:shadow-none`}>
                { categories.map( ( category , index ) => (
                    <li key={index}
                        className='font-semibold cursor-pointer px-6 py-1 hover:bg-light-gray first:rounded-t-md first:pt-2 dark:hover:bg-slate-500'
                        onClick={ () => { handleFilter(category) } }
                    >
                        {category}
                    </li>
                ))}
                <li onClick={ () => { handleFilter( 'All Countries' ) } } className='font-semibold cursor-pointer px-6 py-1 hover:bg-light-gray rounded-b-md pb-2 dark:hover:bg-slate-500'>All Countries</li>
            </ul>
        </section>
    </>
    )
}


// 設定 onFilterChange 變數的型別
Category.propTypes = {
    onFilterChange: PropTypes.string
}

export default Category;