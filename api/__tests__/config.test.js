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
})