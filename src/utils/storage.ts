// import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';

export const storeData = (storageKey: string, value: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    console.log("gagal menyimpan local", e);
  }
};

export const getData = (storageKey: string) => {
  try {
    const jsonValue = localStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("gagal mengambil data");
  }
};

export const getCookie = (key: string) => {
  try {
    return Cookies.get(key)
  } catch (e) {
    console.log("gagal mengambil data");
  }
};

export const removeCookie = (key: string) => {
  try {
    return Cookies.remove(key)
  } catch (e) {
    console.log("gagal mengambil data");
  }
};


export const clearAppData = function () {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing app data.", error);
  }
};
