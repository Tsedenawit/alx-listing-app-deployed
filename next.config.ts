import type { NextConfig } from "next";

const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "source.unsplash.com", "placehold.co"], dangerouslyAllowSVG: true,
    // add all the hosts you use
  },
};

export default nextConfig;
