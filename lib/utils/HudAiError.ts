export class HudAiError extends Error {

    public name: string;
    public type: string;

    constructor (message: string, type: string = 'validation_error') {
        // Calling parent constructor of base Error class.
        super(message);

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);

        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;

        // Typing for easy reference
        this.type = type;
    }
}