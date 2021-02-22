const config = require('dotenv')
const argv = require('yargs-parser')(process.argv.slice(2))['_'];
interface Ienv {
    PORT:string,
    DATABASE_NAME:string,
    DATABASE_URL:string
}
 function env():Ienv {
     if(argv[0] == "dev")
       config.config({ path: __dirname + './../environment/dev.env' })
    return {
        PORT:process.env.PORT || '8000',
        DATABASE_NAME:process.env.DATABASE_NAME || "soleman",
        DATABASE_URL:process.env.DATABASE_URL || "mongodb://localhost:27017/"
    }
}

export default env()
 
 