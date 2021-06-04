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
    public static formatStringToDateTime(formatString: string): string {
        if (!formatString) return '';
        if (CustomUtils.typeJudge(formatString)) {
            return moment(formatString).format('YYYY-MM-DD HH:mm:ss');
        } else {
            return moment(new Date(formatString)).format('YYYY-MM-DD HH:mm:ss');
        }
    }
    /**
     * 格式化时间函数
     *
     * @param formatString
     * @param format
     * @returns {String}
     */
    public static formatStringToDate(formatString: string, format:string = 'YYYY-MM-DD'): string {
        if (formatString) {
            return moment(new Date(formatString)).format(format);
        } else {
            return '';
        }
    }
}

// tslint:disable-next-line:max-classes-per-file
export class CustomUtils {
    /**
     * 类型比较
     * @param target
     * @param type
     */
    public static typeJudge = (target: any, type = 'String') => {
        // @ts-ignore
        return type === Object.prototype.toString.call(target).match(/(\w+)]/)[1]
    }

    /**
     * JSON文件的保存
     * @param data
     * @param filename
     */
    public static saveDataToLocal = (data: any, filename: string) => {
        return new Promise((resolve, reject) => {
            try {
                if (!data) {
                    reject(new Error('保存的数据为空'))
                }
                if (!filename) filename = `${+new Date()}.json`
                if (typeof data === 'object') {
                    data = JSON.stringify(data, undefined, 4)
                }
                // 要创建一个 blob 数据
                const blob = new Blob([data], { type: 'text/json' })
                const a = document.createElement('a')
                a.download = filename
                // 将blob转换为地址
                // 创建 URL 的 Blob 对象
                a.href = window.URL.createObjectURL(blob)
                a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
                // 添加鼠标事件
                const event = new MouseEvent('click', {})
                // 向一个指定的事件目标派发一个事件
                a.dispatchEvent(event)
                resolve(true)
            } catch (e) {
                reject(e)
            }
        })
    }

    /**
     * 文件下载
     * @param fileId
     * @param fileName
     */
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
    public static fileDownload(url: string) {
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
     * @param {Number} lower 上限
     * @param {Number} upper 下限
     * @return {Number} 返回在下限到上限之间的一个随机整数
     */
    public static randomNumber(lower: number, upper: number): number {
        lower = Math.floor(lower);
        upper = Math.ceil(upper);
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }

    /**
     * 字典数组转字典对象
     * @param array 字典数组
     * @param propObj key-value 从数组取键值的字段名
     */
    public static listToDictObj (array: Array<any>, propObj: {key: 'key', value: 'value'}) {
        if (!Array.isArray(array) || array.length === 0) {
            return {}
        }
        const dictObj: any = {}
        const index = array.length - 1
        for (let i = index; i > -1 ; i--) {
            const propKey = array[i][propObj.key]
            dictObj[propKey] = array[i][propObj.value]
        }
        return dictObj
    }

    /**
     * 大写首字母
     * @param str
     */
    public static replaceStr(str: string) {
        let reg = /\b(\w)|\s(\w)/g
        return str.replace(reg, function (m) {
            return m.toUpperCase()
        })
    }

    /**
     * 获取文件的内容
     */
    public static readJsonFromLocal = () => {
        return new Promise(((resolve, reject) => {
            const inputElement = document.createElement('input')
            inputElement.type = 'file'
            inputElement.addEventListener('change', handleFiles, false)
            const event = new MouseEvent('click', {})
            inputElement.dispatchEvent(event)

            function handleFiles(e: any) {
                const selectedFile = e.target.files[0] // 获取读取的File对象
                const name = selectedFile.name // 读取选中文件的文件名
                const size = selectedFile.size // 读取选中文件的大小
                // console.log('文件名:' + name + '大小：' + size)
                const reader = new FileReader() // 这里是核心！！！读取操作就是由它完成的。
                reader.readAsText(selectedFile) // 读取文件的内容
                reader.onload = function () {
                    // console.log('读取结果：', reader.result)
                    // console.log('读取结果转为JSON：')
                    // @ts-ignore
                    resolve(JSON.parse(JSON.stringify(reader.result.toString())))
                }
                reader.onerror = function (e) {
                    reject(e)
                }
            }
        }))
    }

    /**
     *匹配html标签
     * @param html
     * @param tag
     */
    public static parseHtml = (html: string, tag = 'A') => {
        let regexp = `<DT>(<${tag}\\s[\\w|\\d|\\s|\\&|\\?|\\||\\(|\\)|\\#|"|.|\\/|:|;|+|,|=|__|_|\\-|\\u4e00-\\u9fa5]*>[\\w|\\d|\\s|\\&|\\?|\\||\\(|\\)|\\#|"|.|\\/|:|;|+|,|=|__|_|\\-|\\u4e00-\\u9fa5]*<\/${tag}>)`
        return [...html.matchAll(new RegExp(regexp, 'g'))].map(v => v[1])
    }

    /**
     * 匹配html标签值
     * @param htmlLabel
     * @param title
     * @param tagType
     */
    public static parseHtmlLabel = (htmlLabel: string, title = 'title', tagType = 'tagType') => {
        const resultObj = {}
        const labels = [...htmlLabel.matchAll(/\s([\w|_]+)=/g)].map(v => v[1])
        const values = [...htmlLabel.matchAll(/\s[\w|_]+="([\w|\d|\s|.|\/|\&|\#|\?|\||\(|\)|:|;|+|,|=|_|__|\-|\u4e00-\u9fa5]*)"/g)].map(v => v[1])
        if (labels.length > 0) {
            for (let i = labels.length - 1; i > -1; i--) {
                // @ts-ignore
                resultObj[labels[i]] = values[i]
            }
        }
        const tempTitle = htmlLabel.match(/>([\w|\d|\s|.|\/|\&|\#|\?|\||\(|\)|:|;|+|,|=|_|__|\-|\u4e00-\u9fa5]*)</)
        if (tempTitle && tempTitle.length > 0) {
            // @ts-ignore
            resultObj[title] = tempTitle[1]
        }
        const tempTagType = htmlLabel.match(/<([\w]+)\s/)
        if (tempTagType && tagType.length > 0) {
            // @ts-ignore
            resultObj[tagType] = tempTagType[1]
        }
        return resultObj
    }

    /**
     * 组装数组为二维数组
     * @param array
     * @param size
     */
    public static assembleArray = (array: Array<any>, size = 10) => {
        if (!array) {
            return []
        }
        if (array.length <= size) {
            return [array]
        }
        let index = 0
        const result = []
        do {
            let temp = index + size > array.length ? array.length : index + size
            result.push(array.slice(index, temp))
            index = temp
        } while (index < array.length)
        return result
    }
}
