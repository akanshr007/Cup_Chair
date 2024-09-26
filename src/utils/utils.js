import {
  geocodeByAddress,
  geocodeByLatLng,
  getLatLng,
} from "react-google-places-autocomplete";
import CryptoJS from "crypto-js";
import { apiCallPost, apiCallGet } from "../containers/components/Axios/Axios";
import { ENABLE_ENCRYPTION, LENGTH, SECRET_KEY } from "../constant";

export const getLatLongByPlaceLabel = async (placeLabel) => {
  let result = [null, null];

  const geoCodes = await geocodeByAddress(placeLabel);
  if (!geoCodes?.length) return result;

  const location = await getLatLng(geoCodes[0]);
  if (Object.keys(location || {}).length) return [location.lat, location.lng];

  return result;
};

export const getGeocodeByLatLong = async (lat, lng) => {
  const geoCodes = await geocodeByLatLng({ lat: lat, lng: lng });
  if (!geoCodes?.length) return "";
  return geoCodes[0].address_components;
};

export const uploadImageVideoFile = async (type, fileName, fileObj) => {
  try {
    const formData = new FormData();
    formData.append(fileName, fileObj);
    const res = await apiCallPost(`users/api/v1/nft/${type}`, formData);
    if (res) {
      if (res.message.location.length > 0) {
        return res.message.location;
      } else {
        return false;
      }
    }
  } catch (error) {
    throw error;
  }
};
export const uploadPhotographerProfile = async (fileName, fileObj) => {
  try {
    const formData = new FormData();
    formData.append(fileName, fileObj);
    const res = await apiCallPost(`users/api/v1/image`, formData);
    if (res) {
      if (res.message.location.length > 0) {
        return res.message.location;
      } else {
        return false;
      }
    }
  } catch (error) {
    throw error;
  }
};

export const twoValuesAfterDecimal = (e) => {
  const decimal_index = e.target.value.indexOf(".");
  if (decimal_index > -1) {
    var decimals = e.target.value.substring(
      decimal_index,
      e.target.value.length + 1
    );
    if (decimals.length > 2 && e.keyCode !== 8) {
      e.preventDefault();
    }
  }
};

export function calculateBal(bal) {
  return bal / 1000000;
}

export const setFinalPrice = (price, commisionFee, transactionFee) => {
  // console.log("price", price);
  // let price=9000
  if (price) {
    return transactionFee.types === "percentage"
      ? commisionFee.types === "percentage"
        ? (
          (transactionFee.fees * price) / 100 +
          price +
          parseFloat((commisionFee.fees * price) / 100) ||
          (0).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }) ||
          0
        ).toFixed(2)
        : parseFloat(
          (
            commisionFee.fees +
            +price +
            (transactionFee.fees * price) / 100
          ).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }) || 0
        ).toFixed(2)
      : commisionFee.types === "percentage"
        ? parseFloat(
          (
            transactionFee.fees +
            price +
            (commisionFee.fees * price) / 100
          ).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }) || 0
        ).toFixed(2)
        : // parseFloat(
        //   (commisionFee.fees + price + transactionFee.fees)  || 0
        //   ).toFixed(2);
        (price > 1000
          ? (commisionFee.fees + price + transactionFee.fees).toFixed(2)
          : // comma dia// ( commisionFee.fees + price + transactionFee.fees/100)
          // console.log("price", price,"transactionFee",transactionFee.fees,commisionFee.fees,"commisionFee")
          (commisionFee.fees + price + transactionFee.fees).toFixed(2)
        ).toLocaleString("en-US", {
          maximumFractionDigits: 2,
        }) || (0).toFixed(2);
  } else return 0.0;
};

export const setTotalFinalPrice = (
  price,
  commisionFee,
  transactionFee,
  length
) => {
  return transactionFee.types === "percentage"
    ? commisionFee.types === "percentage"
      ? (
        (transactionFee.fees * price) / 100 +
        price +
        (commisionFee.fees * price) / 100
      ).toFixed(2)
      : (
        commisionFee.fees * length +
        +price +
        (transactionFee.fees * price) / 100
      ).toFixed(2)
    : commisionFee.types === "percentage"
      ? (
        transactionFee.fees * length +
        price +
        (commisionFee.fees * price) / 100
      ).toFixed(2)
      : (
        commisionFee.fees * length +
        +price +
        transactionFee.fees * length
      ).toFixed(2);
};

export const limitCharacters = (text, count) => {
  return text?.length > count ? text?.slice(0, count) + ".." : text;
};

export const start_and_end = (str) => {
  if (str && str?.length > 10) {
    return str.substr(0, 5) + "..." + str.substr(str.length - 4, str.length);
  }
  return str;
};

export const numberWithCommas = (x) => {
  if (x >= 1e6) return (x / 1e6).toFixed(1) + "m";
  if (x >= 1e3) return (x / 1e3).toFixed(1) + "k";
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// export const renderWithdrawModalSubText = (nftTitle) => (
//   <>
//     <p style={{ textAlign: "center" }}>{nftTitle}</p>
//     <span className="fs-6">
//       Enter the public address of the Tezos wallet you want us to transfer the
//       NFT.
//     </span>
//   </>
// );

// API Encryption Decryption code======>

function isPrime(number) {
  if (number <= 1) {
    return false;
  }

  if (number <= 3) {
    return true;
  }

  if (number % 2 === 0 || number % 3 === 0) {
    return false;
  }

  for (let i = 5; i * i <= number; i += 6) {
    if (number % i === 0 || number % (i + 2) === 0) {
      return false;
    }
  }

  return true;
}
function getPrimeNumbersInRange(start, end) {
  const primeNumbers = [];

  for (let number = start; number <= end; number++) {
    if (isPrime(number)) {
      primeNumbers.push(number);
    }
  }
  return primeNumbers;
}
function getKey(value) {
  const key = SECRET_KEY;

  // get the prime number
  const primeNumbers = getPrimeNumbersInRange(1, value);

  // get the string according to the prime number

  const string = primeNumbers.map((number) => key[number]).join("");
  return string;
}
export const decryptData = (data) => {
  const key = getKey(Number(LENGTH));
  if (ENABLE_ENCRYPTION === "YES") {
    try {
      const decryptData = CryptoJS.AES.decrypt(data, key);
      const stringData = decryptData.toString(CryptoJS.enc.Utf8);
      return stringData && JSON.parse(stringData);
    } catch (error) {
      console.log({ error });
    }
  }
};
export const encryptData = (data) => {
  const key = getKey(Number(LENGTH));
  if (ENABLE_ENCRYPTION === "YES") {
    const stringData = data && JSON.stringify(data);
    const encryptData = CryptoJS.AES.encrypt(stringData, key).toString();
    return encryptData;
  }
};
export const convertToTitleCase = (str) => {
  if (str) {
    // Remove special characters and extra spaces
    const cleanedStr = str
      .replace(/[@#$%^_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Capitalize each word
    const titleCaseStr = cleanedStr
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return titleCaseStr;
  } else {
    return "--";
  }
};