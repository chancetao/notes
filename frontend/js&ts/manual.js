// 实现 call
// 设置 context 默认值为 window
Function.prototype.call2 = function (context = window, ...args) {
  // 传递的参数可能是 undefined，所以设置它的默认值为 []
  args = args || [];

  // 避免原对象的属性覆盖
  const key = Symbol();
  context[key] = this;

  // 获得函数执行的结果
  const result = context[key](...args);
  // 删除之前添加的属性，以免对原对象产生污染
  delete context[key];

  return result;
};

// 实现 apply
// 实现方法基本与 call 相同，只有传参方式不同
Function.prototype.apply2 = function (context = window, args) {
  args = args || [];

  const key = Symbol();
  context[key] = this;

  const result = context[key](...args);
  delete context[key];

  return result;
};

// 实现 bind
Function.prototype.bind2 = function (context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable."
    );
  }

  // 获取调用 bind 方法的那个实体 self 和时传递的参数 args
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1);

  const fNOP = function () {};

  // fBound 即最终要返回的值
  // 先获取到调用 fBound 时方法传递的参数 bindArgs
  // 当这个方法作为构造函数调用的时候，调用实体要在这里使用 this 去获取它
  const fBound = function () {
    const bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      fNOP.prototype.isPrototypeOf(this) ? this : context,
      args.concat(bindArgs)
    );
  };

  // TODO: EXPLAIN THIS SHIT
  if (this.prototype) {
    fNOP.prototype = this.prototype;
  }
  fBound.prototype = new fNOP();

  return fBound;
};
