import React , {useEffect, useState} from 'react';

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
        borderCountries,     // borders
    })
{
    const [ hasBorder , setHasBorder ] = useState(false);   // 判斷周圍是否有別的國家，先預設沒有false

    useEffect( () => {
        if( borderCountries ) setHasBorder(true);    
    },[borderCountries]);

    return(
    <>
    <section>
        <h1 className='text-2xl font-extrabold mt-11 mb-4 md:text-4xl md:mb-6 lg:mt-0'>{nationName}</h1>
        <section className='flex flex-wrap gap-y-8 gap-x-24 country__detailInfo text-sm leading-8 md:text-base md:leading-8 2xl:gap-x-32'>
            <div>
                <p>Native Name: <span className='ml-1'>{nativeName}</span></p>
                <p>Population: <span className='ml-1'>{population}</span></p>
                <p>Region: <span className='ml-1'>{region}</span></p>
                <p>Sub Region: <span className='ml-1'>{subRegion}</span></p>
                <p>Capital: <span className='ml-1'>{capital}</span></p>
            </div>

            <div>
                <p>Top Level Domain: <span className='ml-1'>{topLevelDomain}</span></p>
                <p>Currencies: <span className='ml-1'>{currencies}</span></p>
                <p>Language: <span className='ml-1'>{languages}</span></p>
            </div>
        </section>
    
        <section className='flex mb-16 mt-8 items-center gap-4 flex-wrap lg:mb-0'>
            <p className='text-base font-semibold leading-8'>Border Coutries:</p>
            <div className='flex flex-wrap gap-x-4 gap-y-3'>
                { hasBorder ?
                    borderCountries.map( ( borderCountry , index ) => (
                        <a href={`/country/${borderCountry}`} key={index}>
                            <button className='country__detailInfo-button dark:bg-dark-gray dark:shadow-none dark:border dark:border-dark-gray dark:hover:border-white'>
                                {borderCountry}
                            </button>
                        </a>
                    ))
                    : <p className=''>The surroundings have no country.</p>
                }
            </div>
        </section>
    </section>
    </>
    )
}

export default CountryDetail;