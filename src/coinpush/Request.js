const fetch = require('node-fetch')

module.exports = class Request
{
    /**
     * Make the request with the given config.
     *
     * @param {Config} config
     * @return {void}
     */
    constructor(config)
    {
        this.config = config
    }

    /**
     * Get the request method.
     *
     * @return {string}
     */
    getMethod()
    {
        return this.method
    }

    /**
     * Get the request path.
     *
     * @return {string}
     */
    getPath()
    {
        return this.path
    }

    /**
     * Get the request options.
     *
     * @return {Object}
     */
    getOptions()
    {
        return this.options
    }

    /**
     * @return {Object}
     */
    getPackageHeaders()
    {
        return {
            'X-Package-Manager': 'npm',
            'X-Package-Version': this.config.getVersion()
        }
    }

    /**
     * Set the request method.
     *
     * @param {string} method
     * @return {Request}
     */
    setMethod(method)
    {
        this.method = method

        return this
    }

    /**
     * Set the request path.
     *
     * @param {string} path
     * @return {Request}
     */
    setPath(path)
    {
        this.path = path

        return this
    }

    /**
     * Set the request options.
     *
     * @param {Object} options
     * @return {Request}
     */
    setOptions(options)
    {
        this.options = options

        return this
    }

    /**
     * Merge the request options.
     *
     * @param {Object} options
     * @return {Request}
     */
    mergeOptions(options)
    {
        this.options = Object.assign(this.options, options)

        return this
    }

    /**
     * Make a consistent request path.
     *
     * @param {string} path
     * @return {string}
     */
    makePath(path)
    {
        if (path.charAt(0) == '/') {
            path = path.substr(1)
        }

        if (path.charAt(path.length - 1) == '/') {
            path = path.substr(0, path.length - 1)
        }

        let versionPath = this.config.getVersionPathSegment()
        let usingTestnet = this.config.isUsingTestnet()

        if (! usingTestnet) {
            return '/' + versionPath + '/' + path
        }

        return '/' + versionPath + '/testnet/' + path
    }

    /**
     * Make the options and include the parameters.
     *
     * @param {Object} params
     * @return {Object}
     */
    makeOptions(params)
    {
        return {
            headers: this.getPackageHeaders(),
            form_params: typeof params === 'object' ? params : {}
        }
    }

    /**
     * Make the request.
     *
     * @return {Object}
     */
    make(success, failure)
    {
        let params = new URLSearchParams()
        let options = this.getOptions()
        let resource = this.config.getBaseUri() + this.getPath()
        let timeout = this.config.getTimeout() * 1000
        let method = this.getMethod()

        Object.keys(options.form_params).forEach((key) => {
            params.append(key, options.form_params[key])
        })

        let fetchOptions = {
            timeout: timeout,
            method: method,
            headers: options.headers,
        }

        if (method != 'GET') {
            fetchOptions.body = params
        }

        return fetch(resource, fetchOptions).then((res) => {
            if (res.ok) { // res.status >= 200 && res.status < 300
                return res.json()
            } else {
                let err = new Error(res.statusText)

                err.res = res
                err.statusCode = res.status

                throw err
            }
        })
    }
}
