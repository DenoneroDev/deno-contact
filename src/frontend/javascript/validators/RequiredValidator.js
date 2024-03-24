import invalidPopup from "../components/InvalidPopup";

export default class RequiredValidator {
    constructor($input, maxLength = -1) {
        this.$input = $input;
        this.maxLength = maxLength;
        this.value = "";
        this.previousBorderColor = $input.css("border-color");
    }
    checkValid() {
        this.updateValue();
        return this.value.length > 0 && ((this.maxLength === -1) || this.value.length <= this.maxLength);
    }
    updateValue() {
        this.value = this.$input.val();
    }
    handleInvalid() {
        this.$input.css("border-color", "#ff0033");
        if(this.value.length === 0)
            invalidPopup.message = "This field is required";
        else
            invalidPopup.message = `The maximum length of characters is ${this.maxLength}`;
        invalidPopup.injectIn(this.$input.parent());
    }
    resetInvalid() { 
        if(this.previousBorderColor)
            this.$input.css("border-color", this.previousBorderColor);
        invalidPopup.remove();
    }
}