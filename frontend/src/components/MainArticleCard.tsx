// src/components/MainArticleCard.tsx
import React from 'react';
import Image from 'next/image';
// Remove Link import as it's no longer needed inside this component
// import Link from 'next/link';

interface MainArticleCardProps {
  slug: string;
  imageUrl: string;
  altText: string;
  category: string;
  title: string;
  description: string;
  authorName: string;
  content: string;
}

const MainArticleCard: React.FC<MainArticleCardProps> = ({
  slug,
  imageUrl,
  altText,
  category,
  title,
  description,
  authorName,
  content,
}) => {
  return (
    <article className="bg-white rounded-lg overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative w-full h-80 lg:h-96">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          style={{ objectFit: 'cover' }}
          className="rounded-t-lg"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <span className="font-montserrat text-sm text-gray-500 uppercase tracking-wider mb-2">
          {category}
        </span>
        <h3 className="font-josefin text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
          {/* Remove the Link component here */}
          {title}
        </h3>
        <p className="font-montserrat text-base text-gray-600 mb-6 flex-grow">
          {description}
        </p>

        {/* Author */}
        <div className="flex items-center">
          <span className="font-montserrat text-sm font-semibold text-gray-800">
            By {authorName}
          </span>
        </div>
      </div>
    </article>
  );
};

export default MainArticleCard;