import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // These modules are not used in the client-side bundle.
    if (!isServer) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            'fs': false,
            'net': false,
            'tls': false,
        };
    }
    // Fix for handlebars
    config.externals.push({
        'handlebars': 'commonjs handlebars'
    });
    // Fix for opentelemetry
    config.externals.push({
        '@opentelemetry/instrumentation': 'commonjs @opentelemetry/instrumentation'
    })
    return config;
  },
};

export default nextConfig;
