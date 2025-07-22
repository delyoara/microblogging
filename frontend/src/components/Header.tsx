// src/components/Header.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Only Menu and X are needed

// Définir les types des props du Header
interface HeaderProps {
  hideSignUpButton?: boolean; // Rendre la prop optionnelle
}

export default function Header({ hideSignUpButton }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white relative">
      {/* Top section: Title and Tagline */}
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-6xl font-serif font-bold text-black mb-2">
          FlashPost
        </h1>
        <p className="text-base text-gray-700 font-sans italic">
          Exprime-toi en un éclair⚡
        </p>

        {/* Sign Up button at the top right for DESKTOP ONLY */}

        {/* This will be hidden on mobile, and the button will appear in the mobile menu */}
        <div className="hidden md:block absolute top-4 right-4 md:top-8 md:right-8">

   <Link
            href="/create-a-post"
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 hover:border-black transition-colors duration-200"
          >
            create-a-post
          </Link>

          <Link
            href="/signup"
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 hover:border-black transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>

        {/* Ce bouton est masqué si hideSignUpButton est vrai */}
        {!hideSignUpButton && ( // Condition pour masquer le bouton
          <div className="hidden md:block absolute top-4 right-4 md:top-8 md:right-8">
            <Link
              href="/login"
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 hover:border-black transition-colors duration-200"
            >
              Login  {/* Traduit le texte */}
            </Link>
          </div>
        )}
      </div>

      {/* Navigation Section */}
      <div className="relative border-t border-b border-gray-300 py-3">
        {/* Container for desktop menu and mobile toggle button */}
        <div className="flex items-center justify-center md:justify-between px-4 md:px-8">
          {/* Hamburger/X menu button for mobile (centered on mobile) */}
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>

          {/* Desktop Navigation Links (centered on desktop) */}
          <div className="hidden md:flex flex-grow justify-center space-x-8 text-gray-700 text-lg">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <Link href="/bien-etre" className="hover:text-black"> {/* Correction du slug */}
              Bien être
            </Link>
            <Link href="/culture" className="hover:text-black">
              Culture
            </Link>
            <Link href="/voyage" className="hover:text-black">
              Voyage
            </Link>
            <Link href="/voiture" className="hover:text-black">
              Voiture
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`absolute top-full left-0 w-full bg-white z-10 py-4 border-b border-gray-300 ${
            isMenuOpen ? "flex" : "hidden"
          } flex-col items-center space-y-4 md:hidden`}
        >
          {/* Sign Up button inside mobile menu (visible ONLY when menu is open) */}
          {/* Ce bouton est masqué si hideSignUpButton est vrai */}
          {!hideSignUpButton && ( // Condition pour masquer le bouton
            <Link
              href="/login"
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 hover:border-black transition-colors duration-200 mb-4"
              onClick={() => setIsMenuOpen(false)} // Close menu after click
            >
              S'INSCRIRE {/* Traduit le texte */}
            </Link>
          )}

          {/* Existing mobile menu links */}
          <Link
            href="/"
            className="text-gray-700 text-lg hover:text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/bien-etre" // Correction du slug
            className="text-gray-700 text-lg hover:text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            Bien être
          </Link>
          <Link
            href="/culture"
            className="text-gray-700 text-lg hover:text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            Culture
          </Link>
          <Link
            href="/voyage"
            className="text-gray-700 text-lg hover:text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            Voyage
          </Link>
          <Link
            href="/voiture"
            className="text-gray-700 text-lg hover:text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            Voiture
          </Link>
        </div>
      </div>
    </nav>
  );
}