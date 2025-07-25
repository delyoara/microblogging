'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
      console.log(`${e.target.name} :`, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     console.log('Form submitted');
    await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData),
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section gauche - Image */}
          <div className="flex justify-center items-center">
            <Image
              src="https://res.cloudinary.com/dtbwsvacq/image/upload/v1753284893/journal_abqw1p.jpg"
              alt="journal"
              width={800}
              height={500}
              className="rounded-lg object-cover w-full h-auto max-h-[500px]"
            />
          </div>

          {/* Section droite - Formulaire */}
          <div className="flex flex-col justify-center">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Créez votre compte</h2>
              <p className="mt-2 text-sm text-gray-600">
                Rejoignez-nous et exprimez-vous en un éclair ⚡!
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {['prenom', 'nom', 'username', 'email', 'password'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                    {field === 'password' ? 'Mot de passe' :
                     field === 'username' ? 'Username' :
                     field === 'email' ? 'Adresse E-mail' :
                     field === 'nom' ? 'Nom' : 'Prénom'}
                  </label>
                  <div className="mt-1">
                    <input
                      id={field}
                      name={field}
                      type={field === 'email' ? 'email' :
                            field === 'passwordHash' ? 'password' : 'text'}
                      autoComplete={field}
                      required
                     value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 sm:text-sm"
                      placeholder={`Entrez votre ${field === 'passwordHash' ? 'mot de passe' : field}`}
                    />
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-orange-500"
              >
                S’inscrire
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">&rarr;</span>
              </button>
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
      <Footer />
    </>
  );
};

export default SignUpPage;
