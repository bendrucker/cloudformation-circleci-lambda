# cloudformation-circleci-lambda [![Build Status](https://travis-ci.org/bendrucker/cloudformation-circleci-lambda.svg?branch=master)](https://travis-ci.org/bendrucker/cloudformation-circleci-lambda)

> AWS Lambda handler for configuring CircleCI to deploy to Eaze's infrastructure in AWS

## Install

```
$ npm install --save cloudformation-circleci-lambda
```


## Usage

```js
var CircleHandler = require('cloudformation-circleci-lambda')

const credentialsHandler = CircleHandler(function getToken () {
  return Promise.resolve('my-token')
})

exports.handler = function handler (event, context, callback) {
  credentialsHandler(event, context)
    .then(() => callback(null))
    .catch((err) => callback(err))
}
```

The returned handler receives event data from CloudFormation and installs keys on CircleCI. You are responsible for calling the handler's callback and triggering the completion of the Lambda execution. This allows you to chain other handlers into the same run.


## License

MIT © [Ben Drucker](http://bendrucker.me)
