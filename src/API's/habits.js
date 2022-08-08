import axios from "axios";

const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth';

function getHabits() {
    const promise = axios.get(`${BASE_URL}/habits`);
    return promise;
}

export { getHabits };