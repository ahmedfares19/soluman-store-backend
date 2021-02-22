import bcrypt  from 'bcrypt';
export function encryptPassword(pwd:string):Promise<string>{
    return new Promise(async (resolve , reject ) => {
        try{
           const hashedPassword = await bcrypt.hashSync(pwd , 8);
           resolve(hashedPassword);
        }catch(err){
            reject(err)
        }
    })
}

export function checkEncryptedPassword(pwd:string , hashedPassword:string):Promise<boolean>{
    return new Promise(async (resolve , reject) => {
        try{
            const isEqual = bcrypt.compareSync(pwd , hashedPassword)
            resolve(isEqual)
        } catch(err) {
            reject(err)
        }
    })

}