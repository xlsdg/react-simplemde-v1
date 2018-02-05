import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SimpleMDE from 'simplemde';

class ISimpleMDE extends React.Component {
  constructor(props) {
    // console.log('constructor', props);
    super(props);
    this.state = {
      instance: null
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
    const {
      option,
      text,
      onReady
    } = that.props;
    const {
      instance
    } = that.state;

    if (instance) {
      return;
    }

    const dom = ReactDOM.findDOMNode(that);
    const ins = new SimpleMDE(_.assign({}, option, {
      element: dom
    }));

    if (!ins) {
      return;
    }

    that.events(ins);

    if (_.isFunction(ins.value)) {
      ins.value(text);
    }

    if (_.isFunction(onReady)) {
      setTimeout(() => onReady(ins, SimpleMDE));
    }

    that.setState({
      instance: ins
    });
  }

  uninit = () => {
    const that = this;
    const {
      instance
    } = that.state;

    if (instance && _.isFunction(instance.toTextArea)) {
      instance.toTextArea();
    }

    that.setState({
      instance: null
    });
  }

  events = (instance) => {
    const that = this;
    const {
      onEvents
    } = that.props;

    if (!instance ||
      !_.isFunction(_.get(instance, 'codemirror.on')) ||
      !_.isFunction(_.get(instance, 'codemirror.off')) ||
      !_.isPlainObject(onEvents)) {
      return;
    }

    _.forIn(onEvents, (value, key) => {
      if (_.isFunction(value)) {
        const name = _.toLower(key);
        const fn = value.bind(instance);

        instance.codemirror.off(name, fn);
        instance.codemirror.on(name, fn);
      }
    });
  }

  render() {
    const that = this;
    // console.log('render');
    const {
      className,
      style
    } = that.props;

    return (
      <textarea
        className={className}
        style={style}
      />
    );
  }
}

ISimpleMDE.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  option: PropTypes.object.isRequired,
  text: PropTypes.string,
  onReady: PropTypes.func,
  onEvents: PropTypes.object
};

ISimpleMDE.defaultProps = {
  className: 'react-simplemde',
  style: {
    width: '100%',
    height: '100%'
  },
  text: '',
  onReady: function(instance, SimpleMDE) {},
  onEvents: {}
};

ISimpleMDE.__simplemde__ = SimpleMDE;

export default ISimpleMDE;
