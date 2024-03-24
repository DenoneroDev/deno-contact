import $ from "jquery";

class InvalidPopup {
    constructor() {
        this.message = "";
        this.element = null;
    }
    injectIn($parent) {   
        if(this.element)
            return;
        this.element = this.#element();
        $parent.css("position", "relative");
        $parent.append(this.element);
    }
    remove() {
        if(this.element) {
            this.element.remove();
            this.element = null;
        }
    }
    #element() {
        return $(`<div id="invalid-popup">${this.message}</div>`)
    }
}
const invalidPopup = new InvalidPopup();
export default invalidPopup; 