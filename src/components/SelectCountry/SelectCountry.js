import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import './SelectCountry.module.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0055DE',
    },
  },
});

const SelectCountry = ({countries, onCountryChange}) => {

    // console.log(countries);

    if(!countries) {
        return 'Loading...';
    }

    return (
      <ThemeProvider theme={theme}>
        <Autocomplete
          id="country-select-demo"
          color="primary"
          style={{ maxWidth: 300, minWidth: 250 }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option} 
          onChange={onCountryChange}
          openOnFocus
          renderOption={(option) => (
            <React.Fragment>
              {option}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          )}
        />
      </ThemeProvider>
      );
}

export default SelectCountry;
