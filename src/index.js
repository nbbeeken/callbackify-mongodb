// @ts-check
const types = require('util/types');
const {callbackify} = require('util');
const mongodb = require('mongodb');
const { api } = require('./api')

class CallbackifyError extends Error {}

const packageProperties = new Map(Object.entries(Object.getOwnPropertyDescriptors(mongodb)))

module.exports = Object.create(null);

for (const [className, {location, methods}] of api) {
    let pkgProps = packageProperties
    if (location !== 'mongodb') {
        pkgProps = new Map(Object.entries(Object.getOwnPropertyDescriptors(require(location))))
    }
    const propertyDescriptor = pkgProps.get(className)
    if (propertyDescriptor == null) {
        throw new CallbackifyError(`Cannot find class ${className}`)
    }
    const ctor = propertyDescriptor.value ?? propertyDescriptor.get?.()
    for (const method of methods) {
        if (!types.isAsyncFunction(ctor.prototype[method])) {
            const e = new CallbackifyError(`class ${className}.${method} is not an async function!`)
            // console.log(`warning: ${e.message}`)
        }
        ctor.prototype[method] = callbackify(ctor.prototype[method])
    }

}

for (const [packageProperty, propertyDescriptor] of packageProperties) {
    Object.defineProperty(module.exports, packageProperty, propertyDescriptor)
}
