# validator

##

```javascript
const validator = require('validator')
const S = require('sanctuary')

const rule = { foo: 'required|string|between:3,10' }

validator (rule) ({ foo: 'abc' })  // => Right ({ foo: 'abc' })
validator (rule) ({ foo: 'a' })  // => Left ('...failure message.')

const v = validator(rule)(obj)
if (S.isLeft(v)) { console.error(v.value) /* validation failed */ }
if (S.isRight(v)) { console.log('passed!', v.value) /* validation passed */ }
```

## Rules For Crypto-addresses

* Bitcoin: ``rule = { address: `required|string|bitcoinAddress:${network}` } // network: 'mainnet' | 'testnet'``
* Etherem: ``rule = { address: `required|string|ethereumAddress:${check}` } // check: 'checked' | 'unchecked'``
* Ripple: ``rule = { address: `required|string|rippleAddress` }``

## Rules For Crypto-address-tags

* Ripple Tag: ``rule = { address: 'string|rippleTag' }``
* EOS Memo: ``rule = { address: 'string|eosMemo' }``

## Misc. Rules

* Decimal Place: `rule = { amount: 'required|string|numeric|decimal:5' }`
  * `{ amount: '0.0001' } // passed`
  * `{ amount: '0.00001' } // passed`
  * `{ amount: '0.000010000' } // passed`
  * `{ amount: '0.000001' } // failed`

## Note

> It is recommended to add a `string` requirement to all rules when validating addresses, tags, amounts.

