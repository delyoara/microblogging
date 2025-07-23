// src/app/culture/page.tsx
import React from "react";
import MainArticleCard from "@/components/MainArticleCard";
import TopNewsArticle from "@/components/TopNewsArticle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

interface ArticleSummary {
  slug: string;
  imageUrl: string;
  altText: string;
  categoryName: string; // Ensure this matches your backend's formatPostForFrontend
  title: string;
  description: string;
  authorName: string;
  theme: string;
}

interface TopNewsArticleProps {
  slug: string;
  imageUrl: string;
  altText: string;
  title: string;
  description: string;
  categoryName: string; // Add if top news also uses categoryName
  authorName: string;   // Add if top news also uses authorName
  theme: string;        // Add if top news also uses theme
}

// Function to fetch articles specifically for the "Culture" theme
async function getCultureArticles(): Promise<ArticleSummary[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log("Fetching culture articles from:", `${backendUrl}/api/posts?theme=Culture`);
  const res = await fetch(`${backendUrl}/api/posts?theme=Culture`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Failed to fetch culture articles: ${res.status} - ${errorBody}`);
    throw new Error('Failed to fetch culture articles');
  }
  return res.json();
}

// You might also need to do this for getTopCultureNews if it's showing incorrect data
async function getTopCultureNews(): Promise<TopNewsArticleProps[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/top-posts?theme=Culture`, {
    cache: 'no-store', // Also disable caching here
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Failed to fetch top culture news: ${res.status} - ${errorBody}`);
    throw new Error('Failed to fetch top culture news');
  }
  return res.json();
}


const CulturePage: React.FC = async () => {
  const cultureArticles = await getCultureArticles();
  const topCultureNews = await getTopCultureNews();

  console.log("Frontend (culture page): Articles fetched:", cultureArticles); // Keep this for debugging

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
        <h1 className="font-josefin text-3xl font-bold text-gray-900 mb-8">
          Culture
        </h1>

        <div className="flex flex-row">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 flex-grow">
                {cultureArticles.length > 0 ? (
                    cultureArticles.map((article) => (
                        <Link
                            href={`/articles/${article.slug}`}
                            key={article.slug}
                            className="hover:opacity-90 transition duration-300 block"
                        >
                            {/* Make sure MainArticleCard expects categoryName */}
                            <MainArticleCard {...article} categoryName={article.categoryName} />
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-600 col-span-full">Aucun article sur la culture trouvé pour le moment.</p>
                )}
            </section>

            <section className="ml-8 w-1/3 min-w-[300px] hidden lg:block">
                <h2 className="font-josefin text-2xl font-bold text-gray-900 mb-6">
                    Le plus populaire
                </h2>
                <div className="grid grid-cols-1 gap-6">
                    {topCultureNews.length > 0 ? (
                        topCultureNews.map((article) => (
                            <TopNewsArticle key={article.slug} {...article} />
                        ))
                    ) : (
                        <p className="text-gray-600">Aucune actualité culturelle récente.</p>
                    )}
                </div>
            </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CulturePage;