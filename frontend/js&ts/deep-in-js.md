### 作用域

JavaScript采用词法作用域（lexical scoping），也就是**静态作用域**。即函数的作用域在函数定义的时候就确定了。如下的例子：

```javascript
const value = 1;

function foo() {
  console.log(value);
}

function bar() {
  const value = 2;
  foo();
}

bar(); // 1
```

执行 `foo` 函数的时候，先从 `foo` 内部查找是否有局部变量 `value` 。如果没有，就根据书写的位置，查找上一层代码，此时有 `value = 1` ，所以结果会打印 1。

### 执行上下文栈

