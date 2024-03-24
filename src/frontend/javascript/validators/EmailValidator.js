import invalidPopup from "../components/InvalidPopup";

export default class EmailValidator {
    constructor($input, maxLength = -1) {
        this.$input = $input;
        this.maxLength = maxLength;
        this.value = "";
        this.previousBorderColor = $input.css("border-color");
    }
    checkValid() {
        this.updateValue();
        //Attachment for understanding Regex at /manage/regex-diagram.svg
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(this.value) && ((this.maxLength === -1) || this.value.length <= this.maxLength);
    }
    updateValue() {
        this.value = this.$input.val();
    }
    handleInvalid() {
        this.$input.css("border-color", "#ff0033");
        if(this.value.length === 0)
            invalidPopup.message = "This field is required";
        else if(this.value.length > this.maxLength)
            invalidPopup.message = `The maximum length of characters is ${this.maxLength}`;
        else
            invalidPopup.message = "Please enter a valid email";
        invalidPopup.injectIn(this.$input.parent());
    }
    resetInvalid() {
        if(this.previousBorderColor)
            this.$input.css("border-color", this.previousBorderColor);
        invalidPopup.remove();
    }
}