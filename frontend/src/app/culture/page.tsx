// app/page.tsx or pages/index.tsx
import React from "react";
import MainArticleCard from "@/components/MainArticleCard";
import TopNewsArticle from "@/components/TopNewsArticle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articlesCinema } from "../data/articles/articlesCinema";
import { topCinema } from "../data/articles/topCinema";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />

      <div className="flex flex-row container mx-auto px-4 py-8 md:px-8 lg:px-16">
        {/* Main Articles Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {articlesCinema.map((article, index) => (
            <Link
              href={`/articles/${article.slug}`}
              key={index}
              className="hover:opacity-90 transition duration-300 block"
            >
              <MainArticleCard {...article} />
            </Link>
          ))}
        </section>

        {/* Top News Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="hidden lg:block" />

          <div className="lg:col-span-2">
            <h2 className="font-josefin text-2xl font-bold text-gray-900 mb-6">
              Top News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topCinema.map((article, index) => (
                <TopNewsArticle key={index} {...article} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;