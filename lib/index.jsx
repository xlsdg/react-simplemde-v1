import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SimpleMDE from 'simplemde/dist/simplemde.min.js';
import _assign from 'lodash.assign';
import _isEqual from 'lodash.isequal';


import 'simplemde/dist/simplemde.min.css';


class ISimpleMDE extends React.Component {
  constructor(props) {
    // console.log('constructor', props);
    super(props);
    this.state = {
      instance: null
    };
    this._init = this._init.bind(this);
    this._bind = this._bind.bind(this);
  }
  // componentWillMount() {
    // const that = this;
    // console.log('componentWillMount', that.props, that.state);
  // }
  componentDidMount() {
    const that = this;
    // console.log('componentDidMount', that.props, that.state);
    that._init();
  }
  // componentWillReceiveProps(nextProps) {
    // const that = this;
    // console.log('componentWillReceiveProps', that.props, nextProps);
  // }
  shouldComponentUpdate(nextProps, nextState) {
    const that = this;
    // console.log('shouldComponentUpdate', that.props, nextProps, that.state, nextState);
    return (!_isEqual(nextProps.option, that.props.option));
  }
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
    that.state.instance.toTextArea();
    // that.setState({
    //   instance: null
    // });
  }
  _init() {
    const that = this;
    // console.log('_init');
    if (!that.state.instance) {
      const dom = ReactDOM.findDOMNode(that);
      const option = _assign({}, that.props.option, {
        element: dom
      });
      const instance = new SimpleMDE(option);
      that._bind(instance);
      instance.value(that.props.text);
      that.setState({
        instance: instance
      });
      that.props.onReady(instance);
    }
  }
  _bind(instance) {
    const that = this;
    // console.log('_bind');
    const _on = function(name, func) {
      if (typeof func === 'function') {
        func = func.bind(instance);
        instance.codemirror.off(name, func);
        instance.codemirror.on(name, func);
      }
    };
    for (let e in that.props.onEvents) {
      if (Array.hasOwnProperty.call(that.props.onEvents, e)) {
        _on(e.toLowerCase(), that.props.onEvents[e]);
      }
    }
  }
  render() {
    const that = this;
    // console.log('render');
    const {
      className, style
    } = that.props;

    return (
      <textarea className={className} style={style} />
    );
  }
}

ISimpleMDE.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  option: PropTypes.object.isRequired,
  onReady: PropTypes.func,
  text: PropTypes.string,
  onEvents: PropTypes.object
};

ISimpleMDE.defaultProps = {
  className: 'react-simplemde',
  style: { width: '100%', height: '100%' },
  onReady: function(instance) {},
  text: '',
  onEvents: {}
};


export default ISimpleMDE;
