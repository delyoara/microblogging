import React from 'react';
import MainArticleCard from '@/components/MainArticleCard';
import TopNewsArticle from '@/components/TopNewsArticle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image'; // Import pour les images

export const metadata = {
  title: 'FlashPost - Actualités & Blog',
  description: 'Découvrez les dernières actualités et articles sur la mode, le bien-être, la culture, le voyage et la voiture.',
};

const HomePage: React.FC = () => {
  return (
    <>
    <Header></Header>
   
    <div className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
      {/* Main Articles Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <MainArticleCard
          imageUrl="/images/main-article-1.jpg" // Remplacez par le chemin de votre image
          altText="Met Gala 2023: Celebrities Shine in Avant-Garde Fashion"
          category="Fashion"
          title="Met Gala 2023: Celebrities Shine in Avant-Garde Fashion"
          description="By sampling some of the oldest rock in the solar system, the osiris-rex mission could revise the story of the origins of life."
          authorAvatarUrl="/images/author-sam-kolder.jpg" // Remplacez par le chemin de l'avatar
          authorName="Sam Kolder"
        />
        <MainArticleCard
          imageUrl="/images/main-article-2.jpg" // Remplacez par le chemin de votre image
          altText="Gender-Fluid Fashion Gains Momentum in the Industry"
          category="Fashion"
          title="Gender-Fluid Fashion Gains Momentum in the Industry"
          description="Discover how 30s fashion trends are making a resurgence, from baggy jeans and crop tops to chunky sneakers"
          authorAvatarUrl="/images/author-david-paul.jpg" // Remplacez par le chemin de l'avatar
          authorName="David Paul"
        />
      </section>

      {/* Side Content Section (Top News & Upcoming Podcast) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Empty column for alignment on desktop, or remove if you want 2 columns below */}
        <div className="hidden lg:block"></div>

        {/* Top News Section */}
        <div className="lg:col-span-2"> {/* This div spans 2 columns on lg screens */}
          <h2 className="font-josefin text-2xl font-bold text-gray-900 mb-6">Top News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TopNewsArticle
              imageUrl="/images/top-news-1.jpg" // Remplacez par le chemin de votre image
              altText="Fashion tech startups"
              title="Startups in the fashion tech space are changing the way we shop."
              description="You've never made a website this fast before."
            />
            <TopNewsArticle
              imageUrl="/images/top-news-2.jpg" // Remplacez par le chemin de votre image
              altText="Fashion tech startups"
              title="Startups in the fashion tech space are changing the way we shop."
              description="You've never made a website this fast before."
            />
            <TopNewsArticle
              imageUrl="/images/top-news-3.jpg" // Remplacez par le chemin de votre image
              altText="Fashion tech startups"
              title="Startups in the fashion tech space are changing the way we shop."
              description="You've never made a website this fast before."
            />
          </div>
        </div>

       
      </section>
    </div>
    <Footer></Footer>
     </>
  );
};

export default HomePage;