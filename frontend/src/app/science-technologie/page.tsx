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
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(
      `${backendUrl}/api/posts?theme=${encodeURIComponent("Science & Technologie")}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(
        `Échec récupération articles : ${res.status} - ${errorBody}`
      );
      return [];
    }

    const rawArticles: ArticleSummary[] = await res.json();

    // Supprime les doublons de slug
    const seenSlugs = new Set<string>();
    return rawArticles.filter((article) => {
      if (seenSlugs.has(article.slug)) return false;
      seenSlugs.add(article.slug);
      return true;
    });
  } catch (error) {
    console.error(" Erreur serveur lors du fetch des articles :", error);
    return [];
  }
}

const ScienceTechnologiePage = async () => {
  const articles = await getScienceArticles();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
        <h1 className="font-josefin text-3xl font-bold text-gray-900 mb-8">
          Science & Technologie
        </h1>

        {articles.length === 0 ? (
          <p className="text-gray-600">Aucun article pour le moment.</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Article principal */}
            <section className="flex-1">
              <Link
                href={`/articles/${articles[0].slug}`}
                className="block hover:opacity-90 transition"
              >
                <MainArticleCard
                  {...articles[0]}
                  categoryName={articles[0].categoryName}
                />
              </Link>
            </section>

            {/* Autres articles à droite */}
            <aside className="w-full lg:w-1/3 space-y-6">
              {articles.slice(1).length > 0 ? (
                articles.slice(1).map((article) => (
                  <TopNewsArticle
                    key={article.slug}
                    slug={article.slug} 
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
        )}
      </main>
      <Footer />
    </>
  );
};

export default ScienceTechnologiePage;
