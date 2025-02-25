import { motion } from "framer-motion";

const AnimatedTitle = () => {
  return (
    <motion.h1
      className="  font-bold text-center bg-gradient-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent"
      initial={{ scale: 0, y: 50 }} // État initial : invisible et décalé vers le bas
      animate={{ scale: 1, y: 0 }} // État animé : visible et à sa position normale
      transition={{ duration: 1, ease: "easeOut" }} // Durée et type de transition
    >
      <p className="uppercase text-8xl">task flow </p>
      <div className="text-white">
        task-flow votr application de gestion de tache professionnelle et de
        rendez vous
      </div>
    </motion.h1>
  );
};

export default AnimatedTitle;
