# type-gverify

typescript 实现验证码插件

## 安装下载

- 下载地址 https://github.com/yinMrsir/type-gverify/releases

- `npm i type-gverify`

- `yarn add type-gverify`

## 快速使用
```
import GVerify from 'type-gverify';

verifyCode = new GVerify({
    id: 'v_container',
});

if ((verifyCode).validate(输入的验证码)) {
    console.log('验证通过');
}

html:
<div id="v_container"></div>
```

## 参数说明
<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>容器Id</td>
    </tr>
    <tr>
	  <td>canvasId</td>
	  <td>canvas的ID</td>
	</tr>
	<tr>
      <td>width</td>
      <td>canvas宽度</td>
    </tr>
    <tr>
      <td>height</td>
      <td>canvas高度</td>
    </tr>
    <tr>
      <td>type</td>
      <td>blend:数字字母混合类型 | number:纯数字 | letter:纯字母</td>
    </tr>
    <tr>
      <td>size</td>
      <td>设置验证码长度</td>
    </tr>
  </tbody>
</table>

## demo
https://github.com/yinMrsir/typescript-admin
