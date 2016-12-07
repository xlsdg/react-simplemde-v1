import React from 'react';
import ReactDOM from 'react-dom';
import SimpleMDE from 'simplemde';
import _isEqual from 'lodash.isequal';


import 'simplemde/src/css/simplemde.css';


class ISimpleMDE extends React.Component {
  constructor(props) {
    // console.log('constructor', props);
    super(props);
    this.state = {
    };
    this._init = this._init.bind(this);
  }
  _init() {
    const that = this;
    // console.log('_init');
  }
  _update() {
    const that = this;
    // console.log('_update');
  }
  componentWillMount() {
    const that = this;
    // console.log('componentWillMount', that.props, that.state);
  }
  componentDidMount() {
    const that = this;
    // console.log('componentDidMount', that.props, that.state);
    that._init();
  }
  componentWillReceiveProps(nextProps) {
    const that = this;
    // console.log('componentWillReceiveProps', that.props, nextProps);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const that = this;
    // console.log('shouldComponentUpdate', that.props, nextProps, that.state, nextState);
    return (!_isEqual(nextProps.option, that.props.option));
  }
  componentWillUpdate(nextProps, nextState) {
    const that = this;
    // console.log('componentWillUpdate', that.props, nextProps, that.state, nextState);
  }
  componentDidUpdate(prevProps, prevState) {
    const that = this;
    // console.log('componentDidUpdate', prevProps, that.props, prevState, that.state);
  }
  componentWillUnmount() {
    const that = this;
    // console.log('componentWillUnmount', that.props, that.state);
  }
  render() {
    const that = this;
    // console.log('render');
    return (
      <textarea className={that.props.className} style={that.props.style}></textarea>
    );
  }
}

ISimpleMDE.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  option: React.PropTypes.object.isRequired,
  onReady: React.PropTypes.func,
  loading: React.PropTypes.bool
};

ISimpleMDE.defaultProps = {
  className: 'react-echarts',
  style: { width: '100%', height: '100%' },
  onReady: function(instance) {},
  loading: false
};


export default ISimpleMDE;
