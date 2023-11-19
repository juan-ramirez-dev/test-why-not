import Roles from "../models/Roles"


export const createInitialRoles = async () => {

  const roles = [
    {
      name : 'Admin',
      slug : 'principal-admin',
      can_managment_tournaments : true,
      can_managment_users : true,
      can_participate_tournaments : false
    },
    {
      name : 'Participant',
      slug : 'default-participant',
      can_managment_tournaments : false,
      can_managment_users : false,
      can_participate_tournaments : true
    }
  ]

  //@INFO : Create roles and validate exist.
  for (const _rol of roles) {
    const _current = await Roles.findOne({ slug : _rol.slug }).lean()
    if(!_current) await Roles.create({ ..._rol })
  }
}