// tslint:disable-next-line:no-var-requires
const CryptoJS = require('crypto-js');

export default class EncryptHelper {
    /**
     * 需要跟后台保持一致
     */
    public static key: CryptoKey = CryptoJS.enc.Latin1.parse('ABCDEF9876543210');

    /**
     * 加密
     *
     * @param {String} data 需要加密的内容
     * @returns {String} 加密后的内容
     */
    public static aesEncrypt(data: string): any {
        const src = CryptoJS.enc.Utf8.parse(data);
        const encrypted = CryptoJS.AES.encrypt(src, this.key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }
    /**
     * 解密
     *
     * @param {String} data 需要解密的内容
     * @returns {String} 解密后的内容
     */
    public static aesDecrypt(data: string): any {
        const decrypt: any = CryptoJS.AES.decrypt(data, this.key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString());
    }
}
