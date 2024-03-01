import React , { useState , useEffect } from 'react';
import { ReactComponent as LeftArrow } from '../images/call-made.svg';
import CountryDetail from '../components/CountryInfo/CountryDetail';

function Country(){
    // const urlCountry = 'https://restcountries.com/v3.1/name/taiwan';
    const [ detailData , setDetailData ] = useState([]);

    // 將數字千分位區分
    const numberComma = ( num ) => {
        let comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
        return String(num).replace( comma , ',' );
    }

    const fetchCountryDetailData = async () => {
        try{
            const response = await fetch('https://restcountries.com/v3.1/name/belgium?fullText=true');
            let data = await response.json();
            data = data[0];
            
            console.log( Object.values(data.borders).map((border) => border) );

            const countryDetailData = {
                "flag": data.flags.svg,
                "nationName": data.name.common,
                "nativeName": Object.values(data.name.nativeName)[0].common,
                "population": numberComma(data.population),
                "region": data.region,
                "subregion": data.subregion,
                "capital": data.capital ? data.capital : "No capital",
                "toLevelDomain": data.tld[0],
                "currencies": Object.values(data.currencies).map((currency) => currency.name).join(", "),
                "languages": Object.values(data.languages).map((language) => language).join(", "),
                // "borders": Object.values(data.border).map()
            }
            
            //         "borders" : data.borders ? data.borders : "No border country",                                // 周圍國家
            setDetailData(countryDetailData);
        }
        catch( error ) { 
            console.log( error );
        }
    }

    useEffect( () => { 
        fetchCountryDetailData()
    },[]);

    return(
    <>
        <section className='max-w-7xl mx-auto mt-20 px-7 md:px-8 2xl:px-0'>
            <button className='flex gap-2.5 content-center justify-center rounded-sm py-1 px-6 shadow-button md:shadow-none md:hover:shadow-button md:border-0'>
                <LeftArrow /> 
                <p className='text-base leading-5'>Back</p>
            </button>

            <div className='mt-16 lg:flex lg:justify-between lg:gap-12 lg:items-center'>
                <img src={detailData.flag} alt="" className='block aspect-4/3 rounded-md max-h-80 lg:min-w-100 lg:max-h-100 '/>
                {/* 國家詳細的資料 */}
                <CountryDetail 
                    nationName={detailData.nationName}
                    nativeName={detailData.nativeName}
                    population={detailData.population}
                    region={detailData.region}
                    subRegion={detailData.subregion}
                    capital={detailData.capital}
                    topLevelDomain={detailData.toLevelDomain}
                    currencies={detailData.currencies} 
                    languages={detailData.languages}
                />
            </div>

        </section>
    </>
    )
}

export default Country;