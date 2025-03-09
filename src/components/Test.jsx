import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

// Function to convert degrees to radians
const degToRad = (degrees) => (degrees * Math.PI) / 180;

function Model({ rotationY = 90 }) {
  const { scene, animations } = useGLTF("/face.glb");
  console.log(scene,"------------");
  
  const { actions } = useAnimations(animations, scene);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  // Apply rotation dynamically
  scene.rotation.y = degToRad(rotationY);

  useEffect(() => {
    if (actions) {
      Object.keys(actions).forEach((key) => {
        const action = actions[key];
        action.setLoop(THREE.LoopOnce); // Play only once
        action.clampWhenFinished = true; // Stop at last frame
        action.play();
      });

      scene.traverse((child) => {
        if (child.isMesh && child.name.toLowerCase() == "plane") {
            // console.log(child,"Lofb");
            
          child.visible = false;
        }
      });
  

      // Wait for animation to finish before showing red spotlight
      const maxDuration = Math.max(...animations.map((a) => a.duration)) * 1000;
      setTimeout(() => setAnimationPlayed(true), maxDuration);
    }
  }, [actions, animations]);

  return (
    <>
      <primitive object={scene} />
      {animationPlayed && (
      <spotLight
      position={[-10, 3, 0]}
      intensity={100}
      color="red"
      angle={0.5}    // Increase for a wider, softer spread
      penumbra={0.5} // Increase for softer edges
      castShadow
    />
    

      )}
    </>
  );
}

export default function App() {
  return (
    <Canvas style={{ position: "absolute", width: "100vw", height: "100vh" }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls />
      {/* Pass custom rotation in degrees */}
      <Model rotationY={90} />
    </Canvas>
  );
}
