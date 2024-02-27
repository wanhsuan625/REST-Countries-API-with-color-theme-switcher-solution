import React , { useState , useEffect } from "react";

function FetchAPI ( ) {
    const [ countryData , setCountryData ] = useState( [] );

    useEffect( () => {
        const fetchData = async () => { 
            try{
                const response = await fetch( 'https://restcountries.com/v3.1/all' );
                const data = await response.json();
                
                // get the specific data of each country
                const getData = data.map( ( dt ) => ({
                        "flag" : dt.flags.svg,
                        "nationName" : dt.name.common,
                        "nativeName" : dt.name.nativeName,
                        "abbr3letters" : dt.cca3,
                        "population" : dt.population,
                        "region" : dt.region,
                        "subRegion" : dt.subregion,
                        "capital" : dt.capital,
                        "topLevelDomain" : dt.tld ? dt.tld[0] : [],
                        "currencies" : dt.currencies ? Object.keys(dt.currencies) : [],
                        "languages" : dt.languages ? Object.values(dt.languages) : [],
                        "borderCountries" : dt.borders ? dt.borders : [],
                    })
                );
                setCountryData(getData);
            }
            catch ( error ) { 
                console.log( error );
            }
        }

        // run fetchData
        fetchData();
    })

    return countryData;
}

export default FetchAPI;