import * as Crypto from 'expo-crypto';

export const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


  // export const getRoomId = (userId1: string, userId2: string) => {
  //   const sortedIds = [userId1, userId2].sort();
  //   const roomId = sortedIds.join("-")
  //   return roomId;
  // }

  // export const getRoomId = (...userIds: string[]) => {
  //   const sortedIds = userIds.sort();
  //   const roomId = sortedIds.join("-");
  //   return roomId
  // }

  export const getRoomId = (...userIds: any[]) => {
    const sortedIds = userIds.sort().join("-");
    return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, sortedIds);
  };


   export const formatDate = (date: any) => {
    var day = date.getDate();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = monthNames[date.getMonth()];

    var formattedDate = day + " " + month;
    return formattedDate;
  }