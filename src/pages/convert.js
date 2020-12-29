import * as Cambria from 'cambria';
import * as Yaml from 'js-yaml';
import { Component, useState } from 'react';
import arenaBlock from '~/src/arena-schema.json';
import roamBlock from '~/src/roam-schema.json';
import arenaSchema from '~/src/arena-groves.lens.yml';
import roamSchema from '~/src/roam-groves.lens.yml';

const convert = () => {
  let arenaToRoam = () => {
    const lens = Cambria.loadYamlLens(JSON.stringify(arenaSchema));

    const grovesDoc = Cambria.applyLensToDoc(lens, arenaBlock);

    console.log(JSON.stringify(grovesDoc));
  };

  let roamToArena = () => {
    const lens = Cambria.loadYamlLens(JSON.stringify(roamSchema));

    const grovesDoc = Cambria.applyLensToDoc(lens, roamBlock);

    console.log(JSON.stringify(grovesDoc));
  };

  // should we reverse this lens?
  // if (program.reverse) {
  //   lens = reverseLens(lens);
  // }

  return (
    <>
      <button onClick={arenaToRoam}>Arena to Roam</button>
      <button onClick={roamToArena}>Roam to Arena</button>
    </>
  );
};

export default convert;
