// import axios from 'axios';

// export const apiNext = axios.create({
//   baseURL: process.env.NEXT_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// export const apiAuth = axios.create({
//   baseURL: process.env.API_BASE_URL + 'auth/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// export const apiData = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// export const api = axios.create({
//   baseURL: process.env.API_BASE_URL + 'api/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// apiAuth.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   const { data } = error.response;
//   return data;
// });

// apiNext.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   const { data } = error.response;
//   return data;
// });

// api.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   const { data } = error.response;
//   if (data.status === 403) {
//     localStorage.clear();
//   }
//   return data;
// });