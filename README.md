<h3>微信小程序商城<h3>
  接口文档：https://www.showdoc.com.cn/128719739414963 <br>
  图床文档：https://img.coolcr.cn/index/api.html <br>
  
  上手练习，没有使用框架，直接用原生的wxml，wxss + 官方api编写 <br>
  大致功能如下：
   ```
    商品轮播图
    商品分类页
    商品列表与详情页
    收藏，购物车
    支付结算（没有企业小程序所以无法正确执行）
    订单的创建与订单列表
    个人信息页 
    ...
  ```
<b>注意：</b> <br>
  1、部分接口因小程序的限制无法正确执行！如支付接口； <br>
  2、因后台接口特殊原因，无法正常返回微信用户信息对应的后台token，所以需要用到token等等的接口，如订单的创建，获取列表等等接口都是写死token，然后存到缓存中再发起请求获取数据！<br>
  <br>
效果图：<br>
  <image src="https://s3.ax1x.com/2020/12/09/rClTGn.png" />
  <image src="https://s3.ax1x.com/2020/12/09/rCl4aQ.png" />
  <image src="https://s3.ax1x.com/2020/12/09/rCl55j.png" />
  <image src="https://s3.ax1x.com/2020/12/09/rCloPs.png" />
