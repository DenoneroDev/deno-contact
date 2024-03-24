import $ from "jquery";

export default class Submission {
    async send(data) {
        return await $.ajax({
            url: "/submit",
            type: "POST",
            data: data
        });
    }
}