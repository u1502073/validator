const R = require('ramda')
const { RippleAPI } = require('ripple-lib')
const web3 = require('web3-utils')
const bitcoin = require('bitcoinjs-lib')
const networks = require('./bitcoin-networks')

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
    (v, req, attr) =>
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
]
