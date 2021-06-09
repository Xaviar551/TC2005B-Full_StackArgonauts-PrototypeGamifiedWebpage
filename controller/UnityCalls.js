export default class UnityCallsController {
    constructor(dbObject) {
        this.dbObject = dbObject;
    }
    // {id: number, Nombre: string, ....}
    async get_Special_Event(params) {
        return this.dbObject.gSpecial_Event(params);
    }
    async post_Special_Event(params) {
        return this.dbObject.pSpecial_Event(params);
    }
    async get_User_Points(params) {
        return this.dbObject.User_Points(params);
    }
    async get_Mars_Building(params) {
        return this.dbObject.gMars_Building(params);
    }
    async post_Mars_Building(params) {
        return this.dbObject.pMars_Building(params);
    }
    async get_User_History() {
        return this.dbObject.User_History();
    }
}
