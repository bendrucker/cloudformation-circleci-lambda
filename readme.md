# cloudformation-circleci-lambda [![Build Status](https://travis-ci.org/bendrucker/cloudformation-circleci-lambda.svg?branch=master)](https://travis-ci.org/bendrucker/cloudformation-circleci-lambda)

> AWS Lambda handler for configuring CircleCI to deploy to Eaze's infrastructure in AWS

## Install

```
$ npm install --save cloudformation-circleci-lambda
```


## Usage

```js
var CircleHandler = require('cloudformation-circleci-lambda')

exports.handler = CircleHandler(function getToken () {
  return Promise.resolve('my-token')
})
```

The returned handler receives event data from CloudFormation and installs keys on CircleCI.


## License

MIT © [Ben Drucker](http://bendrucker.me)
