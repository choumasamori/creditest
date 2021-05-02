import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
 const Name = types.model({
  title: types.string,
  first:types.string,
  last:types.string
})
const Street = types.model({
  number: types.number,
  name:types.string
})
const Coordinates = types.model({
  latitude: types.string,
  longitude:types.string
})
const Timezone = types.model({
  offset: types.string,
  description:types.string
})
const Location = types.model({
  street: Street,
  city:types.string,
  state:types.string,
  country:types.string,
  postcode:types.union(types.string, types.number),
  coordinates:Coordinates,
  timezone:Timezone
})
const Login = types.model({
  uuid: types.string,
  username:types.string,
  password:types.string,
  salt:types.string,
  md5:types.string,
  sha1:types.string,
  sha256:types.string
})
const Dob = types.model({
  date: types.string,
  age:types.number
})
const Registered = types.model({
  date: types.string,
  age:types.number
})
const Id = types.model({
  name: types.string,
  value:types.union(types.string,types.null)
})
const Picture = types.model({
  large: types.string,
  medium:types.string,
  thumbnail:types.string
})

const User = types
    .model({
        gender:types.string,
        name: Name,
        location:Location,
        email:types.string,
        login:Login,
        dob:Dob,
        registered:Registered,
        phone:types.string,
        cell:types.string,
        id:Id,
        picture:Picture,
        nat:types.string

    })
    const UserModel = types.model({
      data:types.array(User)
    }).actions((self) => ({
      saveJSON(jsonData){
        //console.log(jsonData);
           self.data = jsonData;    
         }
   })).views((self) => ({
      getJson(){
        //console.log(self.data)
       return self.data
    }
  }))
 /*
    export const UserModel = types.model({
      data: types.string
    }).actions((self) => ({
      saveJSON(jsonData){
        console.log(jsonData);
           self.data = JSON.stringify(jsonData)        
         }
   })).views((self) => ({
      getJson(){
        
       return JSON.parse(self.data)
    }
  }))
  */
  export const store = UserModel.create({
    data: [] // users is required here because it's not marked as optional
  });
  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
