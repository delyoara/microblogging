import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import MainArticleCard from "@/components/MainArticleCard";
import TopNewsArticle from "@/components/TopNewsArticle";

interface ArticleSummary {
  slug: string;
  imageUrl: string;
  altText: string;
  categoryName: string;
  title: string;
  description: string;
  authorName: string;
  theme: string;
}

async function getScienceArticles(): Promise<ArticleSummary[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(
    `${backendUrl}/api/posts?theme=Science%20%26%20Technologie`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(
      `Failed to fetch science articles: ${res.status} - ${errorBody}`
    );
    throw new Error("Failed to fetch science articles");
  }

  const rawArticles: ArticleSummary[] = await res.json();

  // Supprime les doublons potentiels par slug
  const seenSlugs = new Set<string>();
  const uniqueArticles: ArticleSummary[] = rawArticles.filter((article) => {
    if (seenSlugs.has(article.slug)) return false;
    seenSlugs.add(article.slug);
    return true;
  });

  return uniqueArticles;
}

const ScienceTechnologiePage: React.FC = async () => {
  const articles = await getScienceArticles();

  if (!articles || articles.length === 0) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
          <h1 className="font-josefin text-3xl font-bold text-gray-900 mb-8">
            Science & Technologie
          </h1>
          <p className="text-gray-600">Aucun article pour le moment.</p>
        </main>
        <Footer />
      </>
    );
  }

  const [mainArticle, ...otherArticles] = articles;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
        <h1 className="font-josefin text-3xl font-bold text-gray-900 mb-8">
          Science & Technologie
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Partie gauche – article principal */}
          <section className="flex-1">
            <Link
              href={`/articles/${mainArticle.slug}`}
              className="block hover:opacity-90 transition"
            >
              <MainArticleCard
                {...mainArticle}
                categoryName={mainArticle.categoryName}
              />
            </Link>
          </section>

          {/* Partie droite – autres articles en colonne */}
          <aside className="w-full lg:w-1/3 space-y-6">
            {otherArticles.length > 0 ? (
              otherArticles.map((article) => (
                <TopNewsArticle
                  key={article.slug}
                  imageUrl={article.imageUrl}
                  altText={article.altText}
                  title={article.title}
                  description={article.description}
                />
              ))
            ) : (
              <p className="text-gray-600">Aucun autre article disponible.</p>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ScienceTechnologiePage;
