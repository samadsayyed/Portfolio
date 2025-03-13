import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useState } from "react";
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
        const action = (actions as any)[key]; // Cast actions as any to avoid type errors
        if (action) {
          action.setLoop(THREE.LoopOnce);
          action.clampWhenFinished = true;
          action.play();
        }
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


export default Model;