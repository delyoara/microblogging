
import { articlesCinema } from '@/app/data/articles/articlesCinema'
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ArticlePageProps {
  params: { slug: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articlesCinema.find(a => a.slug === params.slug);

  if (!article) return notFound();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <img src={article.imageUrl} alt={article.altText} className="mb-4 rounded" />
        <p className="text-gray-700 mb-8">{article.content}</p>

        {/* Tu peux ajouter ici des composants : commentaires, likes, auteur, etc. */}
      </main>
      <Footer />
    </>
  );
}
