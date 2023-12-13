module.exports.ERROR_MESSAGES = {
    NOT_IMPLEMENTED: 'not implemented',
    NOT_FOUND: 'resource not found',
    UNEXPECTED_ERROR: 'unexpected error',
    BAD_INPUT: 'bad input',
    DB_OBJECT_REQUIRED: 'db object required',
    NO_SELECTION: 'no model selected'
}

module.exports.HTTP_STATUS_CODES = {
    STATUS_200: 200,
    STATUS_400: 400, // malformed request
    STATUS_401: 401, // unauthorized
    STATUS_403: 403, // forbidden
    STATUS_404: 404, // not found
    STATUS_409: 409, // conflict
    STATUS_500: 500  // server error
}


module.exports.MODES = {
    DEVELOPMENT: 'development',
    QA: 'qa',
    PRODUCTION: 'production'
}

module.exports.DB_NAMES = {
    DEVELOPMENT: 'air-dev',
    QA: 'air-qa',
    PRODUCTION: 'air-prod'
}

module.exports.env = {
    mode: this.MODES.DEVELOPMENT
}

module.exports.actions = {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
    LIST: 'list',
    LOAD: 'load',
    USE: 'use'
}