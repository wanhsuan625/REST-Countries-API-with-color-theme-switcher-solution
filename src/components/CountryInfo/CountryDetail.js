import React from 'react';
// import PropTypes from 'prop-types';

function CountryDetail ( 
    {   nationName,          // name - common
        nativeName,          // name - native - common
        population,          // population
        region,              // region
        subRegion,           // subregion
        capital,             // capital
        topLevelDomain,      // tld
        currencies,          // currencies 
        languages,           // languages
        // borderCountries,     // borders
    }
) {
    return(
    <>
    <section>
        <h1 className='text-2xl font-extrabold mt-11 mb-4 md:text-4xl md:mb-6 lg:mt-0'>{nationName}</h1>
        <section className='flex flex-wrap gap-y-8 gap-x-24 country__detailInfo text-sm leading-8 md:text-base md:leading-8 2xl:gap-x-36'>
            <div>
                <p>Native Name: <span>{nativeName}</span></p>
                <p>Population: <span>{population}</span></p>
                <p>Region: <span>{region}</span></p>
                <p>Sub Region: <span>{subRegion}</span></p>
                <p>Capital: <span>{capital}</span></p>
            </div>

            <div>
                <p>Top Level Domain: <span>{topLevelDomain}</span></p>
                <p>Currencies: <span>{currencies}</span></p>
                <p>Language: <span>{languages}</span></p>
            </div>
        </section>
    
        <section>
            <p className='text-base font-semibold leading-8 mb-4 mt-8'>Border Coutries:</p>
            {/* <div className='flex flex-wrap gap-x-2.5 gap-y-3'>
                <button className='country__detailInfo-button'>France</button>
                <button className='country__detailInfo-button'>Germany</button>
                <button className='country__detailInfo-button'>Netherlands</button>
            </div> */}
        </section>
    </section>
    </>
    )
}

export default CountryDetail;