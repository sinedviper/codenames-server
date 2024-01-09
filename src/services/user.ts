import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { UserEntity } from '../user/entities/user.entity';
import { UserResponseInterface } from '../interfaces/user/userResponce.interface';

async function hashPassword(password: string) {
  try {
    return await hash(password, 10);
  } catch (e) {
    console.log(`${hashPassword.name}: ` + e);
  }
}

async function checkExistsUsername(
  userRepository: Repository<UserEntity>,
  username: string,
): Promise<Boolean> {
  try {
    return !!(await userRepository.findOneBy({ username }));
  } catch (e) {
    console.log(`${checkExistsUsername.name}: ` + e);
  }
}

async function generateDataForToken(user: UserEntity) {
  try {
    return {
      id: user.id,
      username: user.username,
    };
  } catch (e) {
    console.log(`${generateDataForToken.name}: ` + e);
  }
}

/*function buildUserResponseWithToken(user:UserEntity,token:string) : UserResponseInterface{
    try{
        return {
            user:{
                ...user,
                token
            }
        }
    } catch (e) {
        console.log(`${buildUserResponse.name}: `+e)
    }
}*/
function buildUserResponse(user: UserEntity): UserResponseInterface {
  try {
    return {
      user,
    };
  } catch (e) {
    console.log(`${buildUserResponse.name}: ` + e);
  }
}

export {
  hashPassword,
  checkExistsUsername,
  buildUserResponse,
  generateDataForToken,
};
