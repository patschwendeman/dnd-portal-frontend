import { SceneDetail } from '../models/models'

export const getSceneByKey = <K extends keyof SceneDetail>(
  key: K,
  value: SceneDetail[K],
  sceneDetails: SceneDetail[]
): SceneDetail => {
  const scene = sceneDetails.find((scene) => scene[key] === value)
  if (!scene) {
    throw new Error(`Scene with ${String(key)} ${value} not found`)
  }
  return scene
}

export const getSceneById = (
  id: number,
  scenes: SceneDetail[]
): SceneDetail => {
  const scene = scenes.find((scene) => scene.id === id)
  if (!scene) {
    throw new Error(`Scene with id ${id} not found`)
  }
  return scene
}
