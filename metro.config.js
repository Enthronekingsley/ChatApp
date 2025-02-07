// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

// Add support for Node.js core modules
config.resolver.extraNodeModules = {
  crypto: require.resolve('react-native-crypto'), // Polyfill for crypto
  stream: require.resolve('stream-browserify'), // Polyfill for stream
  vm: require.resolve('vm-browserify'), // Polyfill for vm
};

// Apply NativeWind configuration
module.exports = withNativeWind(config, { input: './global.css' });