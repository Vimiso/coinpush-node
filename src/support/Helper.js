module.exports = class Helper
{
    static runPromisesSequentially(promises)
    {
        var result = Promise.resolve()

        promises.forEach((callback) => {
            result = result.then(() => {
                return callback();
            })
        })

        return result
    }
}