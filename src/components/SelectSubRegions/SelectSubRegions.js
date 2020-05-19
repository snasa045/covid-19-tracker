import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import './SelectSubRegions.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0055DE',
    },
  },
});

const SelectSubRegions = ({subRegions, onSubRegionsChange, subRegionName}) => {

    if(!subRegions) {
        return 'Loading...';
    }

    return (
      <ThemeProvider theme={theme}>
        <Autocomplete
          id="sub-region-select-demo"
          color="primary"
          className="sub_region_dropdown dropdown"
          style={{ maxWidth: 300, minWidth: 250 }}
          options={subRegions}
          autoHighlight
          getOptionLabel={(option) => option} 
          onChange={onSubRegionsChange}
          openOnFocus
          value = {subRegionName}
          renderOption={(option) => (
            <React.Fragment>
              {option}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a State/ Province"
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

export default SelectSubRegions;
