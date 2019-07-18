const presets = [
  [
    '@babel/env',
    {
      useBuiltIns: 'usage',
    },
  ],
  [
    '@babel/preset-react',
    {
      useBuiltIns: true,
      development: true,
    },
  ],
  [
    '@babel/preset-typescript',
    {
      allExtensions: true,
      isTSX: true,
    },
  ],
];

const plugins = [
  [
    '@babel/plugin-transform-runtime',
    {
      useESModules: true,
    },
  ],
];

module.exports = { presets, plugins };
