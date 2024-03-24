export default class Validator {
    constructor() {
        this.validators = [];
    }
    register(validator) {
        this.validators.push(validator);
        validator.$input.on("input", () => validator.resetInvalid());
    }
    isValid() {
        let isValid = true;
        for (const validation of this.validators) {
            if (!validation.checkValid()) {
                validation.handleInvalid();
                isValid = false;
            }
        }
        return isValid;
    }
}