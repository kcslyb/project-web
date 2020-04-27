import moment from 'moment';

export class DateUtils {
    /**
     * 格式化时间函数
     *
     * @param array
     * @param index
     * @returns {String}
     */
    public static formatArrayToDateTime(array: any[], index: number): string {
        return Array.isArray(array) && array[index] ? moment(array[index]).format('YYYY-MM-DD HH:mm:ss') : '';
    }

    /**
     * 格式化时间函数
     *
     * @param formatString
     * @returns {String}
     */
    public static   formatStringToDateTime(formatString: string): string {
        if (formatString) {
            return moment(formatString).format('YYYY-MM-DD HH:mm:ss');
        } else {
            return '';
        }
    }
    /**
     * 格式化时间函数
     *
     * @param formatString
     * @param format
     * @returns {String}
     */
    public static   formatStringToDate(formatString: string, format:string = 'YYYY-MM-DD'): string {
        if (formatString) {
            return moment(formatString).format(format);
        } else {
            return '';
        }
    }
}

// tslint:disable-next-line:max-classes-per-file
export class CustomUtils {
    public static downloadFile(fileId: string, fileName: string) {
        let url = window.location.origin + '/file/download' + fileId;
        return new Promise((resolve, reject) => {
            // Get file name from url.
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = () => {
                resolve(xhr);
            };
            xhr.onerror = reject;
            xhr.open('GET', url);
            xhr.send();
        }).then((xhr) => {
            let a = document.createElement('a');
            // @ts-ignore
            a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
            a.download = fileName; // Set the file name.
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            return xhr;
        });
    }

    /**
     * 防抖函数
     * @param func 传入的函数
     * @param wait 等待的时间
     * @param immediate 是否立即执行
     * @return {Function}
     */
    public static debounce(func: () => any, wait: number = 3000, immediate: boolean = false) {
        // 缓存一个定时器id
        let timer: any = null;
        let result: any;
        const current: any = this;
        // 这里返回的函数是每次用户实际调用的防抖函数
        // tslint:disable-next-line:only-arrow-functions
        return function(...args: []): void {
            // 如果已经设定过定时器了就清空上一次的定时器
            if (timer) {
                clearTimeout(timer);
            }
            if (immediate) {
                const callNow: any = !timer;
                // 等待wait的时间间隔后，timer为null的时候，函数才可以继续执行
                timer = setTimeout(() => {
                    timer = null;
                }, wait);
                // 未执行过，执行
                if (callNow) {
                    result = func.apply(current, args);
                }
            } else {
                // 开始一个定时器，延迟执行用户传入的方法
                timer = setTimeout(() => {
                    // 将实际的this和参数传入用户实际调用的函数
                    func.apply(current, args);
                }, wait);
            }
            return result;
        };
    }

    /**
     * 截流函数
     * @param func 传入的函数
     * @param wait 等待的时间
     * @returns {Function}
     */
    public static throttle(func: () => any, wait: number = 3000) {
        let last: any, deferTimer: any;
        const that: any = this;
        // tslint:disable-next-line:only-arrow-functions
        return function(...args: []) {
            // +new Date() 将会调用 Date.prototype上的 valueOf()方法
            const now = +new Date();
            if (last && now < last + wait) {
                clearTimeout(deferTimer);
                // tslint:disable-next-line:only-arrow-functions
                deferTimer = setTimeout(function() {
                    last = now;
                    func.apply(that, args);
                }, wait);
            } else {
                last = now;
                func.apply(that, args);
            }
        };
    }

    /**
     * 文件下载 默认文件名
     * @param url 文件路径
     */
    public static fielDownload(url: string) {
        const $a = document.createElement('a');
        $a.setAttribute('href', url);
        const fileLink = document.createElement('span');
        fileLink.setAttribute('style', 'cursor: pointer; -webkit-tap-highlight-color: transparent');
        $a.appendChild(fileLink);
        const body = document.getElementsByTagName('body')[0];
        body.appendChild($a);
        fileLink.click();
        body.removeChild($a);
    }

    /**
     * 文件下载可改文件名
     * @param url
     * @param fileName
     * @return {Promise<any | never>}
     */
    public static fieldDownload(url: string, fileName: string) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = () => {
                resolve(xhr);
            };
            xhr.onerror = reject;
            xhr.open('GET', url);
            xhr.send();
        }).then((xhr) => {
            const a = document.createElement('a');
            // @ts-ignore
            a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
            a.download = fileName; // Set the file name.
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            return xhr;
        });
    }

    /**
     * 产生随机整数，包含下限值，包括上限值
     * @param {Number} lower 下限
     * @param {Number} upper 上限
     * @return {Number} 返回在下限到上限之间的一个随机整数
     */
    public static randomNumber(lower: number, upper: number): number {
        lower = Math.floor(lower);
        upper = Math.ceil(upper);
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }
}
