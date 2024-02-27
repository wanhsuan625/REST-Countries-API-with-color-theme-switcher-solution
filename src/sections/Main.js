import React , { useState } from 'react';
import Category from '../components/Category';
import AllCountry from '../components/AllCountry';
import Search from '../components/Search';

function Main () {
    const [ selectedRegion, setSelectedRegion ] = useState('All Countries');
    const handleFilterChange = (selectedOption) => { setSelectedRegion(selectedOption) };

    return (
    <>
        <section className='max-w-7xl mx-auto px-4 md:px-8 xl:px-10 2xl:px-0'>
            <div className='md:flex md:justify-between mb-8'>
                <Search />
                
                {/* 根據region做分類 */}
                <Category onFilterChange={handleFilterChange}/>
            </div>

            <AllCountry selectedRegion={selectedRegion}/>
        </section>
    </>
    )
}

export default Main;