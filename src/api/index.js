import axios from 'axios';

let url = "https://kustom.radio-canada.ca/coronavirus/world";

export const fetchData = async() => {
    try {
        const {data: [data]} = await axios.get(url);

        return data;
        // return {Name, Confirmed, Deaths, Recovered, DateUpdate};
    } catch (error) {
        console.log(error);
        return error;
    }
}