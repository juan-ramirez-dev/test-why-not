import Roles from "../models/Roles"


export const createInitialRoles = async () => {

  const roles = [
    {
      name : 'Admin',
      slug : 'principal-admin',
      can_create_tournaments : true
    },
    {
      name : 'Participant',
      slug : 'default-participant',
      can_create_tournaments : false
    }
  ]

  //@INFO : Create roles and validate exist.
  for (const _rol of roles) {
    const _current = await Roles.findOne({ slug : _rol.slug }).lean()
    if(!_current) await Roles.create({ ..._rol })
  }
}