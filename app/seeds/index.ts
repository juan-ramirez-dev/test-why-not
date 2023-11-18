import { createInitialRoles } from "./createInitialRoles";

export const runSeeds = async () => {
  await createInitialRoles()
}