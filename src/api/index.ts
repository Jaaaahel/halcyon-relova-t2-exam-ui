import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const isAxiosError = axios.isAxiosError;

export interface FieldError {
  rule: string;

  field: string;

  message: string;
}
