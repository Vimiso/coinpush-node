## Description

Enable cryptocurrency payments in your web applications or business.

This NODE SDK interacts with the [Coinpush.io API](http://coinpush.test/docs/api) handling the creation and monitoring of cryptocurrency payments.

## Contents

* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)
    * [Currencies](#currencies)
    * [Initialisation](#initialisation)
    * [Testnet](#testnet)
    * [Approach A](#approach-a)
        * [Payment Creation](#payment-creation)
        * [Payment Monitoring](#payment-monitoring)
    * [Approach B](#approach-b)
        * [Charge Tokens](#charge-tokens)
        * [Charge Monitoring](#charge-monitoring)
    * [Response Status Codes](#response-status-codes)
* [Links](#links)

## Prerequisites

* NODE >= 8.0.0
* NPM

## Installation

```
npm install coinpush-node
```

## Usage

### Currencies

Coinpush currently supports: `btc`, `bch` and `ltc`.

Be sure to check out Coinpush's [supported cryptocurrencies](https://coinpush.io/docs/api#currencies) for an up-to-date list, as well as fee information.

### Initialisation

To get started, inject the `Config` class into the `Client` constructor:

```javascript
const Config = require('coinpush-node')['config']
const Client = require('coinpush-node')['client']
const Coinpush = new Client(new Config())
```

### Testnet

Want to request the [Coinpush.io Testnet](https://coinpush.io/api/testnet)? Enable it like so:

```js
const Coinpush = new Client(new Config().useTestnet())
```

IMPORTANT: Do not send real payments to any addresses created on the Testnet.

### Approach A

This approach provides you with payment system endpoints on a "per-cryptocurrency" basis.

### Payment Creation

To create a new payment address, use the following method:

```javascript
let currency = 'btc' // The cryptocurrency to charge in.

Coinpush.create('btc', {
    amount: 20000, // Satoshis to charge (0.0002 * 10000000).
    output_address: 'YOUR_BTC_OUTPUT_ADDRESS',
    // callback_url: 'OPTIONAL_WEBHOOK_NOTIFICATION_URL'
}).then((json) => {
    let depositAddress = json.results.address.deposit_address
}).catch((err) => {
    err.res.json().then((json) => {
        console.error(err.statusCode, json)
    })
})
```

For more information on the `create` resource visit: [Coinpush.io API Payment Creation](https://coinpush.io/docs/api#creation).

### Payment Monitoring

#### Webhooks
Webhook notifications are sent if a `callback_url` is supplied when creating a payment - read more about webhooks on the official docs: [Coinpush.io API Payment Monitoring](https://coinpush.io/docs/api#monitoring).

#### Manually
You can use a payment's address `label`, made when creating a payment, to inspect its statuses:

```javascript
let label = 'ADDRESS_LABEL_FROM_PAYMENT_CREATION'

Coinpush.statuses(label).then((json) => {
    // Collect only the statuses from the object.
    let statuses = json.results.statuses.map((item) => {
        return item.status
    })

    // The payment status to check for.
    let status = 'balance_sufficient'

    // Create boolean stating whether the status was met.
    let paymentWasSuccessful = statuses.includes(status)
}).catch((err) => {
    err.res.json().then((json) => {
        console.error(err.statusCode, json)
    })
})
```

Statuses indicate changes in a payment's lifespan. To discover which statuses you can check for, see: [Coinpush.io API Statuses](https://coinpush.io/docs/api#statuses).

## Approach B

This approach enables payments via one, or more, cryptocurrencies based on a fiat currency and amount. It makes use of charge tokens, which are used in conjunction with the Javascript [Charge UI plugin](https://github.com/Vimiso/coinpush-charge-ui).

### Charge Tokens

```javascript
let fiat = 'usd' // The fiat currency to charge in.

Coinpush.charge(fiat, {
    amount: 12.45,
    'accept[btc]': 'YOUR_BTC_OUTPUT_ADDRESS',
    'accept[bch]': 'YOUR_BCH_OUTPUT_ADDRESS',
    'accept[ltc]': 'YOUR_LTC_OUTPUT_ADDRESS'
}).then((json) => {
    let token = json.results.charge.token

    // Use `token` on your template with the Charge UI plugin.
}).catch((err) => {
    err.res.json().then((json) => {
        console.error(err.statusCode, json)
    })
})
```

Read more about charge tokens here: [Coinpush.io API Charge Tokens](https://coinpush.io/docs/api#charge-tokens).

### Charge Monitoring

To monitor a charge payment you must inspect its statuses:

```javascript
let token = 'CHARGE_TOKEN_FROM_CHARGE_CREATION'

Coinpush.chargeView(token).then((json) => {
    // Collect only the statuses from the object.
    let statuses = json.results.statuses.map((item) => {
        return item.status
    })

    // The payment status to check for.
    let status = 'balance_sufficient'

    // Create boolean stating whether the status was met.
    let paymentWasSuccessful = statuses.includes(status)
}).catch((err) => {
    err.res.json().then((json) => {
        console.error(err.statusCode, json)
    })
})
```

Read more about charge monitoring here: [Coinpush.io API Charge Monitoring](https://coinpush.io/docs/api#charge-monitoring).

### Response Status Codes

Coinpush always responds with meaningful HTTP status codes, look out for these:

| Code | Description |
| ---- |-------------|
| 200  | The request was successful. |
| 201  | The request was successful and a new resource was created. |
| 400  | The request was not validated or formatted properly. |
| 404  | The given input or resource was not found. |
| 405  | The request method was not supported. |
| 429  | You exceeded the given [rate limit](https://coinpush.io/docs/api#limiting). |
| 500  | The API experienced an internal server error. |
| 503  | The API is down for maintenance. |

## Links

* [Coinpush.io API Docs](https://coinpush.io/docs/api)