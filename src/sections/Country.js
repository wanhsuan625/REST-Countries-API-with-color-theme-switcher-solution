import React , { useState , useEffect } from 'react';
import { ReactComponent as BakcArrow } from '../images/backArrow.svg';
import CountryDetail from '../components/CountryInfo/CountryDetail';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

function Country(){
    const [ detailData , setDetailData ] = useState([]);
    const [ isLoading , setIsLoading ] = useState(true);     // 資料是否正在載入中
    const codeUrl = 'https://restcountries.com/v3.1/alpha/';

    // 將數字千分位區分
    const numberComma = ( num ) => {
        let comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
        return String(num).replace( comma , ',' );
    }

    // 將國家的code轉換成國家的名字
    const fetchCountryCode = async(borderCountryCode) => {
        try{
            const res = await fetch( codeUrl + borderCountryCode );
            const data = await res.json();

            return data[0].name.common;
        }
        catch(error){
            console.log(error);
        }
    }

    const fetchCountryDetailData = async (countryName) => {
        try{
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
            if(!response.ok) throw new Error("Not found any country.");

            let data = await response.json();
            data = data[0];

            // 確認是否有周圍國家
            let borderCountries = data.borders ? Object.values(data.borders) : null;
            
            if(borderCountries){
                // 將國家所專屬的code轉成國家名
                const promises = borderCountries.map( async(borderCountry) => {
                    return await fetchCountryCode(borderCountry);
                });
    
                borderCountries = await Promise.all(promises);
            }

            const countryDetailData = {
                "flag": data.flags.svg,
                "nationName": data.name.common,
                "nativeName": data.name.native ? Object.values(data.name.nativeName)[0].common : data.name.common,
                "population": numberComma(data.population),
                "region": data.region,
                "subregion": data.subregion ? data.subregion : 'No subregion',
                "capital": data.capital ? data.capital : "No capital",
                "topLevelDomain": data.tld ? data.tld[0] : 'No top level domain',
                "currencies": data.currencies ? Object.values(data.currencies).map((currency) => currency.name).join(", ") : "No currency",
                "languages": data.language ? Object.values(data.languages).map((language) => language).join(", ") : 'No language',
                "borders": borderCountries,
                "mapSite": data.maps.googleMaps,
            }
            setDetailData(countryDetailData);
            setIsLoading(false);
        }
        catch( error ) { 
            console.log( error );
        }
    }

    useEffect( () => {
        // 透過國家名稱來進行網頁的連結
        const urlParts = window.location.href.split('/');
        const countryName = urlParts[urlParts.length - 1].toLowerCase();

        fetchCountryDetailData(countryName);
    },[]);

    return(
    <>
        <section className='max-w-7xl mx-auto min-h-full pb-20 pt-32 px-7 md:px-8y 2xl:px-0 dark:text-white'>
            <button>
                <Link to={'/'} className='flex gap-2.5 items-center justify-center rounded-sm py-1 px-6 shadow-button md:shadow-none md:hover:shadow-button md:border-0 dark:bg-dark-gray'>
                    <BakcArrow className='size-4 dark:fill-white'/> 
                    <p className='text-base leading-5'>Back</p>
                </Link>
            </button>
            
            { isLoading ? <Loading /> :
                <div className='mt-16 lg:flex lg:justify-evenly lg:gap-24 lg:items-center xl:gap-40'>
                    <div className='relative aspect-4/3 cursor-pointer max-w-110 lg:max-w-120'>
                        <a href={detailData.mapSite} target="_blank" rel="noopener noreferrer" className='size-full'>
                            <img src={detailData.flag} alt="" className='size-full border-2 rounded-md object-fill'/>
                        </a>
                    </div>
                    {/* 國家詳細的資料 */}
                    <CountryDetail
                        nationName={detailData.nationName}
                        nativeName={detailData.nativeName}
                        population={detailData.population}
                        region={detailData.region}
                        subRegion={detailData.subregion}
                        capital={detailData.capital}
                        topLevelDomain={detailData.topLevelDomain}
                        currencies={detailData.currencies} 
                        languages={detailData.languages}
                        borderCountries={detailData.borders}
                    />
                </div>       
            }
        </section>
    </>
    )
}

export default Country;