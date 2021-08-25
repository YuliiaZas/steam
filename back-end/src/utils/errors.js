/**
 * Represents a SteamError.
 */
class SteamError extends Error {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.message = message;
    this.status = 500;
  }
}

/**
 * Represents a InvalidRequestError.
 */
class InvalidRequestError extends SteamError {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * Represents a AuthorizationError.
 */
class AuthError extends SteamError {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * Represents a PermissionError.
 */
class PermissionError extends SteamError {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * Represents a DataError.
 */
class DataError extends SteamError {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * Represents a StatusError.
 */
class StatusError extends SteamError {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * Represents a ValidationError.
 */
class ValidationError extends SteamError {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  SteamError,
  InvalidRequestError,
  AuthError,
  DataError,
  PermissionError,
  StatusError,
  ValidationError,
};
