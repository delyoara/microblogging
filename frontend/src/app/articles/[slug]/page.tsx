import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; 
import { Components } from "react-markdown";
import { ComponentPropsWithoutRef } from "react";                                  
import Image from "next/image";
import Link from "next/link";
 type ArticlePageParams = { slug: string };
interface ArticleDetail {
  slug: string;
  imageUrl: string;
  altText: string;
  categoryName: string;
  title: string;
  description: string;
  authorName: string;
  content: string;
  theme: string;
}                                                                 

// Composants personnalisés pour le rendu Markdown
const customComponents: Components = {

   p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-lg text-gray-700 leading-relaxed mb-6" {...props} />
  ),

// Titres de niveau 2 (h2)
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4" {...props} />
  ),
};






export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`);
    if (!res.ok) return [];

    const articles: ArticleDetail[] = await res.json();
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

interface ArticlePageProps {
  params: { slug: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  if (!params?.slug) {
    return notFound();
  }

  const currentSlug = params.slug;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${currentSlug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return notFound();
    const article: ArticleDetail = await res.json();
    if (!article) return notFound();

    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Titre principal */}
          <h1 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
            {article.title}
          </h1>

          <div className="text-center mb-12 py-8">
            <p className="text-2xl text-gray-600 font-light italic leading-relaxed max-w-3xl mx-auto">
              {article.description}
            </p>
          </div>

          {/* Métadonnées */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Par{" "}
              <span className="font-semibold text-gray-700 ml-1">
                {article.authorName}
              </span>
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              dans{" "}
              <span className="font-medium text-black ml-1">
                {article.categoryName}
              </span>
            </span>
          </div>

          {/* Image */}
          {article.imageUrl && (
            <div className="mb-12 **group**"> {/* Keep the 'group' class here */}
              <Image
                src={article.imageUrl}
                alt={article.altText}
                width={1200}
                height={600}
                className="w-full max-h-[600px] object-cover rounded-2xl shadow-2xl border border-gray-100 **grayscale transition-all duration-500 group-hover:grayscale-0**"
              />
            </div>
          )}

          {/* Contenu avec composants personnalisés */}
          <article className="max-w-none">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <ReactMarkdown
                components={customComponents}
                rehypePlugins={[rehypeRaw]}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Section de fin avec gradient */}
          <div className="mt-16 pt-8 text-center">
            <div className="w-full h-px "></div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
              <p className="text-gray-600 italic">
                Merci d&apos;avoir lu cet article. N&apos;hésitez pas à le partager !
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/articles"
              className="inline-flex items-center text-black hover:text-blue-800 text-lg font-medium transition-colors duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Retour aux articles
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error in ArticlePage:", error);
    return notFound();
  }
}
