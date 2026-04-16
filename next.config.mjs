/** @type {import('next').NextConfig} */
const nextConfig = {
  // Config options
  webpack: (config) => {
    // Explicitly handle webpack if needed since the user used --webpack flag
    return config;
  }
};

export default nextConfig;

/*
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

export default withPWA(nextConfig);
*/
