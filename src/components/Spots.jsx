import { Center, Cylinder, Sphere, Text3D } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { useGameStore } from "../store";



export const Spots = () => {
  const { level, hangeulTouched, currentStage, mode } = useGameStore((state) => ({
    level: state.level,
    hangeulTouched: state.hangeulTouched,
    currentStage: state.currentStage,
    mode: state.mode,
  }));


 const config = useControls({
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    samples: { value: 10, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0, min: 0, max: 10, step: 0.01 },
    ior: { value: 1, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0, min: 0, max: 1 },
    anisotropy: { value: 0, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationDistance: { value: 1, min: 0, max: 10, step: 0.01 },
    attenuationColor: "#ffffff",
    color: "#efbeff",
    bg: "#ffffff",
  });

  if (!level) {
    return null;
  }

  return level[currentStage].map((hangeul, index) => (
    <group
      key={`${currentStage}-${hangeul.name}`}
      rotation-y={(index / level[currentStage].length) * Math.PI * 2}
    >
      <group position-x={3} position-z={-1} position-y={-0.1}>
        <RigidBody
          colliders={false}
          type="fixed"
          onCollisionEnter={() => {
            hangeulTouched(hangeul);
          }}
        >
          <CylinderCollider args={[0.25 / 2, 0.7]} />
          <Cylinder scale={[0.7, 0.25, 0.7]}>
            <meshStandardMaterial transparent />
          </Cylinder>
        </RigidBody>


          <Sphere scale={[0.8, 0.8, 0.8]} position-y={0.8}>
            <meshPhysicalMaterial {...config} />
          </Sphere>


        <Center position-y={0.8}>
          <Text3D
            font={"./fonts/Noto Serif KR Black_Regular.json"}
            size={0.82}
            rotation-y={-(index / level[currentStage].length) * Math.PI * 2}
          >
            {mode === "korean"
              ? hangeul.character
              : ""}
            <meshNormalMaterial color="#ebbe89" toneMapped={false}/>
          </Text3D>
        </Center>
      </group>
    </group>
  ));
};