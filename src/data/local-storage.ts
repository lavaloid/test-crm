import { Client } from "./types";

const DB_KEY = "clients";

/**
 * Fetch client list from local storage.
 * @returns Array of clients if localStorage can be accessed, null otherwise
 */
export const getClientList: () => Client[] = () => {
  try {
    const data_str = window.localStorage.getItem(DB_KEY);
    if (!data_str) return [];

    return JSON.parse(data_str);
  } catch (e: any) {
    return null;
  }
};

/**
 * Saves client list to the storage.
 * @param data Array of clients
 * @returns `true` if successful, `false` otherwise
 */
export const saveClientList: (data: Client[]) => boolean = (data) => {
  try {
    const data_str = JSON.stringify(data);
    window.localStorage.setItem(DB_KEY, data_str);

    return true;
  } catch (e: any) {
    return false;
  }
};

