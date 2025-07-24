

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAPost() {
  const router = useRouter();

  // États du formulaire
  const [subject, setSubject] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [body, setBody] = useState("");

  const handleReset = () => {
    setSubject("");
    setCategoryType("");
    setBody("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = { subject, category_type: categoryType, body };

    console.log("Données envoyées :", formData);

    try {
      const res = await fetch("http://patacoeur-backend.vercel.app/api/adoptant/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Réponse du serveur :", data);

      if (res.ok) {
        handleReset();
        router.push("/confirmationform");
      } else {
        console.error("Erreur HTTP :", res.status);
        console.error("Détails :", data);
      }
    } catch (error) {
      console.error("Erreur de réseau ou JS :", error);
    }
  };

  return (
    <>
      <section className="relative h-auto min-h-[450px]">
        <div className="absolute inset-0 bg-[url('/images/bgform.jpg')] bg-no-repeat bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 min-h-[300px]">
          <h2 className="text-5xl font-bold">Postez un article</h2>
          <p className="mt-4 text-xl max-w-2xl text-justify">
            Choisissez votre catégorie, créez un sujet et publiez un article.
          </p>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-4xl shadow relative z-20 -mt-20">
          <h2 className="text-3xl font-semibold mb-6 text-center">POST</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sujet */}
            <div className="flex items-center gap-4">
              <label htmlFor="subject" className="w-24 text-right">
                Sujet :
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Définissez un sujet"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                name="subject"
                className="flex-1 border border-gray-300 rounded px-4 py-2"
              />
            </div>

            {/* Catégorie */}
            <div className="flex items-center gap-4">
              <label htmlFor="category" className="w-24 text-right">
                Catégorie :
              </label>
              <select
                id="category"
                name="category"
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
                className="flex-1 text-black h-12 block rounded-md border border-gray-300 shadow-sm focus:border-[#4682A9] focus:ring-[#4682A9]"
              >
                <option value="">Choisir</option>
                <option value="tunning">Tunning</option>
                <option value="voyage">Voyage</option>
                <option value="danse">Danse</option>
                <option value="culture">Culture</option>
              </select>
            </div>

            {/* Contenu (body) */}
            <div className="flex items-center gap-4">
              <label htmlFor="body" className="w-24 text-right">
                Contenu :
              </label>
              <input
                id="body"
                type="text"
                placeholder="Contenu de l'article"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                name="body"
                className="flex-1 border border-gray-300 rounded px-4 py-2"
              />
            </div>

            {/* Boutons */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Publier
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="text-blue-600 underline font-medium"
              >
                Réinitialiser
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}