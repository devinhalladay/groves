import * as Cambria from 'cambria';
import arenaBlock from '~/src/arena-schema.json';
import roamBlock from '~/src/roam-schema.json';
import arenaSchema from '~/src/arena-groves.lens.yml';
import roamSchema from '~/src/roam-groves.lens.yml';

export const arenaToRoam = () => {
  const lens = Cambria.loadYamlLens(JSON.stringify(arenaSchema));

  const grovesDoc = Cambria.applyLensToDoc(lens, arenaBlock);

  console.log(JSON.stringify(grovesDoc));

  return grovesDoc;
};

export const roamToArena = () => {
  const lens = Cambria.loadYamlLens(JSON.stringify(roamSchema));

  const grovesDoc = Cambria.applyLensToDoc(lens, roamBlock);

  console.log(JSON.stringify(grovesDoc));

  return grovesDoc;
};
