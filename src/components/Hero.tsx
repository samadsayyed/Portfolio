import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const degToRad = (degrees: number) => (degrees * Math.PI) / 180;

type ModelProps = {
  rotationY?: number;
  position?: [number, number, number];
  scale?: [number, number, number];
};

function Model({ rotationY = 90, position = [0, 0, 0], scale = [1, 1, 1] }: ModelProps) {
  const { scene, animations } = useGLTF("/face.glb");
  const { actions } = useAnimations(animations, scene);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [spotlightIntensity, setSpotlightIntensity] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  scene.rotation.y = degToRad(rotationY);
  scene.position.set(...position);
  scene.scale.set(...scale);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = -(clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (actions) {
      Object.keys(actions).forEach((key) => {
        const action = actions[key];
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();
      });

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name.toLowerCase() === "plane") {
          child.visible = false;
        }
      });

      const maxDuration = Math.max(...animations.map((a) => a.duration)) * 1000;
      setTimeout(() => {
        setAnimationPlayed(true);
        let intensity = 0;
        const interval = setInterval(() => {
          intensity += 10;
          setSpotlightIntensity(intensity);
          if (intensity >= 200) clearInterval(interval);
        }, 200);
      }, maxDuration);
    }
  }, [actions, animations]);

  return (
    <>
      <primitive 
        object={scene} 
        rotation={[mousePos.y * 0.1, degToRad(rotationY) + mousePos.x * 0.2, 0]} 
      />
      {animationPlayed && (
        <spotLight
          position={[-12, 6, 0]}
          intensity={spotlightIntensity}
          color="red"
          angle={0.5}
          penumbra={0.5}
          castShadow
        />
      )}
    </>
  );
}

const Hero: React.FC = () => {
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
          <Model rotationY={100} position={[3, -2.7, 0]} scale={[1.5, 1.5, 1.5]} />
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
