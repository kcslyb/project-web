import user from '../store/modules/user';

/**
 * socket util
 *
 * @returns {WebSocket}
 */
export default class SocketUtil {
    public static getSocket(url: string) {
        // 浏览器不支持WebSocket
        if (typeof (WebSocket) === 'undefined') {
            return null;
        }
        if (!user.state.userId) {
            return null;
        }
        if (!url) {
            url = window.location.origin + '/socket/';
        }
        let serverUrl = url + user.state.userId;
        // 实现化WebSocket对象,指定要连接的服务器地址与端口建立连接
        return new WebSocket(serverUrl);
        // 打开事件
        // socket.onopen = () => {
        // console.log("Socket 已打开");
        // socket.send("这是来自客户端的消息" + location.href + new Date());
        // };
        // 获得消息事件
        // socket.onmessage = function (msg) {
        //   console.log(msg.data);
        //   //发现消息进入,开始处理前端触发逻辑
        // };
        // 关闭事件
        // socket.onclose = () => {
        // console.error("SOCKET已关闭");
        // };
        // 发生了错误事件
        // socket.onerror = (e) => {
        //     console.error('SOCKET发生了错误:' + e);
        //     此时可以尝试刷新页面
        // };
    }
}

