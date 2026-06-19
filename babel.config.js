module.exports = {
  presets: [
    ['@babel/preset-env', { targets: '> 0.5%, last 2 versions, not dead', useBuiltIns: 'usage', corejs: 3 }],
    ['@babel/preset-react', { runtime: 'automatic', development: process.env.NODE_ENV === 'development' }],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
