/**
 * Created by jinlongxi on 17/8/22.
 */


const BaseURL='http://192.168.3.4:3400/';    //小沈本地
//const BaseURL='http://120.27.222.80:3400/';   //测试服务器

const Youping_API={
    //PE平台
    platformManager:BaseURL+'platformManager/control/',
    //友评交易
    personManager:BaseURL+'personManager/control/',
    //WEB分享页面
    WebManager:BaseURL+'WebManager/control/'
};

export default Youping_API
