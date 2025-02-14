import path from 'path';

// Resolve __dirname equivalent in ES module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};
