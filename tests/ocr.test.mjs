import test from 'node:test';import assert from 'node:assert/strict';import {parseReceipt} from '../src/ocr/receipt.mjs';
test('paid total wins over subtotal discount and change',()=>{const r=parseReceipt('快乐餐厅\n2026-10-28\n牛肉 2 50.00 100.00\n小计 100.00\n优惠 10.00\n实付 90.00\n找零 10.00');assert.equal(r.total,'90.00');assert.equal(r.items[0].amount,'100.00');assert.equal(r.items.length,1)});
test('unknown fields stay blank',()=>{assert.equal(parseReceipt('看不清').total,'')});
