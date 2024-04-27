export class Appconfig {
    public static readonly SERVER_PORT : number = 8080
    public static readonly MONGO_URL = 'mongodb+srv://mandrei09:SJFF9fFUZQrpBSP5@nodejs.clqbxdc.mongodb.net/?retryWrites=true&w=majority&appName=nodejs'
    public static readonly SECRET_KEY = 'nodeJsKey'
    public static readonly TOKEN_KEY = 'token'
}

export enum StatusCodes {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    Succes = 200
}

export class Routes {

    //METHODS
    public static readonly CREATE : string ='/add'
    public static readonly UPDATE : string ='/update/:id'
    public static readonly DELETE : string ='/delete/:id'

    //AUTHENTICATION
    public static readonly REGISTER : string = '/auth/register'
    public static readonly LOGIN : string = '/login'

    //USERS
    public static readonly USERS : string = '/users'

    //BREEDS
    public static readonly BREEDS : string = '/breeds'
}

