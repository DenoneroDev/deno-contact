import $ from "jquery";

export default class Modal {
    constructor({ title, titleColor, content, text, btnText, handleCommit, removePrevious = true }) {
        this.title = title || "";
        this.titleColor = titleColor || "#262626";
        this.content = content || "";
        this.text = text || "";
        this.btnText = btnText || "";
        this.handleCommit = handleCommit || this.handleCommit;
        this.shouldRemovePrevious = removePrevious;

        this.$container = null;
        this.$modal = null;
        this.$btn = null;
    
    }

    #init() {
        this.$container = $(this.#element());
        this.$modal = this.$container.find("#modal");
        this.$btn = this.$modal.find("button");
        this.$modal.find("#title").css("color", this.titleColor);
        this.$modal.find("#content").prepend(this.content);
        this.#onClick();
    }

    #element() {
        return `
            <div class="modal-container">
                <div id="modal">
                    <p id="title">${this.title}</p>
                    <div id="content">
                        <p id="text">${this.text}</p>
                        <button>${this.btnText}</button>
                    </div>
                </div>
            </div>
        `;
    }

    #onClick() {
        this.$btn.on("click", () => {
            this.handleCommit();
        });
    }

    display() {
        if(this.shouldRemovePrevious)
            $(".modal-container").remove();
        this.#init();
        $(document.body).append(this.$container);
        this.$modal.animate({ 
            opacity: 1, 
            scale: 1
        }, 250);
    }

    remove() {
        this.$modal.animate({
            scale: 0
        }, 200, () => {
            this.$container.remove();
        });
    }

    handleCommit() {
        this.remove();
    }
}