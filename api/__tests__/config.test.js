// Loading Configuration settings
const config = require('../config');

describe('Validate Configuration file', () => {
    it('should validate Database URL', () => {
        let dbURL = config.getDBURL();
        expect(dbURL).not.toBe(undefined);
    })
    it('should validate Port', () => {
        let port = config.getPort();
        expect(port).not.toBe(undefined);
    })
    it('should validate Front-end URL', () => {
        let frontEndURL = config.getFrontEndURL();
        expect(frontEndURL).not.toBe(undefined);
    })
    it('should validate User', () => {
        let user = config.getUser();
        expect(user).not.toBe(undefined);
    })
    it('should validate Password', () => {
        let pwd = config.getPwd();
        expect(pwd).not.toBe(undefined);
    })
})