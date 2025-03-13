import React, { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";



const LazyModel = React.lazy(() => import("./Model"));

const Hero = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center bg-black">
      {/* 3D Section */}
      <div className="w-full h-screen md:w-1/2 md:h-screen">
        <Canvas
          className="w-full h-full"
          camera={{ position: [-8, 7, 15], fov: 45, near: 0.1, far: 1000 }}
        >
          <color attach="background" args={["#000"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />
          <Suspense fallback={null}>
            <LazyModel rotationY={100} position={[3, -2.7, 0]} scale={[1.5, 1.5, 1.5]} />
          </Suspense>
        </Canvas>
      </div>

      {/* Text Section */}
      <div className="relative z-10 w-full h-screen md:w-1/2 px-6 flex flex-col justify-center text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-7xl font-bold leading-tight text-white">
            <motion.span
              className="block reveal-text text-secondary/50"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Crafting Digital
            </motion.span>
            <motion.span
              className="block reveal-text text-gradient"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Experiences
            </motion.span>
          </h1>

          <motion.p
            className="text-lg md:text-2xl text-secondary/50 max-w-2xl mx-auto md:mx-0 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Full-stack developer specializing in creating exceptional digital experiences
            with React, Node.js, Three.js, Python, and Laravel.
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#contact"
              className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Talk
            </motion.a>
            <motion.a
              href="#projects"
              className="px-6 py-3 border border-primary/20 text-secondary font-semibold rounded-lg hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
