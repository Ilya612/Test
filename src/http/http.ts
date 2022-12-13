import axios from "axios";

const API_URL =
  "https://the-trivia-api.com/api/questions?categories=sport_and_leisure&limit=5&difficulty=easy";
export const $apiQuize = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
