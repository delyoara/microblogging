'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const raw = await res.text();
      console.log("🧾 Réponse brute du serveur :", raw);
      let data;

      try {
        data = JSON.parse(raw); 
      } catch (err) {
        throw new Error("Le serveur a renvoyé une réponse invalide.");
      }

      if (!res.ok) {
        throw new Error(data.error || "Échec de la connexion");
      }

      // ✅ Connexion réussie
      login(data.token, data.user);
      router.push("/user"); 
    } catch (err: any) {
      alert(err.message || "Erreur inattendue");
    }
  };

  return (
    <>
      <Header hideSignUpButton={true} />

      <div>
        <h1 className="font-josefin text-8xl font-black m-9 tracking-wide text-orange-500 text-center uppercase">
          LOGIN
        </h1>
      </div>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="pb-9">
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default LoginPage;
