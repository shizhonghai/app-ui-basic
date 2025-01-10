import moment from 'moment';
import { encode, decode } from 'js-base64';

// 格式化日期
const formatDate = (date: Date, format?: string) => (date ? moment(date).format(format ? format : 'YYYY-MM-DD HH:mm:ss') : '');

// 加密
const baseEncode = (data: any) => {
    let param = encode(JSON.stringify(data));
    param = param.replace(/\//gi, '@@');
    return param;
};

// 解密
const baseDecode = (data: any) => {
    let param = data.replace(@/@/gi, '/');
    param = JSON.parse(decode(param));
    return param;
};

// 解密 和  JAVA
const base64Decode = (input: any) => {
    return decodeURIComponent(escape(atob(input)));
};

// 加密 和  JAVA
const base64Encode = (input: any) => {
    return btoa(unescape(encodeURIComponent(input)));
};

// 扁平数组方法
const flattenArr = (data: any) => {
    let result: any = [];

    function listTree(arr: any) {
        arr.forEach((item: any) => {
            result.push({ ...item, childrenList: [] });
            if (item.childrenList && item.childrenList.length > 0) {
                listTree(item.childrenList);
            }
        });
    }

    listTree(data);
    return result;
};

/**
 * blob 文件刘处理
 * @param response 响应结果
 * @returns
 */
const handleBlobFile = (response: any, fileName: string) => {
    // 处理返回的文件流
    const blob = response;
    const link = document.createElement('a');
    // 兼容一下 入参不是 File Blob 类型情况
    let binaryData = [] as any;
    binaryData.push(response);
    link.href = window.URL.createObjectURL(new Blob(binaryData));
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    window.setTimeout(function () {
        // @ts-ignore
        URL.revokeObjectURL(blob);
        document.body.removeChild(link);
    }, 0);
};

// 随机数
const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min); // 向上取整
    max = Math.floor(max); // 向下取整
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { flattenArr, formatDate, baseEncode, baseDecode, handleBlobFile, base64Decode, base64Encode, getRandomInt };
