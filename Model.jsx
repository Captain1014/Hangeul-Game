/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/human/model.gltf 
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/model.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="MyCharacter" scale={0.64}>
          <primitive object={nodes.LeftFootCtrl} />
          <primitive object={nodes.RightFootCtrl} />
          <primitive object={nodes.HipsCtrl} />
          <skinnedMesh name="characterMedium" geometry={nodes.characterMedium.geometry} material={materials['skin.001']} skeleton={nodes.characterMedium.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model.gltf')
