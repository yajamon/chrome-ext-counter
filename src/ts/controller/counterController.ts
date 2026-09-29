/// <reference path="../core/controller" />
/// <reference path="../view/counter" />

namespace YJMCNT {
    /**
     * CounterController
     */
    export class CounterController extends Core.Controller {
        countersStore: CountersStore;
        counter: Counter;
        countView: CounterView;

        constructor(private element: HTMLElement) {
            super();
            this.countView = new CounterView();
            this.countView.addObserver(this);
            this.countersStore = this.countView.countersStore;
            this.counter = this.countView.counter;
        }

        show() {
            var promise = Promise.resolve();
            promise.then(() => {
                return new Promise<DocumentFragment>((resolve) => {
                    this.countView.render(resolve);
                });
            }).then((content: DocumentFragment) => {
                this.bindManipulate(content);
                this.element.appendChild(content);
            });
        }

        update() {
            var promise = Promise.resolve();
            promise.then(() => {
                return new Promise<DocumentFragment>((resolve) => {
                    this.countView.render(resolve);
                });
            }).then((content: DocumentFragment) => {
                while (this.element.firstChild) {
                    this.element.removeChild(this.element.firstChild);
                }
                this.bindManipulate(content);
                this.element.appendChild(content);
            });
        }

        bindManipulate(context: DocumentFragment) {
            var addButtons = context.querySelectorAll(".addCounter button");
            for (var addIndex = 0; addIndex < addButtons.length; addIndex++) {
                addButtons[addIndex].addEventListener("click", (e: Event) => {
                    e.preventDefault();
                    this.countersStore.add(Counter.make().serialize());
                });
            }

            var upButtons = context.querySelectorAll(".countUp");
            for (var upIndex = 0; upIndex < upButtons.length; upIndex++) {
                upButtons[upIndex].addEventListener("click", (e: Event) => {
                    e.preventDefault();
                    this.loadCounter(e.currentTarget, (counter: Counter) => counter.up(1));
                });
            }

            var downButtons = context.querySelectorAll(".countDown");
            for (var downIndex = 0; downIndex < downButtons.length; downIndex++) {
                downButtons[downIndex].addEventListener("click", (e: Event) => {
                    e.preventDefault();
                    this.loadCounter(e.currentTarget, (counter: Counter) => counter.down(1));
                });
            }

            var resetButtons = context.querySelectorAll(".countReset");
            for (var resetIndex = 0; resetIndex < resetButtons.length; resetIndex++) {
                resetButtons[resetIndex].addEventListener("click", (e: Event) => {
                    e.preventDefault();
                    this.loadCounter(e.currentTarget, (counter: Counter) => counter.reset());
                });
            }

            var deleteButtons = context.querySelectorAll(".counterDelete");
            for (var deleteIndex = 0; deleteIndex < deleteButtons.length; deleteIndex++) {
                deleteButtons[deleteIndex].addEventListener("click", (e: Event) => {
                    e.preventDefault();
                    this.loadCounter(e.currentTarget, (counter: Counter) => counter.removeFromStore());
                });
            }
        }

        private loadCounter(button: EventTarget, action: (counter: Counter) => void) {
            var element = <HTMLElement>button;
            while (element && !element.classList.contains("counter")) {
                element = element.parentElement;
            }
            if (!element) {
                return;
            }

            var idInput = <HTMLInputElement>element.querySelector(".id");
            if (!idInput) {
                return;
            }

            new Promise<Counter>((resolve) => {
                this.countersStore.getById(idInput.value, resolve);
            }).then((counter: Counter) => {
                action(counter);
            });
        }

    }
}
