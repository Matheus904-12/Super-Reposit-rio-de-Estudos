window.addEventListener("DOMContentLoaded",() => {
	const ts = new ThemeSwitch("input");
});

class ThemeSwitch {
	pristine = "switch--pristine";

	constructor(inputEl) {
		this.el = document.querySelector(inputEl);

		if (this.el) {
			// initially prevent transitions until the user changes the theme
			this.el.parentElement?.classList.add(this.pristine);
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				this.el.checked = true;
			}
			this.el.addEventListener("change",this.removePristine.bind(this));
		}
	}
	removePristine() {
		this.el.parentElement?.classList.remove(this.pristine);
	}
}