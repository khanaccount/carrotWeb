import { encoded, translations } from "./data.js";

// console.log(decoded)

function decodeEncoded(encoded, translations) {
    const decoded = [];

    encoded.forEach((item) => {
        const decodedItem = {};

        for (const key in item) {
            if (key.endsWith("Id") && translations[item[key]] !== undefined) {
                decodedItem[key.slice(0, -2)] = translations[item[key]];
            } else {
                decodedItem[key] = item[key];
            }
        }
        decoded.push(decodedItem);
    });

    return decoded;
}

const decoded = decodeEncoded(encoded, translations);

console.log(decoded);

const uniqueIds = [...new Set(encoded.flatMap((item) => Object.values(item)))];

console.log(uniqueIds);
