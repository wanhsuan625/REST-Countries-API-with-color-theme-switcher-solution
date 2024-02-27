import React , { useState , useEffect } from 'react';
import CountryBrief from './CountryBrief';
import PropTypes from 'prop-types';
import Error from './Error';

function AllCountry ( { selectedRegion , searchInput } ) {
    const urlAll = 'https://restcountries.com/v3.1/all';
    const urlRegion = 'https://restcountries.com/v3.1/region/';
    const urlSearch = 'https://restcountries.com/v3.1/name/';
    const [ countryData , setCountryData ] = useState([]);
    const [ error , setError ] = useState(false);

    // 將數字千分位區分
    const numberComma = ( num ) => {
        let comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
        return String(num).replace( comma , ',' );
    }

    const fetchCountryData = async (url) => {
        try{
            const response = await fetch(url);
            const data = await response.json();
            
            if ( data.status === 404 ){
                setError(true);
                return;
            }

            // 載入首頁要的國家資料
            const allCountrySet = data.map( (dt , index) => ({
                    "id" : index,
                    "flag" : dt.flags.svg,                                 // 國旗連結
                    "nationName" : dt.name.common,                         // 國名
                    "population" : numberComma(dt.population),             // 總人口數
                    "region" : dt.region,                                  // 洲
                    "capital" : dt.capital ? dt.capital : 'No capital',    // 首都
            }));
            setCountryData(allCountrySet);
            setError(false);
        }
        catch( error ) { 
            console.log( error );
            setError(true);
        }
    }

    // 根據 region 傳回來的資料去取得國家
    useEffect( () => {
        fetchCountryData( selectedRegion === 'All Countries' ? urlAll : `${urlRegion}${selectedRegion}` );
    }, [selectedRegion]);

    // 根據 search 所輸入的值去取得國家的資料
    useEffect(() => {
        fetchCountryData( searchInput !== "" ? urlSearch + searchInput : urlAll );
    }, [searchInput]);

    return (
    <>
        {/* 若error為true，出現Error畫面；反之則出現搜尋所得資料 */}
        { error ?          
            <Error/> :
            <section className='grid px-10 pb-20 gap-y-10 xs:grid-cols-2 xs:px-0 xs:gap-x-7 md:grid-cols-3 lg:gap-x-15 xl:grid-cols-4 lg:gap-y-19 2xl:gap-x-19'>
                { countryData.map( ( country ) => (
                    <CountryBrief 
                        key={country.id}
                        flag={country.flag}
                        nationName={country.nationName}
                        population={country.population}
                        region={country.region}
                        capital={country.capital}    
                    />
                ))}
            </section>
        }
    </>
    )
}

//  設定 selectedRegion 變數的型別
AllCountry.propTypes = {
    selectedRegion: PropTypes.string,
    searchInput: PropTypes.string
}

export default AllCountry;