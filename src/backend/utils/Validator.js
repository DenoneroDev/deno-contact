module.exports = class Validator {
    #isInvalidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return !emailRegex.test(email);
    }
    #isSomethingEmpty(...args) {
        return args.some((arg) => arg.length === 0);
    }
    #hasTooManyChars(...args) {
        return args.some((arg) => arg[0].length > arg[1]);
    }
    #isString(...args) {
        return args.some((arg) => typeof arg !== "string");
    }
    isInvalidEmail(email, options = {characters: 100, checkRegex: true}) {
        if(this.#isString(email))
            return "NoSql injection detected";
        if(this.#isSomethingEmpty(email))
            return "Email is a required field";
        if(this.#hasTooManyChars([email, options.characters]))
            return "Email has too many characters";
        if(this.#isInvalidEmail(email))
            return "Invalid email address";
    }
    validateFormSubmission({firstName, lastName, companyName, email, subject, text}) {
        const emailValidationError = this.isInvalidEmail(email);
        if(emailValidationError)
            return emailValidationError;
        if(this.#isSomethingEmpty(firstName, lastName, subject, text))
            return "A required field is empty";
        if(this.#hasTooManyChars([firstName, 50], [lastName, 50], [companyName, 50], [subject, 100], [text, 1500]))
            return "Too many characters";
    }
}