import axios from 'axios';

let url = "https://kustom.radio-canada.ca/coronavirus/world";

export const fetchData = async(countrySpecificUrl) => {
    let updatedUrl = url;

    if(countrySpecificUrl) {
        updatedUrl = countrySpecificUrl;
    } 
    
    try {
        const {data: [data]} = await axios.get(updatedUrl);

        return data;
    } catch (error) {
        // console.log(error);
        return error;
    }
}