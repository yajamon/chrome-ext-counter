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

        constructor(private $element: JQuery) {
            super();
            this.countView = new CounterView();
            this.countView.addObserver(this);
            this.countersStore = this.countView.countersStore;
            this.counter = this.countView.counter;
        }

        show() {
            var promise = Promise.resolve();
            promise.then(() => {
                return new Promise((resolve) => {
                    this.countView.render(resolve);
                });
            }).then((content: JQuery) => {
                this.bindManipulate(content);
                this.$element.append(content);
            });
        }

        update() {
            var promise = Promise.resolve();
            promise.then(() => {
                return new Promise((resolve) => {
                    this.countView.render(resolve);
                });
            }).then((content: JQuery) => {
                this.$element.empty();
                this.bindManipulate(content);
                this.$element.append(content);
            });
        }

        bindManipulate(hasButtonsDom: JQuery) {
            var addButton = hasButtonsDom.find(".addCounter");
            addButton.on("click", (e)=>{
                e.preventDefault();
                this.countersStore.add(Counter.make().serialize());
            });

            var upButton = hasButtonsDom.find(".countUp");
            upButton.on("click", (e) => {
                e.preventDefault();
                var button = $(e.target);
                var id = button.closest(".counter").find(".id").val();
                new Promise((resolve) => {
                    this.countersStore.getById(id, resolve);
                }).then((counter: Counter) => {
                    counter.up(1);
                });
            });

            var downButton = hasButtonsDom.find(".countDown");
            downButton.on("click", (e) => {
                e.preventDefault();
                var button = $(e.target);
                var id = button.closest(".counter").find(".id").val();
                new Promise((resolve) => {
                    this.countersStore.getById(id, resolve);
                }).then((counter: Counter) => {
                    counter.down(1);
                });
            });

            var resetButton = hasButtonsDom.find(".countReset");
            resetButton.on("click", (e) => {
                e.preventDefault();
                var button = $(e.target);
                var id = button.closest(".counter").find(".id").val();
                new Promise((resolve) => {
                    this.countersStore.getById(id, resolve);
                }).then((counter: Counter) => {
                    counter.reset();
                });
            });
        }

    }
}