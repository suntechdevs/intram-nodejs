var assert = require('assert')
    , Invoice = require('../lib/invoice')
    ,intram=require('../../')
    , Setup =intram.Setup
    , Store =intram.Store
    , CheckoutInvoice = require('../lib/checkoutInvoice')
;

describe('CheckoutInvoice', function () {
    describe('#create()', function () {
        it('should work with valid initialization and total amount', function (done){
            this.timeout(15000);
            var setup = new Setup({
                mode: 'sandbox',
                marchandKey: 'master',
                privateKey: 'tpk_48e0bc2c9a8c3a0de4bbd69cba08e7216742adcd6cb8a504db606baa4ee87f97',
                publicKey: "f62e6daef938faa9ac4bdaeff8728513eee3f546af8700415bcac9e8bf234920",
                secret: 'tsk_ecd5dde8f5081b6387d3d0da7c11b02c14b9ec897c70907614b4fa0f1db698a2'
            });
            var store = new Store({name: 'LandryShop'});
            var invoice = new CheckoutInvoice(setup, store);
            invoice.totalAmount = 1000;
            invoice.currency = 'XOF';
            invoice.create()
                .then(function () {
                    assert.ok(invoice.url);
                    assert.ok(invoice.token);
                    done();
                });
        });
    });


});