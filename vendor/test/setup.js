var assert = require('assert'),
    Setup = require('../../').setup;

describe('Setup', function () {
    it('should initialize with environment variables when no parameters are given', function (done){
        var setup = new Setup();
        assert.strictEqual(setup.config['X-MARCHAND-KEY'], process.env.PAYDUNYA_MASTER_KEY);
        assert.strictEqual(setup.config['X-PRIVATE-KEY'], process.env.PAYDUNYA_PRIVATE_KEY);
         assert.strictEqual(setup.config['X-API-KEY'], process.env.PAYDUNYA_PUBLIC_KEY);
        assert.strictEqual(setup.config['X-SECRET-KEY'], process.env.PAYDUNYA_TOKEN);
        done();
    });

    it('should initialize with given data', function (done){
        var setup = new Setup({
            marchandKey: 'master',
            privateKey: 'tpk_5e9469e65341de91988b352eba11f9f0c5f671384e1d6bfb09ce30103bcc09903b42dfacfb2b436d4b48af01f763bbaa1748b1d6ea165d4a2f581bcfd1fd8943',
            publicKey: "5e59e0c34bb8737cedf4c0ec92d9ae94007e33e5c30280596456990d9fc2f6058147a092fa6017ab5a25150fc0dd2991cff0e49b9ee8cb04355b689769d68d44",
            secret: 'tsk_243a7b89fd82a2b4e049c0c8ff39c3012ee6ec70bda3288ad2bf6a1270439ce4245e2f1ea7e4c03beb5cd807cbc7a32c0baf7de3a1f9d9b8593bab38af6531f7'
        });
        assert.strictEqual(setup.config['X-MARCHAND-KEY'], 'master');
        assert.strictEqual(setup.config['X-PRIVATE-KEY'], 'tpk_5e9469e65341de91988b352eba11f9f0c5f671384e1d6bfb09ce30103bcc09903b42dfacfb2b436d4b48af01f763bbaa1748b1d6ea165d4a2f581bcfd1fd8943');
         assert.strictEqual(setup.config['X-API-KEY'], "5e59e0c34bb8737cedf4c0ec92d9ae94007e33e5c30280596456990d9fc2f6058147a092fa6017ab5a25150fc0dd2991cff0e49b9ee8cb04355b689769d68d44");
        assert.strictEqual(setup.config['X-SECRET-KEY'], "tsk_243a7b89fd82a2b4e049c0c8ff39c3012ee6ec70bda3288ad2bf6a1270439ce4245e2f1ea7e4c03beb5cd807cbc7a32c0baf7de3a1f9d9b8593bab38af6531f7");
        done();
    });

    it('should set to sandbox base url as endpoint in test mode', function (done){
        var setup = new Setup({mode: 'test'});
        assert.strictEqual(setup.baseURL, 'http://192.168.8.106:4200/api/v1/');
        done();
    });

    it('should set live baseURL when mode !== "test"', function (done){
        var setup = new Setup();
        assert.strictEqual(setup.baseURL, 'http://192.168.8.106:4200/api/v1/');
        done();
    });
});
