/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "via.placeholder.com", // ✅ Ajoute ce domaine
    ],
  },
};

export default nextConfig;



