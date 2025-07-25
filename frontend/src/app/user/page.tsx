"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CreateAPost from "@/components/CreateAPost";
import { useAuth } from "@/context/AuthContext";
import { fetchWithAuth } from "../utils/fetchWithAuth";



interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
}

type View = "info" | "create-post" | "my-posts";

export default function UserPage() {
  const { user, token, logout } = useAuth();
  const [currentView, setCurrentView] = useState<View>("info");
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Charger les posts de l'utilisateur connecté
useEffect(() => {
  const fetchPosts = async () => {
    if (!user) return; // on ne vérifie plus token ici, car il est géré en global
    try {
      const res = await fetchWithAuth(`http://localhost:3001/api/users/${user.id}`);
      const data = await res.json();

      if (res.ok) {
        setPosts(data.posts || []);
      } else {
        console.error("Erreur de récupération des posts :", data.error);
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
    }
  };

  fetchPosts();
}, [user]);


  const startEdit = (post: Post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditTitle("");
    setEditContent("");
  };

  const handleUpdatePost = (id: string) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, title: editTitle, content: editContent } : post
    );
    setPosts(updatedPosts);
    handleCancelEdit();
  };

  const confirmDeletePost = () => {
    if (postToDelete) {
      setPosts(posts.filter((post) => post.id !== postToDelete));
      setPostToDelete(null);
    }
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  if (!user) return <p className="text-center text-gray-500 mt-10">Chargement...</p>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
        <header className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0">
            Bienvenue, {user.prenom} {user.nom} !
          </h1>
          <nav className="flex space-x-2 sm:space-x-4">
            <button onClick={() => setCurrentView("info")} className={`px-4 py-2 rounded-lg ${currentView === "info" ? "bg-orange-300 text-black" : "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-black"}`}>Mes informations</button>
            <button onClick={() => setCurrentView("create-post")} className={`px-4 py-2 rounded-lg ${currentView === "create-post" ? "bg-orange-300 text-black" : "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-black"}`}>Créer un post</button>
            <button onClick={() => setCurrentView("my-posts")} className={`px-4 py-2 rounded-lg ${currentView === "my-posts" ? "bg-orange-300 text-black" : "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-black"}`}>Mes posts</button>
            <button onClick={() => setShowLogoutModal(true)} className="px-4 py-2 rounded-lg bg-black text-white hover:bg-orange-300 hover:text-black shadow-md">Déconnexion</button>
          </nav>
        </header>

        <main className="bg-white p-6 rounded-lg shadow-md">
          {currentView === "info" && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Mes informations</h2>
              <div className="space-y-3">
                <p><strong>Prénom :</strong> {user.prenom}</p>
                <p><strong>Nom :</strong> {user.nom}</p>
                <p><strong>Username :</strong> {user.username}</p>
                <p><strong>Email :</strong> {user.email}</p>
              </div>
            </section>
          )}

          {currentView === "create-post" && <CreateAPost />}

          {currentView === "my-posts" && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Mes posts</h2>
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border hover:shadow-md">
                      {editingPostId === post.id ? (
                        <>
                          <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full mb-2 p-2 border rounded" />
                          <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full mb-2 p-2 border rounded" />
                          <div className="flex justify-end space-x-2">
                            <button onClick={handleCancelEdit} className="px-3 py-1 rounded bg-black text-white hover:bg-orange-300 hover:text-black">Annuler</button>
                            <button onClick={() => handleUpdatePost(post.id)} className="px-3 py-1 rounded bg-black text-white hover:bg-orange-300 hover:text-black">Valider</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-xl font-semibold">{post.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{post.content.substring(0, 100)}...</p>
                          <div className="flex justify-end space-x-2">
                            <button onClick={() => startEdit(post)} className="px-3 py-1 rounded bg-black text-white hover:bg-orange-300 hover:text-black">Modifier</button>
                            <button onClick={() => setPostToDelete(post.id)} className="px-3 py-1 rounded bg-black text-white hover:bg-orange-300 hover:text-black">Supprimer</button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Vous n'avez pas encore de posts.</p>
              )}
            </section>
          )}
        </main>

        {postToDelete && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
              <h3 className="text-xl font-bold mb-4">Supprimer ce post ?</h3>
              <p className="text-gray-700 mb-6">Cette action est irréversible. Voulez-vous continuer ?</p>
              <div className="flex justify-end space-x-4">
                <button onClick={() => setPostToDelete(null)} className="px-4 py-2 rounded-lg bg-gray-200">Annuler</button>
                <button onClick={confirmDeletePost} className="px-4 py-2 rounded-lg bg-black text-white hover:bg-orange-300 hover:text-black">Supprimer</button>
              </div>
            </div>
          </div>
        )}

        {showLogoutModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
              <h3 className="text-xl font-bold mb-4">Confirmer la déconnexion</h3>
              <p className="text-gray-700 mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
              <div className="flex justify-end space-x-4">
                <button onClick={() => setShowLogoutModal(false)} className="px-4 py-2 rounded-lg bg-gray-200">Annuler</button>
                <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-black text-white hover:bg-orange-300 hover:text-black">Déconnexion</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
