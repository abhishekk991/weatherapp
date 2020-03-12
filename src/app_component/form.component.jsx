import React from 'react';
import "./form.style.css";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

// const { country, region } = this.props;

const Form = props => {

    return (
        <div className="container">
            <div>{props.error ? error() : null}</div>
                
            <div className="row">
               <div className="col-md-12 mt-md-0 text-md-center">

            <form onSubmit={props.loadweather}>
                {/* <div className="row"> */}

                <div>
                    <CountryDropdown
                    value={props.country}
                    onChange={(val) => props.selectCountry(val)} name="country"/>
                    <RegionDropdown
                    country={props.country}
                    value={props.region}
                    onChange={(val) => props.selectRegion(val)} name="city"/>
                    <button className="btn btn-warning">Get Weather</button>
                </div> 
                    
                    {/* <div className="col-md-3 offset-md-2">
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            autoComplete="off"
                            placeholder="City"
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            name="country"
                            autoComplete="off"
                            placeholder="Country"
                        />
                    </div>

                    <div className="col-md-3 mt-md-0 text-md-left">
                        <button className="btn btn-warning">Get Weather</button>
                    </div> */}
                
            </form>

         </div>
         </div>
        </div>

    )
}

function error() {
    return (
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter city and country name!
        </div>
    )
}

export default Form;