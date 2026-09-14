import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      // Dev-mode only: proxy everything that isn't an API route or a Next
      // build artifact to the Vite dev server, so the frontend and backend
      // are reachable on this one port. Production serving is wired later.
      fallback:
        process.env.NODE_ENV === "development"
          ? [{ source: "/:path*", destination: "http://localhost:5173/:path*" }]
          : [],
    };
  },
};

export default nextConfig;
