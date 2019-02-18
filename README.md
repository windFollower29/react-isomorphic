## TODO LIST
- [x] 如何解决ssr的初始数据在csr接管后重复请求的问题
- [x] 前后端路由加入鉴权（路由导航卫士？）
- [] api：服务端渲染数据请求、客户端ajax、接口代理（对接后台）、跨域等
- [x] ejs和react路由切换，数据通信
- [] react的UI库
- [] 尽量使用node/browser兼容的库，避免环境不一样写的代码有bug
- [] 关注同构对node服务器性能的影响
- [] 模拟next.js实现预加载数据的生命钩子
- [] asyncData可否获取props信息
- [] code split
- [] 脚手架：热更新、生产与开发环境区分配置、调试体验
- [] 路由文件配置整理
- [] koa程序目录整理搭建
- [] mobx


## 坑
- connect(redux)/observer(mobx)会劫持showComponentUpdate，使得路由更新时页面组件感知不到，需要套一层withRouter(react-router-dom)解决，而且所有父元素都要套啊啊啊啊([官方解答](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates))（[官宣2](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md)）
- `react-router-config`的`renderRoutes`也需要层层套，不能断裂，否则孙子组件无法渲染