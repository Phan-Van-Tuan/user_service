import DatabaseLoader from '../configs/database.config.js'
const db = new DatabaseLoader();

class AuthControler {
    async test(req, res, next) {
        await db.connect();
        res.json("connecting...");
        await db.disconnect()
    }
}


export default new AuthControler;