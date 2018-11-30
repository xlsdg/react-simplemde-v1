import _assign from 'lodash-es/assign';
import _isFunction from 'lodash-es/isFunction';
import _get from 'lodash-es/get';
import _isPlainObject from 'lodash-es/isPlainObject';
import _forIn from 'lodash-es/forIn';
import _toLower from 'lodash-es/toLower';

import React from 'react';
import SimpleMDE from 'simplemde';

class ISimpleMDE extends React.Component {
  static defaultProps = {
    className: 'react-simplemde',
    style: {
      width: '100%',
      height: '100%',
    },
    text: '',
    onReady: (instance, SimpleMDE) => {},
    onEvents: {},
  };

  constructor(props) {
    // console.log('constructor', props);
    super(props);
    this.dom = null;
    this.state = {
      instance: null,
    };
  }
  // componentWillMount() {
  // const that = this;
  // console.log('componentWillMount', that.props, that.state);
  // }
  componentDidMount() {
    const that = this;
    // console.log('componentDidMount', that.props, that.state);
    that.init();
  }
  // componentWillReceiveProps(nextProps) {
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
  componentWillUnmount() {
    const that = this;
    // console.log('componentWillUnmount', that.props, that.state);
    that.uninit();
  }

  init = () => {
    const that = this;
    const { option, text, onReady } = that.props;
    const { instance } = that.state;

    if (!that.dom) {
      return;
    }

    if (instance) {
      return;
    }

    const ins = new SimpleMDE(
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
      setTimeout(() => onReady(ins, SimpleMDE));
    }

    that.setState({
      instance: ins,
    });
  };

  uninit = () => {
    const that = this;
    const { instance } = that.state;

    if (instance && _isFunction(instance.toTextArea)) {
      instance.toTextArea();
    }

    that.setState({
      instance: null,
    });
  };

  events = instance => {
    const that = this;
    const { onEvents } = that.props;

    if (
      !instance ||
      !_isFunction(_get(instance, 'codemirror.on')) ||
      !_isFunction(_get(instance, 'codemirror.off')) ||
      !_isPlainObject(onEvents)
    ) {
      return;
    }

    _forIn(onEvents, (value, key) => {
      if (_isFunction(value)) {
        const name = _toLower(key);
        const fn = value.bind(instance);

        instance.codemirror.off(name, fn);
        instance.codemirror.on(name, fn);
      }
    });
  };

  render() {
    const that = this;
    // console.log('render');
    const { className, style } = that.props;

    return (
      <textarea
        className={className}
        style={style}
        ref={e => {
          that.dom = e;
        }}
      />
    );
  }
}

ISimpleMDE.__simplemde__ = SimpleMDE;

export default ISimpleMDE;
