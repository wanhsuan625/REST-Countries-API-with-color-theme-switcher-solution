import React , {useEffect, useState} from 'react';
// import { Link } from 'react-router-dom';

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
    const [ hasBorder , setHasBorder ] = useState(true);

    // 周圍沒有國家
    // console.log(borderCountries);

    useEffect( () => {
        if(borderCountries === null){
            setHasBorder(false);
            console.log(hasBorder);
        }    
    },[]);

    return(
    <>
    <section>
        <h1 className='text-2xl font-extrabold mt-11 mb-4 md:text-4xl md:mb-6 lg:mt-0'>{nationName}</h1>
        <section className='flex flex-wrap gap-y-8 gap-x-24 country__detailInfo text-sm leading-8 md:text-base md:leading-8 2xl:gap-x-36'>
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
    
        <section className='flex mb-4 mt-8 items-center gap-4 flex-wrap'>
            <p className='text-base font-semibold leading-8'>Border Coutries:</p>
            <div className='flex flex-wrap gap-x-4 gap-y-3'>
                { hasBorder ?
                    borderCountries.map( ( borderCountry , index ) => (
                        <button key={index} className='country__detailInfo-button'>
                            {borderCountry}
                        </button>
                    ))
                    : <p className=''>No border country</p>
                }
            </div>
        </section>
    </section>
    </>
    )
}

export default CountryDetail;