module.exports = {
  reactStrictMode: true,
  // I don't want it to run when compiling as I trust the CI stage of the pipeline and Husky.
  ignoreDuringBuilds: true,
  images: {
    domains: ['artworks.thetvdb.com', 'image.tmdb.org', 'lh3.googleusercontent.com'],
  },
};
