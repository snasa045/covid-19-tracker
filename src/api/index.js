import axios from 'axios';

const worldUrl = "https://kustom.radio-canada.ca/coronavirus/world";
const indiaUrl = "https://covid19api.io/api/v1/IndiaCasesByStates";

const api_key = "f5598cc3e651f84ff7ec70af69a9aeb26c93a0c7d4ec6f9545d9a444"; // free account

export const fetchIndianData = async() => {
    try {
        let {data} = await axios.get(indiaUrl);
        return data;
    } catch (error) {
        return error;
    }
}

export const fetchData = async(countrySpecificUrl) => {
    let updatedUrl = worldUrl;

    if(countrySpecificUrl) {
        updatedUrl = countrySpecificUrl;
    }
    
    try {
        let {data: [data]} = await axios.get(updatedUrl);
        return data;
    } catch (error) {
        // console.log(error);
        return error;
    }
}

export const fetchDataRegions = async(RegionSpecificUrl) => {
    try {
        let {data: [data]} = await axios.get(RegionSpecificUrl);
        return data;
    } catch (error) {
        // console.log(error);
        return error;
    }
}

export const locatedCountry =  async() => {
    let { data } = await axios.get(
      `https://api.ipdata.co/?api-key=${api_key}`
    );

    return data;
}
