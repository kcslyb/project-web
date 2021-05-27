import store from "@/store";

const CryptoJS = require('crypto-js');

const session = () => {
    const range = (start: number, stop: number) => Array.from({ length: (stop - start) + 1 }, (_, i) => start + i)
    const capital = range(65, 70).map(value => String.fromCharCode(value))
    const number = range(0, 9).reduce((acc: Array<any>, cur) => {
        acc.unshift(cur)
        return acc
    }, [])
    return capital.join('') + number.join('')
}

export default class EncryptHelper {

    /**
     * 加密
     *
     * @param {String} data 需要加密的内容
     * @returns {String} 加密后的内容
     */
    public static aesEncrypt(data: string): any {
        let temp = store.getters.session || session()
        try {
            const key: CryptoKey = CryptoJS.enc.Latin1.parse(temp);
            const src = CryptoJS.enc.Utf8.parse(data);
            const encrypted = CryptoJS.AES.encrypt(src, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
        } catch (e) {
            console.error(e)
        }
    }
    /**
     * 解密
     *
     * @param {String} data 需要解密的内容
     * @returns {String} 解密后的内容
     */
    public static aesDecrypt(data: string): any {
        let temp = store.getters.session || session()
        try {
            const key: CryptoKey = CryptoJS.enc.Latin1.parse(temp);
            const decrypt: any = CryptoJS.AES.decrypt(data, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString());
        } catch (e) {
            console.error(e)
        }
    }
}
