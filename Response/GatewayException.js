class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class GatewayException extends DomainError {
    constructor(code, msg, status) {
        super(code);
        this.data = { code, msg, status };
    }

    toResponse() {
        var respModel = {}
        respModel = this.data.code;
        if (this.data.msg !== '' && typeof this.data.msg !== undefined) {
            respModel.error_cause = this.data.msg;
        }
        return {
            statusCode: this.data.status,
            body: respModel,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    }
}

module.exports = {
    GatewayException
};