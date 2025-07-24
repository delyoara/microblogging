import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SignUpPage: React.FC = () => {
  return (
    <>
    <Header></Header>
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section de gauche - Image */}
        <div className="flex justify-center items-center">
          <img
            className="rounded-lg object-cover w-full h-auto max-h-[500px]"
            src="https://res.cloudinary.com/dtbwsvacq/image/upload/v1753284893/journal_abqw1p.jpg" // Remplacez par l'URL de votre image désirée
            alt="journal"
          />
        </div>

        {/* Section de droite - Formulaire d'inscription */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              Créez votre compte
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
Rejoignez-nous et exprimez-vous en un éclair ⚡!          </p>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Nom Complet
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  focus:border-orange-500 sm:text-sm"
                  placeholder="Entrez votre nom complet"
                />
              </div>
            </div>

            <div>
              <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                Adresse E-mail
              </label>
              <div className="mt-1">
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  focus:border-orange-500 sm:text-sm"
                  placeholder="Entrez votre adresse e-mail"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 sm:text-sm"
                  placeholder="Entrez votre mot de passe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmez le mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 sm:text-sm"
                  placeholder="Confirmez votre mot de passe"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-orange-500"
              >
                S'inscrire
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  &rarr;
                </span>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <a href="/login" className="font-medium text-black hover:underline">
                Connectez-vous
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default SignUpPage;