import CryptoJS from "crypto-js";
const CRYPTOJSKEY = "halo-sdk-crypt";

export default {
  /*
   * {param} plaintText 加密明文
   * return  str 加密结果
   */
  encrypt(plaintObject) {
    if (!plaintObject) {
      return undefined;
    }
    return CryptoJS.AES.encrypt(
      JSON.stringify(plaintObject),
      CRYPTOJSKEY
    ).toString();
  },
  /*
  * {param} ciphertext 解密密文
  
  * return  str 解密结果
  */
  decrypt(ciphertext) {
    if (!ciphertext) {
      return undefined;
    }
    var bytes = CryptoJS.AES.decrypt(ciphertext, CRYPTOJSKEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
};
