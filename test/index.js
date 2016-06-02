/**
 * Created by zibx on 31.05.16.
 */
var dqI = require('../index');
var assert = require('chai').assert;
describe('dequeue-index', function() {
    var q = new dqI();
    // 1. it should pass dequeue tests
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
        var d = new dqI();
        for(var i = 0; i <= 10; i++)
            d.unshift({a:i})

        for(var i = 10; i >= 0; i--)
            assert.deepEqual(d.shift(), {a:i});

        assert.equal(d.shift(), void 0);
    });
    it('push/pop first', function () {
        var d = new dqI();
        for(var i = 0; i <= 10; i++)
            d.push({a:i})

        for(var i = 10; i >= 0; i--)
            assert.deepEqual(d.pop(), {a:i});

        assert.equal(d.pop(), void 0);
    });

    // index tests
    it('remove. prime numbers', function () {
        var d = new dqI('a');
        for(var i = 0; i <= 1000; i++)
            d.push({a:i});



        [2,3,5,7,11,13,17,19,23,29,31,37].forEach(function (n) {
            for(i = n*2; i <= 1000; i+=n)
                d.remove(i);
        });
        d.remove(0);
        d.remove(1);
        var el;
        var list = d.toArray().map(function(el){return el.a})
        //console.log(list.length, list);


        assert.equal(d.length, 168); // there are 168 prime numbers before 1000 (https://primes.utm.edu/lists/small/1000.txt)


    });
});