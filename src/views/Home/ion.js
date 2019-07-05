/* eslint-disable */
(function () {
  /** ES6 语法Object.assign() 的 Polyfill */
  if (!Object.assign) {
    Object.defineProperty(Object, "assign", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function (target, firstSource) {
        "use strict";
        if (target === undefined || target === null)
          throw new TypeError("Cannot convert first argument to object");
        var to = Object(target);
        for (var i = 1; i < arguments.length; i++) {
          var nextSource = arguments[i];
          if (nextSource === undefined || nextSource === null) continue;
          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
          }
        }
        return to;
      }
    });
  }

  /**
   * 随机数值
   * @param {Number} min 
   * @param {Number} max 
   */
  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * 随机颜色
   * @param {Array} colors 
   */
  function randomColor(colors) {
    return colors[randomNum(0, colors.length)];
  }
  /**
   * 判断传入值是否是节点元素
   * @param {String|Element} node 
   */
  function isElementNode(node) {
    return node.type === 1;
  }

  /** ------------------------------------------------------------------ 全局变量 ------------------------------------------------------------------ */

  /** 默认配置 */
  var defaultOptions = {
    canvasWidth: document.documentElement.clientWidth,
    canvasHeight: document.documentElement.clientHeight,
    pointNum: 50,
    pointRadius: [2, 6],
    pointColor: ['rgba(122,122,122,.3)']
  }

  /** 存点对象的数组 */
  var points = []


  /** ------------------------------------------------------------------ Ion对象 ------------------------------------------------------------------ */
  function Ion(canvasID, options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.initMain(canvasID);
  }

  /** Ion对象的原型链 */
  Ion.prototype = {
    /**
     * 初始化Main
     * @param {String|Element} canvasID 
     */
    initMain: function (canvasID) {
      this.initCanvas(canvasID);
      this.initPoints();
      window.requestAnimationFrame(this.draw.bind(this));
    },
    /**
     * 初始化Canvas
     * @param {String|Element} canvasID 
     */
    initCanvas: function (canvasID) {
      var canvas = isElementNode(canvasID) ? canvasID : document.getElementById(canvasID);
      canvas.width = this.options.canvasWidth;
      canvas.height = this.options.canvasHeight;
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
    },
    /**
     * 初始化点Point
     */
    initPoints: function () {
      var pointRadius = this.options.pointRadius;
      var canvasWidth = this.options.canvasWidth;
      var canvasHeight = this.options.canvasHeight;
      var colors = this.options.pointColor
      var pointNum = this.options.pointNum
      for (var i = 0; i < pointNum; i++) {
        var x = randomNum(0, canvasWidth - pointRadius[1] - 10);
        var y = randomNum(0, canvasHeight - pointRadius[1] - 10);
        var speedX = randomNum(-5, 5) * 0.1 + 0.1;
        var speedY = randomNum(-5, 5) * 0.1 + 0.1;
        var radius = randomNum(pointRadius[0], pointRadius[1])
        var color = randomColor(colors)
        points.push({
          x,
          y,
          radius,
          speedX,
          speedY,
          color
        })
      }
    },
    /**
     * 将点画入canvas,每帧更新
     */
    draw: function () {
      var _this = this;
      var ctx = _this.ctx;
      var canvas = _this.canvas;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < points.length; i++) {
        if (points[i].x < points[i].radius || points[i].x > canvas.width - points[i].radius) {
          points[i].speedX = - points[i].speedX;
        }
        if (points[i].y < points[i].radius || points[i].y > canvas.height - points[i].radius) {
          points[i].speedY = - points[i].speedY;
        }
        points[i].x += points[i].speedX;
        points[i].y += points[i].speedY;
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, points[i].radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = points[i].color;
        ctx.fill();

      }
      window.requestAnimationFrame(this.draw.bind(this));
    }
  }

  window.Ion = Ion
})()