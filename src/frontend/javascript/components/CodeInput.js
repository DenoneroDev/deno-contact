import $ from "jquery";

class CodeInput {
    constructor(numberOfInputs = 6) {
        this.$input = null;
        this.numberOfInputs = numberOfInputs;
        this.$inputs = [];
    }
    getCode() {
        let code = "";
        console.log(this.$inputs);
        this.$inputs.forEach(($input) => code += $input.val());
        return code;
    }
    #init() {
        this.$input.find("input").each((index, input) => {
            const $input = $(input);
            this.$inputs[index] = $input;
            $input.on("input", function() {
                if(this.value.length > 1)
                    this.value = this.value.slice(0, 1);
                if(/\D/.test(this.value)) {
                    this.value = "";
                    return;
                }
                const $nextInput = $input.next();
                if(this.value && $nextInput.get(0) && !$nextInput.val())
                    $nextInput.trigger("focus");
            });
            $input.on("keydown", (event) => {
                if(event.key === "Backspace") {
                    if(index > 0 && !$input.val()) {
                        const $previousInput = $input.prev();
                        if($previousInput.get(0))
                            $previousInput.trigger("focus");
                    }
                }
                if(event.key === "ArrowLeft") {
                    const $previousInput = $input.prev();
                    if($previousInput.get(0))
                        $previousInput.trigger("focus");
                    else
                        $input.trigger("focus");
                }
                if(event.key === "ArrowRight") {
                    const $nextInput = $input.next();
                    if($nextInput.get(0))
                        $nextInput.trigger("focus");
                }
            });
            $input.on("click", function() {
                this.select();
            });
            $input.on("focus", function() {
                var self = this;
                setTimeout(async() => {
                    self.setSelectionRange(self.value.length, self.value.length);
                }, 0);
            });
            $input.on("paste", (event) => {
                event.preventDefault();
                const text = event.originalEvent.clipboardData.getData('text');
                this.paste(text);
            });
        });
        $(document).on("visibilitychange", async() => {
            if (!document.hidden) {
                this.focus();
                setTimeout(async() => {
                    if (document.hasFocus()) {
                        const text = await navigator.clipboard.readText();
                        this.paste(text);
                    }
                }, 500);
            }
        });
    }
    paste(text) {
        console.log("Paste: ", text);
        text = text.trim();
        if(/\D/.test(text) || text.length !== this.numberOfInputs)
            return;
        this.$inputs.forEach(($input, index) => {
            $input.val(text[index] || "");
        });
        this.$inputs[this.numberOfInputs - 1].trigger("focus");
    }
    focus() {
        this.$inputs[0].trigger("focus");
    }
    element() {
        this.$input = $(`
            <div class="code-input">
                ${Array(this.numberOfInputs).fill().map(() => `<input type="text" inputmode="numeric" maxlength="1"/>`).join('')}
            </div>`
        );
        this.#init();
        return this.$input;
    }
}

export default CodeInput;
