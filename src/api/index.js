import { api_key } from "../constants/index"
import { apiRequest } from "./axioss"
const base_url = "https://api.themoviedb.org/3"

export const trendingMovie = `${base_url}/trending/movie/day?api_key=${api_key}`
export const upComingMovie = `${base_url}/movie/upcoming?api_key=${api_key}`
export const topRatedMovie = `${base_url}/movie/top_rated?api_key=${api_key}`
export const popularMovie = `${base_url}/movie/popular?api_key=${api_key}`



export const fetchTrendingMovie = () => {
  return apiRequest(trendingMovie)
}

export const fetchUpComingMovie = () => {
  return apiRequest(upComingMovie)
}

export const fetchTopRatedMovie = () => {
  return apiRequest(topRatedMovie)
}

export const fetchPopularMovie = () => {
  return apiRequest(popularMovie)
}


export const image500 = (posterPath) => {
  return posterPath ? "https://image.tmdb.org/t/p/w500" + posterPath : null
}

export const image342 = (posterPath) => {
  return posterPath ? "https://image.tmdb.org/t/p/w342" + posterPath : null
}

export const image185 = (posterPath) => {
  return posterPath ? "https://image.tmdb.org/t/p/w185" + posterPath : null
}