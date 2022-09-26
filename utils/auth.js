const TokenKey = "token";
const choiceDataKey = "choiceData";
const NowTimeKey = "NowTime";
const OddGourpKey = "OddGourp";
const UuidKey = "uuid";
const HandicapKey = "Handicap";
const basicDataKey = "basicData";
const WithmarketKey = 'Withmarket'
export const getToken = () => {
    const data = localStorage.getItem(TokenKey)
        ? JSON.parse(localStorage.getItem(TokenKey))
        : null;
    return data;
};
export const setToken = token =>
    localStorage.setItem(TokenKey, JSON.stringify(token));

export const removeToken = () => localStorage.removeItem(TokenKey);

// ???????
// export const getBasicData = () => {
//   const data = localStorage.getItem(basicDataKey)
//     ? JSON.parse(localStorage.getItem(basicDataKey))
//     : null;
//   return data;
// };
// export const setBasicData = basicData =>
//   localStorage.setItem(basicDataKey, JSON.stringify(basicData));

// ???????????
// export const getWithmarket = () => {
//   const data = localStorage.getItem(WithmarketKey)
//     ? JSON.parse(localStorage.getItem(WithmarketKey))
//     : null;
//   return data;
// };
// export const setWithmarket = Withmarket =>
//   localStorage.setItem(WithmarketKey, JSON.stringify(Withmarket));


// choiceData ????????
// export const getchoiceData = () => {
//   const data = localStorage.getItem(choiceDataKey)
//     ? JSON.parse(localStorage.getItem(choiceDataKey))
//     : null;
//   return data;
// };

export const setchoiceData = choiceData =>
    localStorage.setItem(choiceDataKey, JSON.stringify(choiceData));

export const removechoiceData = () => localStorage.removeItem(choiceDataKey);

// ????
// export const getNowTime = () => localStorage.getItem(NowTimeKey);

// export const setNowTime = NowTime => localStorage.setItem(NowTimeKey, NowTime);

// export const removeNowTime = () => localStorage.removeItem(NowTimeKey);

// ????
// export const getOddGourp = () => {
//   const data = localStorage.getItem(OddGourpKey)
//     ? JSON.parse(localStorage.getItem(OddGourpKey))
//     : null;
//   return data;
// };
// export const setOddGourp = OddGourp =>
//   localStorage.setItem(OddGourpKey, JSON.stringify(OddGourp));

// export const removeOddGourp = () => localStorage.removeItem(OddGourpKey);

// uuid
export const getUuid = () => localStorage.getItem(UuidKey);

export const setUuid = Uuid => localStorage.setItem(UuidKey, Uuid);

// export const removeUuid = () => localStorage.removeItem(UuidKey);

// Handicap
// export const getHandicap = () => localStorage.getItem(HandicapKey);
//
// export const setHandicap = handicap =>
//   localStorage.setItem(HandicapKey, handicap);

// export const removeHandicap = () => localStorage.removeItem(HandicapKey);
