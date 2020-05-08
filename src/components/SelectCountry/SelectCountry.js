import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SelectCountry = () => {

    function countryToFlag(isoCode) {
        return typeof String.fromCodePoint !== 'undefined'
          ? isoCode
              .toUpperCase()
              .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
          : isoCode;
    }

    return (
        <div>
            
        </div>
    );
}

export default SelectCountry;
