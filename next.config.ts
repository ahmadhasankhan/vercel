import withMDX from '@next/mdx';

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // Any other config
};

export default withMDXConfig(nextConfig);
