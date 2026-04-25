import axios from "axios";

// 🔥 IMPORTANT: replace with your computer IP (NOT localhost)
export const API = axios.create({
  baseURL: "http://192.168.1.223"
});