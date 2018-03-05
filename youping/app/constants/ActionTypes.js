/**
 *存放action类型
 */

/*登录模块*********************************************************/
export const REQUEST_WECHAT_LOGIN = 'REQUEST_WECHAT_LOGIN';                                 //请求微信登录
export const FETCH_WECHAT_LOGIN = 'FETCH_WECHAT_LOGIN';                                     //网络请求微信登录
export const WECHAT_LOGIN_SUCCESS = 'WECHAT_LOGIN_SUCCESS';                                 //微信登录成功接受参数
export const WECHAT_LOGIN_OUT = 'WECHAT_LOGIN_OUT';                                         //退出登录

/*资源模块**********************************************************/
export const REQUEST_RESOURCE_LIST = 'REQUEST_RESOURCE_LIST';                               //请求资源列表
export const FETCH_RESOURCE_LIST = 'FETCH_RESOURCE_LIST';                                   //网络请求资源列表
export const RECEIVE_RESOURCE_LIST = 'RECEIVE_RESOURCE_LIST';                               //接收资源列表数据
export const REFRESH_RESOURCE_LIST = 'REFRESH_RESOURCE_LIST';                               //下拉刷新资源列表数据
export const FETCH_SALES_DISCONTINUATION = 'FETCH_SALES_DISCONTINUATION';                   //下拉刷新资源列表数据
export const FETCH_SALES_DISCONTINUATION_SUCCESS = 'FETCH_SALES_DISCONTINUATION_SUCCESS';   //下拉刷新资源列表数据

export const REQUEST_PRODUCT_FEATURES = 'REQUEST_PRODUCT_FEATURES';                         //请求资源特征列表
export const FETCH_PRODUCT_FEATURES = 'FETCH_PRODUCT_FEATURES';                             //网络请求资源特征列表
export const RECEIVE_PRODUCT_FEATURES = 'RECEIVE_PRODUCT_FEATURES';                         //接收资源特征列表数据

export const SET_RESOURCE_NAME = 'SET_RESOURCE_NAME';                                       //设置资源名称
export const SET_RESOURCE_IMAGES = 'SET_RESOURCE_IMAGES';                                   //设置资源图片
export const SET_RESOURCE_ADVANCED = 'SET_RESOURCE_ADVANCED';                               //开启高级选项
export const SET_RESOURCE_DESCRIPTION = 'SET_RESOURCE_DESCRIPTION';                         //设置资源描述
export const SET_RESOURCE_PRICE = 'SET_RESOURCE_PRICE';                                     //设置资源价格
export const SET_RESOURCE_STORE_NUMBER = 'SET_RESOURCE_STORE_NUMBER';                       //设置资源库存
export const SET_RESOURCE_FEATURES = 'SET_RESOURCE_FEATURES';                               //设置资源特征
export const REQUEST_RESOURCE_RELEASE = 'REQUEST_RESOURCE_RELEASE';                         //请求发布资源
export const FETCH_RESOURCE_RELEASE = 'FETCH_RESOURCE_RELEASE';                             //网络请求发布资源
export const FETCH_RESOURCE_RELEASE_SUCCESS = 'FETCH_RESOURCE_RELEASE_SUCCESS';             //发布资源成功SHOW_FEATURES_MODEL
export const SHOW_FEATURES_MODEL = 'SHOW_FEATURES_MODEL';                                   //显示隐藏特征模态框
export const SET_PAGE_TYPE='SET_PAGE_TYPE';                                                 //设置当前页面是发布还是编辑
export const CLEAR_RESOURCE_RELEASE='CLEAR_RESOURCE_RELEASE';                               //清理数据

export const REQUEST_RESOURCE_DETAIL = 'REQUEST_RESOURCE_DETAIL';                           //请求资源详情
export const FETCH_RESOURCE_DETAIL = 'FETCH_RESOURCE_DETAIL';                               //网络请求资源详情
export const RECEIVE_RESOURCE_DETAIL = 'RECEIVE_RESOURCE_DETAIL';                           //接受资源详情数据
export const CLEAR_RECEIVE_RESOURCE_DETAIL = 'CLEAR_RECEIVE_RESOURCE_DETAIL';               //清除资源详情数据
export const SHOW_SHARE_MODEL = 'SHOW_SHARE_MODEL';                                         //显示分享模态框
export const SET_WECHAT_SHARE_TEXT = 'SET_WECHAT_SHARE_TEXT';                               //设置微信分享文本

/*订单模块**********************************************************/

export const REQUEST_ORDER_LIST = 'REQUEST_ORDER_LIST';                                     //请求订单列表
export const FETCH_ORDER_LIST = 'FETCH_ORDER_LIST';                                         //网络请求订单列表
export const RECEIVE_ORDER_LIST = 'RECEIVE_ORDER_LIST';                                     //接手订单列表数据
export const SET_ORDER_STATUS='SET_ORDER_STATUS';                                           //设置订单列表显示类型

export const REQUEST_ORDER_DETAIL = 'REQUEST_ORDER_DETAIL';                                 //请求订单详情数据
export const FETCH_ORDER_DETAIL = 'FETCH_ORDER_DETAIL';                                     //网络请求订单详情数据
export const RECEIVE_ORDER_DETAIL = 'RECEIVE_ORDER_DETAIL';                                 //接收订单详情数据
export const CLEAR_ORDER_DETAIL = 'CLEAR_ORDER_DETAIL';                                     //清除订单详情数据

/*消息模块**********************************************************/

export const REQUEST_MESSAGE_LIST = 'REQUEST_MESSAGE_LIST';                                 //请求消息列表
export const FETCH_MESSAGE_LIST = 'FETCH_MESSAGE_LIST';                                     //发送网路请求消息列表
export const RECEIVE_MESSAGE_LIST = 'RECEIVE_MESSAGE_LIST';                                 //接受消息列表数据

export const SWITCH_LIST_TYPE = 'SWITCH_LIST_TYPE';                                         //切换消息列表显示类型
export const CLEAN_MESSAGE_SESSION = 'CLEAN_MESSAGE_SESSION';                               //清除消息未读数
export const RECEIVE_REQUEST_PRICE_LIST = 'RECEIVE_REQUEST_PRICE_LIST';                     //接受询价请求列表

export const REQUEST_CONSUMER_INFO = 'REQUEST_CONSUMER_INFO';
export const FETCH_CONSUMER_INFO = 'FETCH_CONSUMER_INFO';
export const RECEIVE_CONSUMER_INFO = 'RECEIVE_CONSUMER_INFO';
export const CLEAR_CONSUMER_INFO = 'CLEAR_CONSUMER_INFO';

export const SET_REPLY_PRICE = 'SET_REPLY_PRICE';                                           //设置价格
export const SET_REPLY_CONTENT = 'SET_REPLY_CONTENT';                                       //设置回复内容
export const SET_CUSTOMER_INPUT = 'SET_CUSTOMER_INPUT';                                     //设置买家需填表单类型
export const SET_QR_CODE = 'SET_QR_CODE';                                                   //设置收款二维码
export const REPLY_REQUEST_PRICE = 'REPLY_REQUEST_PRICE';                                   //回复询价请求
export const REPLY_REQUEST_PRICE_SUCCESS = 'REPLY_REQUEST_PRICE_SUCCESS';                   //回复询价成功

/*关于模块**********************************************************/

export const REQUEST_ACCOUNT_INFO = 'REQUEST_ACCOUNT_INFO';                                 //请求关于我的信息
export const FETCH_ACCOUNT_INFO = 'FETCH_ACCOUNT_INFO';                                     //网络请求我的信息
export const RECEIVE_ACCOUNT_INFO = 'RECEIVE_ACCOUNT_INFO';                                 //接受我的信息数据

/*TAB管理模块**********************************************************/

export const SWITCH_TAB_BAR = 'SWITCH_TAB_BAR';                                             //切换tab
export const HIDDEN_TAB_BAR = 'HIDDEN_TAB_BAR';                                             //隐藏tab
export const SHOW_TAB_BAR = 'SHOW_TAB_BAR';                                                 //显示tab

export const REQUEST_SAVE_REGID = 'REQUEST_SAVE_REGID';                                     //请求保存registrationId
export const FETCH_SAVE_REGID = 'FETCH_SAVE_REGID';                                         //网络请求保存registrationId
export const SAVE_REGID_SUCCESS = 'SAVE_REGID_SUCCESS';                                     //保存registrationId成功


