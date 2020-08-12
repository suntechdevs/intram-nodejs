var assert = require('assert')
    , Store = require('../../').store
;

describe('Store', function () {
    it('should not initialize without required parameters', function (done){
        assert.throws(function () {new Store()});
        done();
    });

    it('should initialize without error when name is initialized', function (done){
        assert.doesNotThrow(function () {new Store({name: 'Magasin Chez Alexandra Mereum'})});
        done();
    });

    it('should set values on initialize', function (done){
        var data = {
            name: 'Magasin Chez Alexandra Mereum',
            tagline: "L'élégance n'a pas de prix",
            phoneNumber: '22967723243',
            postalAddress: 'Cotonou Benin Abomey Calavi',
            template: 'Cotonou Benin Abomey Calavi',
            color: 'Cotonou Benin Abomey Calavi',
            logo_url: 'Cotonou Benin Abomey Calavi'
        };
        var store = new Store(data);

        assert.strictEqual(store.name, data.name);
        assert.strictEqual(store.tagline, data.tagline);
        assert.strictEqual(store.phone_number, data.phoneNumber);
        assert.strictEqual(store.postal_address, data.postalAddress);
        assert.strictEqual(store.template, data.template);
        assert.strictEqual(store.color, data.color);
        assert.strictEqual(store.logo_url, data.color);
        done();
    });
});