import axios from 'axios';

const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth';

function getRequest() {
  const promise = axios.get(`${BASE_URL}/sign-up`);
  return promise;
}

function getLogin() {
  const promise = axios.get(`${BASE_URL}/login`);
  return promise;
}

export { getRequest, getLogin };
