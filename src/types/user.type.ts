
export interface User{
    _id: string;
    avatar: string;
    email: string;
    password: string;
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    isBanned: boolean;
    role: string;
}
export interface SignUpType{
    email : string 
    password : string
    name : string
}