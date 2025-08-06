export interface Reviews{
    _id : string
    headline : string
    star : number
    content:string
    user : User
}
export interface User {
    name :string
    avatar : string
}