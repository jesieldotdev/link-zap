// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite qualquer domínio usando HTTPS
      },
    ],
  },
};
