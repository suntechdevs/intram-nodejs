let assert = require('assert')
    , Invoice = require('../lib/invoice')
    , intram = require('../lib/')
    , Setup = intram.Setup
    , Store = intram.Store
;

describe('Invoice', function (){
    describe('#addItem()', function () {
        it('should add item to invoice', function (done){
            let setup = new Setup({mode: 'sandbox'});
            let store = new Store({name: 'landryShop'});
            let invoice = new Invoice(setup, store);
            invoice.addItem('LG', 1, 5000, 5000, 'gadget lg');
            assert.strictEqual(invoice.items.item_1.name, 'lg');
            assert.strictEqual(invoice.items.item_1.quantity, 1);
            assert.strictEqual(invoice.items.item_1.unit_price, 5000);
            assert.strictEqual(invoice.items.item_1.total_price, 5000);
            assert.strictEqual(invoice.items.item_1.description, 'gadget l');

            //add another item
            invoice.addItem('Galaxy Phone', 1, 400000, 400000);
            assert.strictEqual(invoice.items.item_2.name, 'Galaxy Phone');
            done();
        });
    });

    describe('#addTax()', function () {
        it('should add tax with valid parameters', function (done){
            let setup = new Setup({mode: 'sandbox'});
            let store = new Store({name: 'landryShop', returnURL: 'http://landryShop.com/callback'});
            let invoice = new Invoice(setup, store);
            invoice.addTax('TVA', 18);
            assert.strictEqual(invoice.taxes.tax_1.name, 'TVA');
            assert.strictEqual(invoice.taxes.tax_1.amount, 18);
            done();
        });
    });


    describe('#addChannels()', function () {
        it('should add channels with valid parameters', function (done){
            let setup = new Setup({mode: 'sandbox'});
            let store = new Store({name: 'landryShop', returnURL: 'http://landryShop.com/callback'});
            let invoice = new Invoice(setup, store);
            invoice.addChanels(['MTN-BENIN', 'orange-money-senegal', 'card']);
            assert.strictEqual(invoice.channels[0], 'MTN');
            assert.strictEqual(invoice.channels[1], 'orange-money-senegal');
            assert.strictEqual(invoice.channels[2], 'card');
            done();
        });
    });

    describe('#addCustomData', function () {
        it('should add custom data', function (done){
            let setup = new Setup({mode: 'sandbox'});
            let store = new Store({name: 'landryShop'});
            let invoice = new Invoice(setup, store);
            invoice.addCustomData('size', 'large');
            assert.strictEqual(invoice.customData.size, 'large');
            done();
        });
    });

    describe('#generateRequestBody()', function () {
        it('should fail with invalid parameters', function (done) {
            let setup = new Setup({mode: 'sandbox'});
            let store = new Store({name: 'landryShop', returnURL: 'http://landryShop.com/callback'});
            let invoice = new Invoice(setup, store);
            assert.throws(function () {
                invoice.generateRequestBody();
            });
            invoice.totalAmount = 50000;
            invoice.currency = "XOF";
            assert.doesNotThrow(function () {
                invoice.generateRequestBody();
            });
            invoice.addTax('TVA', 18);
            invoice.addCustomData('size', 'large');
            let body = invoice.generateRequestBody();
            assert.strictEqual(body.invoice.amount, 50000);
            assert.strictEqual(body.invoice.currency, "XOF");
            assert.strictEqual(body.store.name, 'landryShop');
            assert.strictEqual(body.actions.return_url, 'http://landryShop.com/callback');
            assert.strictEqual(body.invoice.taxes.tax_1.name, 'TVA');
            assert.strictEqual(body.invoice.taxes.tax_1.amount, 18);
            assert.strictEqual(body.custom_data.size, 'large');
            done();
        });
    });

});
