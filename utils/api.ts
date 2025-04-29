import axios from "axios";
import { FiltersType } from "./types";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createTransaction = async (transactionData: any) => {
  try {
    const response = await api.post("/transactions", transactionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAccountBalance = async (accountId: string) => {
  try {
    const response = await api.get(`/accounts/${accountId}/balance`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTransactions = async (filters: FiltersType) => {
  try {
    const response = await api.get("/transactions", { params: filters });
    return response.data;
  } catch (error) {
    throw error;
  }
};
