export class Appconfig {
    public static readonly serverPort : number = 8080
    public static readonly MONGO_URL = 'mongodb+srv://mandrei09:SJFF9fFUZQrpBSP5@nodejs.clqbxdc.mongodb.net/?retryWrites=true&w=majority&appName=nodejs'
    public static readonly SECRET_KEY = 'nodeJsKey'
}

export enum StatusCodes {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    Succes = 200
}

