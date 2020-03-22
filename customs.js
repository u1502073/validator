const R = require('ramda')
const { RippleAPI } = require('ripple-lib')
const web3 = require('web3-utils')
const bitcoin = require('bitcoinjs-lib')
const networks = require('./bitcoin-networks')
const BN = require('bignumber.js')
const bn = x => new BN(x)

const neitherCase =
  str => str.toUpperCase() !== str &&
    str.toLowerCase() !== str

module.exports = [
  [
    /* name */ 'lowercase',
    /* callbackFn */ (v, req, attr) => v.toLowerCase() === v,
    /* errorMessage */ 'The :attribute is not in lower case',
  ],

  [
    'decimal',
    (v, rq, attr) =>
      bn(v)
        .shiftedBy(parseInt(rq, 10))
        .isInteger(),
    'The :attribute exceeds decimal place requirement',
  ],

  [
    'bitcoinAddress',
    (v, req = 'mainnet', attr) =>
      R.tryCatch(
        () => bitcoin.address.toOutputScript(v, networks[`bitcoin-${req}`]) && true,
        () => false,
      )(v),
    'The :attribute is not a valid bitcoin address (networks?)',
  ],

  [
    'ethereumAddress',
    (v, req = 'checked', attr) =>
      (req === 'unchecked')
        ? web3.isAddress(v)
        : neitherCase(v) !== v && web3.isAddress(v),
    'The :attribute is not a valid ethereum address (checksum?)',
  ],

  [
    'rippleAddress',
    (v, req, attr) => new RippleAPI().isValidAddress(v),
    'The :attribute is not a valid ripple address',
  ],

  [
    'rippleTag',
    (v, req, attr) =>
      bn(v).isInteger() &&
      bn(v).gte(0) &&
      bn(v).lte(2 ** 32 - 1),
    'The :attribute is not a valid ripple tag (32-bit unsigned integer)',
  ],

  [
    'eosMemo',
    (v, req, attr) =>
      typeof v === 'string' &&
      v.length > 0 &&
      v.length <= 256,
    'The :attribute is not a valid eos memo (a nonempty string of length <= 256)',
  ],
]
