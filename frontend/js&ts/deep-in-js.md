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

JavaScript的可执行代码有三种类型：全局代码、函数代码、eval代码。

当执行一个函数的时候，就会进行"准备工作"，更具有含义的说法就是**执行上下文**（Execution Context）。

函数往往数量众多且层层嵌套，于是 JavaScript引擎创建了**执行上下文栈**（Execution Context Stack）来管理。

我们可以定义执行上下文栈是一个数组：

```javascript
const ECStack = [];
```

当 JavaScript 开始要解释执行代码的时候，需要初始化一个全局执行上下文globalContext。在整个应用程序结束之前，globalContext 一直存在栈底。

```javascript
ECStack = [
  globalContext
];
```

现在 JavaScript 遇到了一下代码：

```javascript
function func3() {
  console.log("func3");
}

function func2() {
  func3();
}

function func1() {
  func2();
}

func1();
```

每执行一个函数，就会创建一个执行上下文，并且将它入栈，执行完成后再从栈里弹出。所以：

```javascript
// 伪代码

// fun1()
ECStack.push(<fun1> functionContext);

// fun1调用了fun2，还要创建fun2的执行上下文
ECStack.push(<fun2> functionContext);

// fun2还调用了fun3！
ECStack.push(<fun3> functionContext);

// fun3执行完毕
ECStack.pop();

// fun2执行完毕
ECStack.pop();

// fun1执行完毕
ECStack.pop();

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
```

### 变量对象

对于每一个执行上下文，都有三个重要属性：

- 变量对象（Variable Object）
- 作用域链（Scope Chain）
- this

执行上下文的代码会分成**分析**和**执行**两个阶段处理。

**变量对象**是执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。进入执行阶段之后，变量对象转变为了**活动对象**（Active Object），里面的属性才能被访问。

它们其实都是同一个对象，只是处于执行上下文的不同生命周期。

变量对象包括：

1. 函数的所有形参
2. 函数声明
3. 变量声明

举个例子：

```javascript
function foo(a) {
  let b = 2;
  function c() {}
  let d = function () {};
  b = 3;
}

foo(1);
```

在分析阶段：

```javascript
VO = {
  arguments: {
    0: 1,
    length: 1,
  },
  a: 1,
  b: undefined,
  c: reference to function() {},
  d: undefined,
};
```

在执行阶段：

```javascript
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}
```

### 作用域链

当查找变量的时候，会先从当前上下文的变量对象中查找。

如果没有找到，就会从父级（词法层面上的父级）执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。

这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

函数内部有一个属性 `[[scope]]`，函数创建的时候，就会保存所有父变量对象到其中，但是它并不代表完整的作用域链！

举个例子：

```javascript
function foo() {
  function bar() {
    // ...
  }
}
```

函数创建时，各自的`[[scope]]` 为：

```javascript
foo.[[scope]] = [
  globalContext.VO
];

bar.[[scope]] = [
    fooContext.AO,
    globalContext.VO
];
```



### this

### 执行上下文

### 闭包

