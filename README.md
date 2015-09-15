# fis3-postprocessor-extras_uri
fis 资源定位增强

## 场景
fis 可以很好的将 html 中 img, link, script 等的路径在发布的时候做转换，比如：
```html
<!-- 发布前 -->
<script src="js/main.js"></script>
<!-- 发布后 -->
<script src="http://9.cdn/baba/main.33333.js"></script>
```

局限性是仅限有资源的元素适用，下面这种情况是无能为力的：
```html
<meta name="touch_icon" content="img/toucn.png" />
```

本插件就是解决上述问题。

## 安装
```
npm i fis3-postprocessor-extras_uri -g
```

## 使用
配置文件 fis-conf.js：
```js
fis.match('*.html', {
    postprocessor: fis.plugin('extras_uri')
});
```

HTML 中：
```html
<!-- 发布前 -->
<meta name="touch_icon" content="fis__extras__uri(img/toucn.png)" />

<!-- 发布后 -->
<meta name="touch_icon" content="http://9.cdn/baba/img/toucn.png" />
```
