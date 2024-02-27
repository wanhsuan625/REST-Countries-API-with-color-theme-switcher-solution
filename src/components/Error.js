import React from "react";
import earthError from '../images/ecology.png';

function Error () {
    return(
    <>
        <section>
            <img src={earthError} alt="" className="size-56 mb-8 mx-auto md:size-72"/>
            <p className="text-base text-center leading-7 font-semibold md:text-lg md:leading-8 lg:text-xl lg:leading-9">
                Sorry, but we could not find any results for your search. <br/> Please check your spelling and try again.
            </p>
        </section>
    </>
    )
}

export default Error;