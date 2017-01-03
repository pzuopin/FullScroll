# FullScroll

极小的原生JS全屏滑动插件，不需要设置容器大小定位等样式。

## 用法

* 用new关键字创建实例

```javascript
var app = new FullScroll();
```

## 必要参数

* wrapper：最外层容器
* container：滑动的容器
* items：每一页

## 可配置参数

* isFollow：页面是否跟随手指拖动，类型：布尔值、默认值：false
* speed：滑动的速度，单位：秒、默认值：.5（0.5s）
* fn：回调函数，并声明形参表示当前页

### 完整实例

```javascript
var app1 = new Fullscroll({
    /*必传参数*/
    wrapper: '.aaa', // 外面的盒子
    container: '.bbb', // 里面滚的盒子
    items: '.bbb li', // 每一页
    /*可配置参数*/
    isFollow: true, // 页面是否跟随手指，默认false
    speed: .6, // 滚动速度，单位秒，默认.5
    fn: function(p) { // 回调函数，p为当前页索引值
        console.log(p)
    }
});
```

