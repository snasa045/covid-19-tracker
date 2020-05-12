import axios from 'axios';

let url = "https://kustom.radio-canada.ca/coronavirus/world";

// const api_key = "f5598cc3e651f84ff7ec70af69a9aeb26c93a0c7d4ec6f9545d9a444"; // free account

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

// export const locatedCountry =  async() => {
//     let { data } = await axios.get(
//       `https://api.ipdata.co/?api-key=${api_key}`
//     );

//     return data;
//   }