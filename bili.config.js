'use strict';

module.exports = {
  input: 'src/simplemde.jsx',
  outDir: 'dist',
  // config: '',
  format: ['cjs', 'umd', 'umd-min', 'es'],
  moduleName: 'ISimpleMDE',
  global: {
    'react': 'React',
    'simplemde': 'SimpleMDE'
  },
  filename: '[name][suffix].js',
  name: 'simplemde',
  // inline: false,
  // cwd: '',
  // external: [
  //   'react',
  //   'simplemde'
  // ],
  banner: false,
  postcss: {
    modules: true
  },
  js: 'babel',
  // plugin: ['vue'],
  target: 'browser',
  jsx: 'react',
  // objectAssign: undefined,
  // exports: 'auto',
  // replace: {},
  // alias: {},
  pretty: true
  // env: {},
  // virtualModules: {},
  // sizeLimit: {},
  // extendOptions: {},
};
