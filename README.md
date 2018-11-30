# react-simplemde-v1

> React.js(v16.x+) component wrap for SimpleMDE Markdown Editor(v1.x+)

## Installation

```
$ npm install --save simplemde react-simplemde-v1
```

## Usage

``` javascript
import ISimpleMDE from 'react-simplemde-v1';
import 'simplemde/dist/simplemde.min.css';

export default () => {
  const option = {};

  const onReady = (instance) => console.log(instance.value());

  const onEvents = {
    'change': function() {
      // the 'this' variable can get SimpleMDE instance
      console.log(this.value());
    }
  };

  return (
    <ISimpleMDE
      option={option}
      text={'Hello World!!!'}
      onReady={onReady}
      onEvents={onEvents}
    />
  );
}
```

## propTypes

``` javascript
  className:  React.PropTypes.string,
  style:      React.PropTypes.object,
  option:     React.PropTypes.object.isRequired,
  onReady:    React.PropTypes.func,
  text:       React.PropTypes.string,
  onEvents:   React.PropTypes.object
```

[Read More](https://github.com/NextStepWebs/simplemde-markdown-editor)

## defaultProps

``` javascript
  className: 'react-simplemde',
  style: {
    width: '100%',
    height: '100%'
  },
  text: '',
  onReady: instance => {},
  onEvents: {}
```

# License

MIT
