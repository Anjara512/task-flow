import { motion } from "framer-motion";

const AnimatedTitle = () => {
  return (
    <motion.h1
      className="text-8xl uppercase font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      initial={{ opacity: 0, y: 50 }} // État initial : invisible et décalé vers le bas
      animate={{ opacity: 1, y: 0 }} // État animé : visible et à sa position normale
      transition={{ duration: 1, ease: "easeOut" }} // Durée et type de transition
    >
      Task-flow
    </motion.h1>
  );
};

export default AnimatedTitle;
