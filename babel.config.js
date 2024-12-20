module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './', // Map @ to the root directory
          },
          extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'], // Ensure Babel resolves all extensions
        },
      ],
    ],
  };
};
