'use strict';

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var _assign = _interopDefault(require('lodash-es/assign'));
var _isFunction = _interopDefault(require('lodash-es/isFunction'));
var _get = _interopDefault(require('lodash-es/get'));
var _isPlainObject = _interopDefault(require('lodash-es/isPlainObject'));
var _forIn = _interopDefault(require('lodash-es/forIn'));
var _toLower = _interopDefault(require('lodash-es/toLower'));
var React = _interopDefault(require('react'));
var SimpleMDE = _interopDefault(require('simplemde'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === 'object' || typeof call === 'function')) {
    return call;
  }

  return _assertThisInitialized(self);
}

var ISimpleMDE =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(ISimpleMDE, _React$Component);

    function ISimpleMDE(props) {
      var _this;

      _classCallCheck(this, ISimpleMDE);

      // console.log('constructor', props);
      _this = _possibleConstructorReturn(this, _getPrototypeOf(ISimpleMDE).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'init', function() {
        var that = _assertThisInitialized(_assertThisInitialized(_this));

        var _that$props = that.props,
          option = _that$props.option,
          text = _that$props.text,
          onReady = _that$props.onReady;
        var instance = that.state.instance;

        if (!that.dom) {
          return;
        }

        if (instance) {
          return;
        }

        var ins = new SimpleMDE(
          _assign({}, option, {
            element: that.dom,
          })
        );

        if (!ins) {
          return;
        }

        that.events(ins);

        if (_isFunction(ins.value)) {
          ins.value(text);
        }

        if (_isFunction(onReady)) {
          setTimeout(function() {
            return onReady(ins, SimpleMDE);
          });
        }

        that.setState({
          instance: ins,
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'uninit', function() {
        var that = _assertThisInitialized(_assertThisInitialized(_this));

        var instance = that.state.instance;

        if (instance && _isFunction(instance.toTextArea)) {
          instance.toTextArea();
        }

        that.setState({
          instance: null,
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'events', function(instance) {
        var that = _assertThisInitialized(_assertThisInitialized(_this));

        var onEvents = that.props.onEvents;

        if (
          !instance ||
          !_isFunction(_get(instance, 'codemirror.on')) ||
          !_isFunction(_get(instance, 'codemirror.off')) ||
          !_isPlainObject(onEvents)
        ) {
          return;
        }

        _forIn(onEvents, function(value, key) {
          if (_isFunction(value)) {
            var name = _toLower(key);

            var fn = value.bind(instance);
            instance.codemirror.off(name, fn);
            instance.codemirror.on(name, fn);
          }
        });
      });

      _this.dom = null;
      _this.state = {
        instance: null,
      };
      return _this;
    } // componentWillMount() {
    // const that = this;
    // console.log('componentWillMount', that.props, that.state);
    // }

    _createClass(ISimpleMDE, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var that = this; // console.log('componentDidMount', that.props, that.state);

          that.init();
        }, // componentWillReceiveProps(nextProps) {
        // const that = this;
        // console.log('componentWillReceiveProps', that.props, nextProps);
        // }
        // shouldComponentUpdate(nextProps, nextState) {
        //   const that = this;
        //   // console.log('shouldComponentUpdate', that.props, nextProps, that.state, nextState);
        //   return !_.isEqual(nextProps.option, that.props.option);
        // }
        // componentWillUpdate(nextProps, nextState) {
        // const that = this;
        // console.log('componentWillUpdate', that.props, nextProps, that.state, nextState);
        // }
        // componentDidUpdate(prevProps, prevState) {
        // const that = this;
        // console.log('componentDidUpdate', prevProps, that.props, prevState, that.state);
        // }
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var that = this; // console.log('componentWillUnmount', that.props, that.state);

          that.uninit();
        },
      },
      {
        key: 'render',
        value: function render() {
          var that = this; // console.log('render');

          var _that$props2 = that.props,
            className = _that$props2.className,
            style = _that$props2.style;
          return React.createElement('textarea', {
            className: className,
            style: style,
            ref: function ref(e) {
              that.dom = e;
            },
          });
        },
      },
    ]);

    return ISimpleMDE;
  })(React.Component);

_defineProperty(ISimpleMDE, 'defaultProps', {
  className: 'react-simplemde',
  style: {
    width: '100%',
    height: '100%',
  },
  text: '',
  onReady: function onReady(instance, SimpleMDE$$1) {},
  onEvents: {},
});

ISimpleMDE.__simplemde__ = SimpleMDE;

module.exports = ISimpleMDE;
