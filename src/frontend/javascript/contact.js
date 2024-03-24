require("../css/general.css");
require("../css/contact.css");
require("../css/util/buttonLoader.css");
require("../css/util/modal.css");
require("../css/util/codeInput.css");
require("../css/util/invalidPopup.css");
require("../css/responsive.css");
import $ from "jquery";
import RequiredValidator from "./validators/RequiredValidator";
import Form from "./utils/Form";
import CompanyValidator from "./validators/CompanyValidator";
import EmailValidator from "./validators/EmailValidator";

$(function () {
    const form = new Form($("form"));
    form.register(new RequiredValidator($("#first-name"), 50));
    form.register(new RequiredValidator($("#last-name"), 50));
    form.register(new CompanyValidator($("#company-name"), 50));
    form.register(new EmailValidator($("#email"), 100));
    form.register(new RequiredValidator($("#subject"), 100));
    form.register(new RequiredValidator($("#text"), 1500));
});