import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Asistensia – Software Consulting",
    short_name: "Asistensia",
    description: "Ruby on Rails, PHP/Laravel and DevOps consulting.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1B2A4A",
    icons: [
      { src: "/assets/logo/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/logo/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { src: "/assets/logo/favicon/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
