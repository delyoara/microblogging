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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("")

  const handleReset = () => {
    setTitle("");
    setBody("");
    setCategoryName("");
    setThemeId("");
    setImageUrl("");
  };

  // Fonction pour créer un slug valide
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '') // Supprimer les caractères spéciaux
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .replace(/-+/g, '-') // Supprimer les tirets multiples
      .replace(/^-|-$/g, ''); // Supprimer les tirets en début/fin
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Empêcher la double soumission
    
    setIsSubmitting(true);

    // Validation côté client
    if (!title.trim() || !body.trim() || !categoryName.trim() || !themeId) {
      alert("Veuillez remplir tous les champs obligatoires.");
      setIsSubmitting(false);
      return;
    }

    const formData = {
      userId: 3,
      themeId: parseInt(themeId),
      categoryName: categoryName.trim(),
      title: title.trim(),
      description: body.trim().slice(0, 150),
      imageUrl: imageUrl.trim(),
      altText: createSlug(title),
      slug: createSlug(title),
      content: body.trim(),
    };

    console.log("Données envoyées :", formData);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      let data = null;

      if (res.headers.get("content-type")?.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      console.log("Réponse du serveur :", data);

      if (res.ok) {
        alert("Article créé avec succès !");
        handleReset();
        router.push("/confirmationform");
      } else {
        // Afficher l'erreur spécifique du serveur
        const errorMessage = typeof data === 'object' && data.error 
          ? data.error 
          : "Erreur lors de la création de l'article";
        alert(errorMessage);
        console.error("Erreur HTTP :", res.status, data);
      }
    } catch (error) {
      console.error("Erreur de réseau ou JS :", error);
      alert("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <section className="relative h-auto min-h-[450px]">
<div
  className="absolute inset-0 bg-no-repeat bg-cover bg-center"
  style={{ backgroundImage: "url('https://res.cloudinary.com/dtbwsvacq/image/upload/v1753349509/create-2437747_1280_dlkoqs.webp')" }}
/>        <div className="absolute inset-0 bg-black/50" />
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
              <label htmlFor="title" className="w-32 text-right">
                Titre <span className="text-red-500">*</span>:
              </label>
              <input
                id="title"
                type="text"
                placeholder="Définissez un titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-4 py-2"
                required
                maxLength={200}
              />
            </div>

            {/* Thème */}
            <div className="flex items-center gap-4">
              <label htmlFor="themeId" className="w-32 text-right">
                Thème <span className="text-red-500">*</span>:
              </label>
              <select
                id="themeId"
                value={themeId}
                onChange={(e) => setThemeId(e.target.value)}
                className="flex-1 text-black h-12 block rounded-md border border-gray-300 shadow-sm focus:border-[#4682A9] focus:ring-[#4682A9]"
                required
              >
                <option value="">-- Choisir un thème --</option>
                <option value="1">Culture</option>
                <option value="2">Voiture</option>
                <option value="3">Danse</option>
                <option value="4">Voyage</option>
              </select>
            </div>

            {/* Catégorie */}
            <div className="flex items-center gap-4">
              <label htmlFor="category" className="w-32 text-right">
                Catégorie <span className="text-red-500">*</span>:
              </label>
              <input
                id="category"
                type="text"
                placeholder="Ex: Lifestyle, Actu, Cinéma, etc."
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-4 py-2"
                required
                maxLength={50}
              />
            </div>

              {/* Images */}
            <div className="flex items-center gap-4">
              <label htmlFor="images" className="w-32 text-right">
                Image URL <span className="text-red-500">*</span>:
              </label>
              <input
                id="images"
                type="text"
                placeholder="Mettez l'URL de votre image (Image libre des droits!)"
                value={imageUrl}
                onChange={(e) => setCategoryName(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-4 py-2"
                required
                maxLength={50}
              />
            </div>

            {/* Contenu */}
            <div className="flex items-start gap-4">
              <label htmlFor="body" className="w-32 text-right pt-2">
                Contenu <span className="text-red-500">*</span>:
              </label>
              <textarea
                id="body"
                placeholder="Contenu de l'article"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-4 py-2 h-32 resize-vertical"
                required
                minLength={10}
              />
            </div>

            {/* Boutons */}
            <div className="flex justify-between">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`px-6 py-2 rounded text-white font-medium ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-400'
                }`}
              >
                {isSubmitting ? "Publication..." : "Publier"}
              </button>
              <button 
                type="button" 
                onClick={handleReset} 
                disabled={isSubmitting}
                className="text-black font-medium hover:underline disabled:opacity-50"
              >
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