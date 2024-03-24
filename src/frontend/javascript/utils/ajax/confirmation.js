import $ from "jquery";

export default class Confirmation {
    async send(data) {
        return await $.ajax({
            url: "/confirmation",
            type: "POST",
            data: data
        });
    }
}