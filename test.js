
'use strict';

const test = require('tap').test;
const typifyJSON = require('self-ref');

test('stringify simple', function (t) {
  let str = typifyJSON.stringify({
    foo: 'bar'
  });
  t.equal(str, '{"foo":"bar"}');
  t.end();
});

test('stringify with replacer', function (t) {
  let str = typifyJSON.stringify({
    foo: 'bar'
  }, function (key, val) {
    console.log(key, val);
    t.equal(key, 'foo');
    t.equal(val, 'bar');
    return key + val;
  });
  t.equal(str, '{"foo":"foobar"}');
  t.end();
});

test('stringify with space', function (t) {
  let str = typifyJSON.stringify({
    foo: 'bar',
    tar: 123
  }, null, 2);
  t.equal(str, '{\n  "foo": "bar",\n  "tar": 123\n}');
  t.end();
});

test('stringify date', function (t) {
  let str = typifyJSON.stringify({
    date: new Date("Thu May 21 2015 08:00:00 GMT+0800 (CST)")
  });
  t.equal(str, '{"date":new Date("Thu May 21 2015 08:00:00 GMT+0800 (CST)")}');
  t.end()
});

test('stringify array', function (t) {
  let str = typifyJSON.stringify([100, false, new Date('Thu May 21 2015 08:00:00 GMT+0800 (CST)')]);
  t.equal(str, '[100,false,new Date("Thu May 21 2015 08:00:00 GMT+0800 (CST)")]');
  t.end();
});

test('stringify array with space', function (t) {
  let str = typifyJSON.stringify([100, false, new Date('Thu May 21 2015 08:00:00 GMT+0800 (CST)')], null, 2);
  t.equal(str, '[\n  100,\n  false,\n  new Date("Thu May 21 2015 08:00:00 GMT+0800 (CST)")\n]');
  t.end();
});
