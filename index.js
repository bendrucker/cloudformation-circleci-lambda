'use strict'

const circle = require('circleci-aws')
const partial = require('ap').partial
const respond = require('lambda-cloudformation-response')

module.exports = Handler

function Handler (getToken) {
  return handler

  function handler (event, context) {
    switch (event.RequestType) {
      case 'Create':
        return set(event, context)
      case 'Update':
        return set(event, context)
      case 'Delete':
        return remove(event, context)
      default:
        throw new Error('Unknown RequestType: ' + event.RequestType)
    }
  }

  function set (event, context) {
    return prepare(getToken, event)
      .then(circle.set)
      .then(partial(success, event, context))
      .catch(partial(fail, event, context))
  }

  function remove (event, context) {
    return prepare(getToken, event)
      .then(circle.remove)
      .then(partial(success, event, context))
      .catch(partial(fail, event, context))
  }
}

function prepare (token, event) {
  const data = event.ResourceProperties

  return token()
    .then((token) => ({
      username: data.Username,
      project: data.Repository,
      circle_token: token,
      access_key_id: data.AccessKeyId,
      secret_access_key: data.SecretAccessKey
    }))
}

function success (event, context) {
  return respond(event, context, 'SUCCESS', {})
}

function fail (event, context, err) {
  return respond(event, context, 'FAILED', {
    Error: err.message
  })
}
