import {hash} from "bcrypt"
import {UserEntity} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {UserResponseInterface} from "../interfaces/user/userResponce.interface";

async function hashPassword(password:string){
    try{
        return await hash(password,10)
    } catch (e) {
       console.log(`${hashPassword.name}: `+e)
    }
}

async function checkExistsUsername(userRepository: Repository<UserEntity>, username: string) : Promise<Boolean>{
    try{
        return !!await userRepository.findOneBy({username})
    } catch (e) {
        console.log(`${checkExistsUsername.name}: `+e)
    }
}

function buildUserResponse(user:UserEntity) : UserResponseInterface{
    try{
        return {user}
    } catch (e) {
        console.log(`${buildUserResponse.name}: `+e)
    }
}

export {hashPassword,checkExistsUsername,buildUserResponse}