class ButtonLoading {
    constructor($button) {
        this.$button = $button;
        this.prevHtml = $button.html();
    }
    #initDots() {
        this.prevHtml = this.$button.html();
        this.$button.html(`
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        `);
    }
    start() {
        this.$button.addClass("loading-button");
        this.$button.css("width", this.$button.outerWidth() + "px");
        this.$button.css("height", this.$button.outerHeight() + "px");
        this.#initDots();
    }
    stop() {
        this.$button.html(this.prevHtml);
    }
}
export default ButtonLoading;