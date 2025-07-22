"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CreateAPost from "@/components/createAPost";


export default function PostPage() {
  // États requis par CreateAPost
  const [sujet, setSujet] = useState("");
  const [categorie_type, setCategorieType] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    console.log("Formulaire soumis :", {
      sujet,
      categorie_type,
      body,
    });
  };

  const handleReset = () => {
    setSujet("");
    setCategorieType("");
    setBody("");
  };

  return (
    <main className="relative min-h-screen">
      <Header />
 
<CreateAPost/>
    </main>
  );
}