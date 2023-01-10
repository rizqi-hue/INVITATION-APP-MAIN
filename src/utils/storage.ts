// import jwt_decode from "jwt-decode";

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

export const clearAppData = function () {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing app data.", error);
  }
};
