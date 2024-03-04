import React , { useState , useEffect } from 'react';
import CountryBrief from './CountryInfo/CountryBrief';
import Error from './Error';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function AllCountry ( { selectedRegion , searchInput } ) {
    const urlAll = 'https://restcountries.com/v3.1/all';
    const urlRegion = 'https://restcountries.com/v3.1/region/';
    const urlSearch = 'https://restcountries.com/v3.1/name/';
    const [ countryData , setCountryData ] = useState([]);
    const [ error , setError ] = useState(false);
    const [ isLoading , setIsLoading ] = useState(true);

    // 將數字千分位區分
    const numberComma = ( num ) => {
        let comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
        return String(num).replace( comma , ',' );
    }

    // 抓取各個國家的資料
    const fetchCountryBriefData = async (url) => {
        try{
            const response = await fetch(url);

            if ( !response.ok ){
                setError(true);
                throw new Error('Not found any country.');
            }

            const data = await response.json();
            
            // 載入首頁要的國家資料
            const allCountrySet = data.map( (dt , index) => ({
                    "id" : index,
                    "flag" : dt.flags.svg,                                 // 國旗連結
                    "nationName" : dt.name.common,                         // 國名
                    "population" : numberComma(dt.population),             // 總人口數
                    "region" : dt.region,                                  // 洲
                    "capital" : dt.capital ? dt.capital : 'No capital',    // 首都
            }));

            // 根據國名做排序
            allCountrySet.sort((a, b) => a.nationName.localeCompare(b.nationName));
            
            setCountryData(allCountrySet);
            setError(false);
            setIsLoading(false);
        }
        catch( error ) { 
            setError(true);
        }
    }

    // 根據 region 傳回來的資料去取得國家
    useEffect( () => {
        setIsLoading(true);

        fetchCountryBriefData( selectedRegion === 'All Countries' ? urlAll : `${urlRegion}${selectedRegion}` );
        
        setIsLoading(false);
    }, [selectedRegion]);


    // 根據 search 所輸入的值去取得國家的資料
    useEffect(() => {
        if( searchInput !== "" ) {
            fetchCountryBriefData( urlSearch + searchInput );
        } 
        else {
            fetchCountryBriefData(urlAll);
            setError(false);
        }
    }, [searchInput]);

    return (
    <>
        { isLoading ? <Loading/> : 
            
            // 若error為true，出現Error畫面；反之則出現搜尋所得資料
            error ?          
                <Error/> :
                <section className='grid px-10 pb-20 gap-y-10 xs:grid-cols-2 xs:px-0 xs:gap-x-7 md:grid-cols-3 lg:gap-x-15 xl:grid-cols-4 lg:gap-y-19 2xl:gap-x-19'>
                    { countryData.map( ( country ) => (
                        <Link key={country.id} to={`/country/${country.nationName}`}>
                            <CountryBrief 
                                flag={country.flag}
                                nationName={country.nationName}
                                population={country.population}
                                region={country.region}
                                capital={country.capital}    
                            />
                        </Link>
                    ))}
                </section>
        }
    </>
    )
}

export default AllCountry;