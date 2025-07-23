"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CreateAPost() {
  const router = useRouter();

  // États du formulaire
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [themeId, setThemeId] = useState("");

  const handleReset = () => {
    setTitle("");
    setBody("");
    setCategoryName("");
    setThemeId("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      userId: null, // ou ton user ID réel s'il est disponible
      themeId: parseInt(themeId),
      categoryName: categoryName,
      title: title,
      description: body.slice(0, 150),
      imageUrl: "",
      altText: "",
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      content: body,
    };

    console.log("Données envoyées :", formData);

  try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  let data = null;

  if (res.headers.get("content-type")?.includes("application/json")) {
    data = await res.json(); // Lis le JSON UNE SEULE FOIS
  } else {
    data = await res.text();
  }

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
      <Header />
      <section className="relative h-auto min-h-[450px]">
        <div className="absolute inset-0 bg-[url('/images/bgform.jpg')] bg-no-repeat bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 min-h-[300px]">
          <h2 className="text-5xl font-bold">Postez un article</h2>
          <p className="mt-4 text-xl max-w-2xl text-justify">
            Choisissez un thème, une catégorie, créez un sujet et publiez un article.
          </p>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-4xl shadow relative z-20 -mt-20">
          <h2 className="text-3xl font-semibold mb-6 text-center">POST</h2>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Titre */}
            <div className="flex items-center gap-4">
              <label htmlFor="title" className="w-32 text-right">Titre :</label>
              <input
                id="title"
                type="text"
                placeholder="Définissez un titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-4 py-2"
              />
            </div>


            {/* Thème */}
            <div className="flex items-center gap-4">
              <label htmlFor="themeId" className="w-32 text-right">Thème :</label>
              <select
                id="themeId"
                value={themeId}
                onChange={(e) => setThemeId(e.target.value)}
                className="flex-1 text-black h-12 block rounded-md border border-gray-300 shadow-sm focus:border-[#4682A9] focus:ring-[#4682A9]"
              >
                
                <option value="">Choisir</option>
                <option value="1">Voiture</option>
                <option value="2">Voyage</option>
                <option value="3">Danse</option>
                <option value="4">Culture</option>
              </select>
            </div>


            {/* Catégorie */}
<div className="flex items-center gap-4">
  <label htmlFor="category" className="w-32 text-right">Catégorie :</label>
  <input
    id="category"
    type="text"
    placeholder="Ex: Voyage, Actu, Cinéma, etc."
    value={categoryName}
    onChange={(e) => setCategoryName(e.target.value)}
    className="flex-1 border border-gray-300 rounded px-4 py-2"
  />
</div>



            {/* Contenu */}
            <div className="flex items-center gap-4">
              <label htmlFor="body" className="w-32 text-right">Contenu :</label>
              <textarea
                id="body"
                placeholder="Contenu de l'article"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-4 py-2 h-32"
              />
            </div>

            {/* Boutons */}
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Publier
              </button>
              <button type="button" onClick={handleReset} className="text-blue-600 underline font-medium">
                Réinitialiser
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
