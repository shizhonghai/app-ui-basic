// @ts-ignore
import * as CryptoJS from 'crypto-js';


/**
 *加密处理
 */
export function encryption(src: string, keyWord: string) {
    const key = CryptoJS.enc.Utf8.parse(keyWord);
    // 加密
    let encrypted = CryptoJS.AES.encrypt(src, key, {
        iv: key,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding,
    });
    return encrypted.toString();
}

/**
 *  解密
 * @param {*} params 参数列表
 * @returns 明文
 */
export function decryption(src: string, keyWord: string) {
    const key = CryptoJS.enc.Utf8.parse(keyWord);
    // 解密逻辑
    var decryptd = CryptoJS.AES.decrypt(src, key, {
        iv: key,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding,
    });

    return decryptd.toString(CryptoJS.enc.Utf8);
}

/**
 * Base64 加密
 * @param {*} src  明文
 * @returns 密文
 */
export function base64Encrypt(src: string) {
    const encodedWord = CryptoJS.enc.Utf8.parse(src);
    return CryptoJS.enc.Base64.stringify(encodedWord);
}

const other = {
    encryption: (src: string, keyWord: string) => {
        return encryption(src, keyWord);
    },
    decryption: (src: string, keyWord: string) => {
        return decryption(src, keyWord);
    },
    base64Encrypt: (data: any) => {
        return base64Encrypt(data);
    },
};


// 统一批量导出
export default other;
