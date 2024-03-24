import Validator from "../validators/Validator";
import ButtonLoading from "../components/ButtonLoading";
import CodeInput from "../components/CodeInput";
import Confirmation from "./ajax/confirmation";
import Modal from "../components/modal";
import Submission from "./ajax/submission";

export default class Form {
    constructor($form) {
        this.$form = $form;
        this.validator = new Validator();
        this.confirmation = new Confirmation();
        this.submission = new Submission();
        this.codeInput = new CodeInput();

        this.#setupEvents();
    }
    register(validator) {
        this.validator.register(validator);
    }
    #setupEvents() {
        this.$form.on("submit", (e) => {
            e.preventDefault();
            if(this.validator.isValid())
                this.#handleFormSubmission();
            else
                console.log("Form not submitted");
        });
    }
    async #handleFormSubmission() {
        const formButtonLoading = new ButtonLoading(this.$form.find("button"));
        formButtonLoading.start();
        try {
            const data = this.#extractFormData();
            const confirmationData = await this.confirmation.send(data);
            this.#handleConfirmationSuccess(confirmationData);
            // this.#handleConfirmationSuccess({});
        } catch(error) {
            console.error(error);
            this.#handleConfirmationError(error.responseJSON);
        } finally {
            formButtonLoading.stop();
        }
    }
    #extractFormData() {
        return {
            email: this.$form.find("#email").val(),
            firstName: this.$form.find("#first-name").val(),
            lastName: this.$form.find("#last-name").val(),
            companyName: this.$form.find("#company-name").val(),
            subject: this.$form.find("#subject").val(),
            text: this.$form.find("#text").val()
        };
    }
    #handleConfirmationSuccess(data) {
        const confirmationModal = new Modal({
            title: "Confirmation",
            content: this.codeInput.element(),
            text: "Please verify your email by entering the code we've sent to your inbox. Thank you for your cooperation.",
            btnText: "Verify!",
            handleCommit: async() => {
                console.log("Code: ", this.codeInput.getCode());
                const modalButtonLoading = new ButtonLoading(confirmationModal.$btn);
                modalButtonLoading.start();
                try {
                    const response = await this.submission.send({
                        ...data,
                        code: this.codeInput.getCode()
                    });
                    this.#handleFormSubmissionSuccess(response);
                } catch(error) {
                    console.error(error);
                    this.#handleFormSubmissionError(error?.responseJSON);
                } finally {
                    modalButtonLoading.stop();
                }
            }
        });
        confirmationModal.display();
        this.codeInput.focus();
    }
    #handleConfirmationError(error) {
        new Modal({
            title: "Error",
            titleColor: "#E60013",
            content: `<img src="/images/error.svg">`,
            text: error?.message || "Something went wrong. Please try again later.",
            btnText: "Oh!"
        }).display();
    }
    #handleFormSubmissionSuccess() {
        this.$form.trigger("reset");
        new Modal({
            title: "Success",
            titleColor: "#5FAA1D",
            content: `<img src="/images/success.svg">`,
            text: "Your form has been successfully submitted. Rest assured, I will respond promptly. Thank you for reaching out!",
            btnText: "Good!",
            removePrevious: true,
        }).display();
    }
    #handleFormSubmissionError(error) {
        new Modal({
            title: "Error",
            titleColor: "#E60013",
            content: `<img src="/images/error.svg">`,
            text: error?.message,
            btnText: "Oh!",
            removePrevious: error?.shouldTryAgain
        }).display();
    }
}