import withMDX from '@next/mdx';

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default withMDXConfig(nextConfig);
