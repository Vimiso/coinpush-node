const Helper = require('./src/support/Helper')
const Config = require('./index')['config']
const Client = require('./index')['client']
const Coinpush = new Client(new Config().enableDevMode())

// All arguments shown are for testing purposes only.
// No logic is carried over between each test.
// How to run the test: `node tests.js`.

var tests = [
    /**
     * Fiat to cryptocurrency value conversion.
     */
    () => {
        return new Promise((resolve, reject) => {
            Coinpush.convert('gbp', 12.45, 'btc').then((json) => {
                console.log(json)

                resolve()
            }).catch((err) => {
                err.res.json().then((json) => {
                    console.error(err.statusCode, json)

                    reject()
                })
            })
        })
    },

    /**
     * Create a new cryptocurreny payment address.
     */
    () => {
        return new Promise((resolve, reject) => {
            Coinpush.create('btc', {
                amount: 20000,
                output_address: '142ZaKhcv68Yepqqu5TuQ88kLbBVxcVeRW'
            }).then((json) => {
                console.log(json)

                resolve()
            }).catch((err) => {
                err.res.json().then((json) => {
                    console.error(err.statusCode, json)

                    reject()
                })
            })
        })
    },

    /**
     * Create a new charge resource, accepting: btc, bch, ltc.
     */
    () => {
        return new Promise((resolve, reject) => {
            Coinpush.charge('gbp', {
                amount: 12.45,
                'accept[btc]': '142ZaKhcv68Yepqqu5TuQ88kLbBVxcVeRW',
                'accept[bch]': '15CWyf1kJn2uvQMtnRcfkjCV3f5j62urCr',
                'accept[ltc]': 'LLsqNEkcuuTzBAxcrPTLFQfbx4hGwzRNLb'
            }).then((json) => {
                console.log(json)

                resolve()
            }).catch((err) => {
                err.res.json().then((json) => {
                    console.error(err.statusCode, json)

                    reject()
                })
            })
        })
    },

    /**
     * View a charge resource given the token.
     */
    () => {
        return new Promise((resolve, reject) => {
            var token = 'easaLlNuCsexriMROgDDtm5rQARbx67Q'

            Coinpush.chargeView(token).then((json) => {
                console.log(json)

                resolve()
            }).catch((err) => {
                err.res.json().then((json) => {
                    console.error(err.statusCode, json)

                    reject()
                })
            })
        })
    },

    /**
     * View payment statuses given the label.
     */
    () => {
        return new Promise((resolve, reject) => {
            var label = '7gEdCjTRZaGcW4Npj9GiWQhgFP9K3epk'

            Coinpush.statuses(label).then((json) => {
                console.log(json)

                resolve()
            }).catch((err) => {
                err.res.json().then((json) => {
                    console.error(err.statusCode, json)

                    reject()
                })
            })
        })
    },
]

Helper.runPromisesSequentially(tests).then(() => {
    console.log('Testing finished!')
}).catch(() => {
    console.error('Testing failed.')
})
