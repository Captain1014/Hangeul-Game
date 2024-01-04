
import {
  ContactShadows,
  Cylinder,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  Text,
} from "@react-three/drei";
import {
  CuboidCollider,
  CylinderCollider,
  RigidBody,
} from "@react-three/rapier";
import { useGameStore } from "../store";
import { CharacterController } from "./CharacterController";
import { Spots } from "./Spots";
import { useRef } from 'react';
import { Stage } from "./Stage3";
export const Experience = () => {
  const {currentHangeul} = useGameStore((state) => ({
    currentHangeul: state.currentHangeul,
   
  }));


  

  return (
    <>
     
      {/* LIGHTS */}
     <Environment preset="sunset" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.3}
        castShadow
        color={"#9e69da"}
      />

 {/* Stage */}
 <ContactShadows 
      frames={1}
      position={[0,-1.8, 0]}
      scale={40}
      opacity={0.22}
      far={50}
      blur={0.8}
      color={'#aa9acd'}

      />
 <RigidBody colliders={false} type="fixed" name="void">
        <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshBasicMaterial color="#e3daf7" toneMapped={false}/>
        </mesh>
        <CuboidCollider position={[0, -3.5, 0]} args={[50, 0.1, 50]} sensor />
      </RigidBody>
     

     {/* Current hangeul */}
    
      <Text position={[0,-1.3,-0.5]} fontSize={1.2} rotation-x={-Math.PI/2} >
        {currentHangeul ? currentHangeul.name.toUpperCase() : ""}
        <meshStandardMaterial color="#e3daf7" opacity={0.6} transparent/>
      </Text>
   



      <group position-y={-1}>
  
        {/* STAGE */}

        <Stage position={[21.5, -1, -13.5]} scale={[0.3,0.3,0.3]}/>
        <RigidBody
          colliders={false}
          type="fixed"
          position-y={-0.5}
          friction={2}
        >
          <CylinderCollider position={[0, 0, 0]} args={[0.2, 3.5]} />
         
        </RigidBody>

    

        {/* CHARACTER */}
        <CharacterController/>

        {/* Spots */}
        <Spots/>
      </group>
    </>
  );
};