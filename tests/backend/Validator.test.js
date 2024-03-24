const Validator = require("../../src/backend/utils/Validator");

describe("Validator", () => {
    describe("isInvalidEmail", () => {
        const validator = new Validator();
        it("should return error message if it isn't a string", ()=> {
            const result = validator.isInvalidEmail({$ne: null});
            expect(result).toBe("NoSql injection detected");
        });
        it("should return error message for an empty email address", () => {
            const result = validator.isInvalidEmail("");
            expect(result).toBe("Email is a required field");
        });
        it("should return error message for an invalid email address", () => {
            const result = validator.isInvalidEmail("invalidemail@");
            expect(result).toBe("Invalid email address");
        });
        it("should return error message for an email address with too many characters", () => {
            const result = validator.isInvalidEmail("exampleemailaddress1234567890123456789012345678901234567890123456789012345678901234567891@example.com");
            expect(result).toBe("Email has too many characters");
        });
        it("should return undefined for a valid email address", () => {
            const result = validator.isInvalidEmail("validemail@example.com");
            expect(result).toBeUndefined();
        });
    });

    describe("validateFormSubmission", () => {
        const validator = new Validator();
        it("should return error message if it isn't a valid submission", () => {
            const result = validator.validateFormSubmission({
                firstName: "",
                lastName: "",
                companyName: "",
                email: "",
                subject: "",
                text: ""
            });
            expect(result).toBeDefined();
        });
        it("should return undefined if it is a valid submission", () => {
            const result = validator.validateFormSubmission({
                firstName: "firstName",
                lastName: "lastName",
                companyName: "companyName",
                email: "email@example.com",
                subject: "subject",
                text: "text"
            });
            expect(result).toBeUndefined();
        });
    });
});
