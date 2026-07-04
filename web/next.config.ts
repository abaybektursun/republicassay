import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: builds to ./out as plain HTML/CSS/JS.
  // Deploy to AWS S3 + CloudFront, or point AWS Amplify at this repo.
  output: "export",
  // Native View Transitions API for smooth, GPU-composited route animations.
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
