/**
 * Created by zibx on 01.06.16.
 */
/*
Itteratable linked list with fast item search

Complexity:
 FindByIndex: ~1 (js hashtable realization)
 GetByPosition: best - 1, worst - N/2
 DeleteByIndex: ~1 (js hashtable realization)

Memory:
 Linked list with next\prev in each node
 Object that maps keys to items

 */
module.exports = (function () {


    'use strict';
    var dq = require('z-lib-structure-dequeue');

    var Index = function (id) {
        this.key = id || 'id';
        this.index = {};
        this.dequeue = new dq();
    };
    Index.prototype = {
        key: 'id',
        _addIndex: function (item, el) {
            this.index[item[this.key]] = el;
        },
        _clearIndex: function (id) {
            delete this.index[id];
        },
        push: function (item) {
            var res = this.dequeue.push(item);
            this._addIndex(item, this.dequeue.lastUsed);
            this.length = this.dequeue.length;
            return res;
        },
        unshift: function (item) {
            var res = this.dequeue.unshift(item);
            this._addIndex(item, this.dequeue.lastUsed);
            this.length = this.dequeue.length;
            return res;
        },
        pop: function () {
            var res = this.dequeue.pop();
            res && this._clearIndex(res[this.key]);
            this.length = this.dequeue.length;
            return res;
        },
        shift: function () {
            var res = this.dequeue.shift();
            res && this._clearIndex(res[this.key]);
            this.length = this.dequeue.length;
            return res;
        },
        remove: function (id) {
            var pointer = this.index[id],
                next;

            if(!pointer)
                return false;

            next = pointer.next;

            this.dequeue.length--;
            this.length = this.dequeue.length;
            if (pointer.prev)
                pointer.prev.next = next;
            else {
                this.dequeue.first = next;
                next.prev = null;
            }

            if (next)
                next.prev = pointer.prev;
            else {
                this.dequeue.last = pointer.prev;
                pointer.prev.next = null;
            }

            this._clearIndex(id);
            return true;
        },
        getById: function (id) {
            return this.index[id].data;
        },
        splice: function (pos, count) {
            var dq = this.dequeue,
                args = slice.call(arguments, 0),
                res, out;
            out = dq.splice.apply(dq, args);
            res = this.dequeue.lastUsed;
            this.length = this.dequeue.length;
            return out;
        },
        slice: function () {

        },
        set: function (id, item) {

        },
        indexOf: function (item) {
            return this.dequeue.indexOf(item);
        },
        toArray: function () {
            return this.dequeue.toArray();
        },
        get: function (index) {
            return this.dequeue.get(index)
        }
    };
    return Index;
})();