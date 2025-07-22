// src/app/login/page.tsx
import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Connexion", // Traduit le titre
  description: "Connectez-vous à votre compte", // Traduit la description
};

const LoginPage: React.FC = () => {
  return (
    <>
      {/* Passez hideSignUpButton={true} au composant Header */}
      <Header hideSignUpButton={true} />

      <div>
        <h1 className="font-josefin text-8xl font-black m-9 tracking-wide text-orange-500 text-center uppercase">
          S'INSCRIRE {/* Traduit le texte */}
        </h1>
      </div>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="pb-9">
          <LoginForm />
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default LoginPage;