import React  from 'react';
import PropTypes from 'prop-types';

function CountryBrief ( { flag , nationName , population , region , capital } ) {
    return(
    <>    
        <article className='rounded-md lightMode__shadow cursor-pointer country__briefIntro--hover border-2 dark:bg-dark-gray dark:shadow-none dark:border-dark-gray'>
            <figure className='flag shadow'>
                <img src={flag} alt="" className='rounded-t size-full absolute top-0 left-0 object-cover'/>
            </figure>
            <div className='px-6 pt-6 pb-11 dark:text-white'>
                <h1 className='text-lg font-extrabold mb-4 text-ellipsis overflow-hidden xs:whitespace-nowrap' title={nationName}>{nationName}</h1>
                <p className='text-sm font-semibold mb-2'>Population: <span className='font-normal'>{population}</span></p>
                <p className='text-sm font-semibold mb-2'>Region: <span className='font-normal'>{region}</span></p>
                <p className='text-sm font-semibold'>Capital: <span className='font-normal'>{capital}</span></p>
            </div>
        </article>
    </>
    )
}


// 設定 flag, nationName, population, region, capital 變數的型別
CountryBrief.propTypes = {
    flag: PropTypes.string.isRequired,
    nationName: PropTypes.string.isRequired,
    population: PropTypes.oneOfType( [ PropTypes.number , PropTypes.string ] ).isRequired,
    region: PropTypes.string.isRequired,
    capital: PropTypes.string.isRequired,
}

export default CountryBrief;