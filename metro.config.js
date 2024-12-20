const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Extend resolver to include alias and file extensions
config.resolver = {
  ...config.resolver,
  alias: {
    '@': path.resolve(__dirname), // Map @ to the project root
  },
  extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
};

module.exports = withNativeWind(config, { input: './global.css' });
