import React , { useState } from 'react';
import Category from '../components/Category';
import AllCountry from '../components/AllCountry';
import Search from '../components/Search';

function HomePage () {
    const [ selectedRegion, setSelectedRegion ] = useState('All Countries');
    const [ searchInput, setSearchInput ] = useState('');
    
    const handleFilterChange = (selectedOption) => { setSelectedRegion(selectedOption) };
    const handleSearchChange = (value) => { setSearchInput(value) };

    return (
    <>
        <section className='max-w-7xl mt-24 mx-auto px-4 md:px-8 xl:px-10 2xl:px-0'>
            <div className='md:flex md:justify-between mb-8'>
                <Search onSearchChange={handleSearchChange}/>
                
                {/* 根據region做分類 */}
                <Category onFilterChange={handleFilterChange}/>
            </div>
            
            <AllCountry selectedRegion={selectedRegion} searchInput={searchInput}/>
        </section>
    </>
    )
}

export default HomePage;