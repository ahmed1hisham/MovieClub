import axios from 'axios';
import {API_KEY, DB_BASE_URL} from '../env';

export const getUpcomingMovies = async page => {
  return await axios
    .get(DB_BASE_URL + 'movie/upcoming', {params: {api_key: API_KEY, page}})
    .catch(e => {
      console.log(e);
    });
};
export const getPopularMovies = async page => {
  return await axios
    .get(DB_BASE_URL + 'movie/popular', {params: {api_key: API_KEY, page}})
    .catch(e => {
      console.log(e);
    });
};
export const getTopRatedMovies = async page => {
  return await axios
    .get(DB_BASE_URL + 'movie/top_rated', {params: {api_key: API_KEY, page}})
    .catch(e => {
      console.log(e);
    });
};

export const getMovieDetails = async id => {
  return await axios
    .get(DB_BASE_URL + 'movie/' + id, {params: {api_key: API_KEY}})
    .catch(e => {
      console.log(e);
    });
};

export const getMovieCredits = async id => {
  return await axios
    .get(DB_BASE_URL + 'movie/' + id + '/credits', {params: {api_key: API_KEY}})
    .catch(e => {
      console.log(e);
    });
};
