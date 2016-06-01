/**
 * Created by zibx on 31.05.16.
 */
var dq = require('../dequeue');
var assert = require('chai').assert;
describe('dequeue', function() {
    var q = new dq();
    it('push', function () {
        q.push({a:0});
        assert.deepEqual(q.get(0), {a:0});
    });
    it('push2', function () {
        for(var i = 1; i < 100; i++)
            q.push({a:i});

        for(var i = 0; i < 100; i++)
            assert.deepEqual(q.get(i), {a:i});

    });
    it('pop', function () {
        for(var i = 0; i < 10; i++){
            assert.deepEqual(q.pop(), {a:99-i});
        }
    });
    it('shift', function () {
        for(var i = 0; i < 10; i++){
            assert.deepEqual(q.shift(), {a:i});
        }
    });
    it('unshift', function () {
        for(var i = 9; i >= -10; i--){
            q.unshift({a:i})
        }
        for(var i = 0; i < 100; i++)
            assert.deepEqual(q.get(i), {a:i-10});

        assert.equal(q.get(100), undefined);
    });
    it('shift/unshift first', function () {
        var d = new dq();
        for(var i = 0; i <= 10; i++)
            d.unshift({a:i})

        for(var i = 10; i >= 0; i--)
            assert.deepEqual(d.shift(), {a:i});

        assert.equal(d.shift(), void 0);
    });
    it('push/pop first', function () {
        var d = new dq();
        for(var i = 0; i <= 10; i++)
            d.push({a:i})

        for(var i = 10; i >= 0; i--)
            assert.deepEqual(d.pop(), {a:i});

        assert.equal(d.pop(), void 0);
    });
});