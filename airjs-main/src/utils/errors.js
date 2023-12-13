class ResponseError extends Error {
    constructor(message, error, status) {
      super(message)
      this.name = 'ResponseError'
      this.response = new Response(JSON.stringify({
          message: message || 'unexpected error', 
          error: error || undefined
        }), {status: status || 500 })
    } 
}

module.exports.ResponseError = ResponseError;