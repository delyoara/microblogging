"use client"; 

import Header from "@/components/Header";
import { motion } from "framer-motion";


export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />

      {/* Section avec image de fond */}
      <div className="inset-1 bg-[url('/bgform.jpg')] bg-no-repeat bg-cover bg-center -z-10">
        <div className="inset-0 bg-black/50">
          <div className="z-10 flex flex-col items-center justify-center text-center text-white px-6 min-h-[300px]">
            <h2 className="text-4xl font-bold mb-6 drop-shadow-md">
              Bienvenue sur FlashPost 
            </h2>
            <p className="text-lg max-w-3xl text-white/90 drop-shadow">
              Ici, on mixe culture, bien-être, voyages inspirants et passion
              pour l’automobile. Un espace où l’on partage des découvertes, des
              réflexions, et des instants de vie… toujours avec style,
              curiosité, et un soupçon d’adrénaline.
            </p>
          </div>
        </div>
      </div>

      {/* Bloc texte animé au scroll */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 py-12 text-justify text-gray-800 leading-relaxed text-lg"
      >
        <p>
          Nous sommes <strong>Vanessa</strong>, <strong>Daniela</strong>,{" "}
          <strong>Petronela</strong> et <strong>Renaud</strong> — quatre
          passionné·e·s réuni·e·s grâce à notre formation à{" "}
          <strong>Ada Tech School</strong>. Ensemble, nous avons décidé de créer
          ce microblogging pour partager ce qui nous fait vibrer, chacun·e dans
          son univers.
        </p>
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li>
            <strong>Vanessa</strong> vous emmène en voyage, à la découverte
            de paysages, de cultures locales et de petits coins de paradis.
          </li>
          <li>
            <strong>Daniela</strong> explore la culture sous toutes ses
            formes : cinéma, littérature, expos, tendances et coups de cœur
            artistiques.
          </li>
          <li>
            <strong>Petronela</strong> vous guide vers le bien-être, entre
            routines holistiques, alimentation consciente et équilibre
            intérieur.
          </li>
          <li>
            <strong>Renaud</strong>, lui, vit à fond sa passion pour le
            tuning et l’univers automobile – entre performances mécaniques,
            esthétique et lifestyle motorisé.
          </li>
        </ul>
        <p>
          Ce projet est né de notre envie commune de créer un espace vivant,
          libre et inspirant. <strong>FlashPost</strong> est notre terrain
          d’expression, un endroit où chaque voix trouve sa place, et où
          chacun·e peut s’identifier, découvrir et s’évader, même le temps d’un
          éclair 
        </p>
    
      </motion.div>
    </main>
  );
}
