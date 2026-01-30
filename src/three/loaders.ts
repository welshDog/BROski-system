import { WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export function createKTX2Loader(renderer: WebGLRenderer) {
  const ktx2 = new KTX2Loader().setTranscoderPath('/decoders/basis/');
  try {
    ktx2.detectSupport(renderer);
  } catch {}
  return ktx2;
}

export function createDracoLoader() {
  const draco = new DRACOLoader();
  draco.setDecoderPath('/decoders/draco/');
  return draco;
}

export function createGLTFLoader(renderer: WebGLRenderer) {
  const gltf = new GLTFLoader();
  gltf.setKTX2Loader(createKTX2Loader(renderer));
  gltf.setDRACOLoader(createDracoLoader());
  return gltf;
}
