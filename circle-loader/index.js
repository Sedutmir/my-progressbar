class CircleLoader extends HTMLElement {
    static get observedAttributes() {
        return ["animated", "value"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "animated":
                if (newValue === null) {
                    this.setAttribute("aria-valuenow", this.getAttribute("value"));
                } else {
                    this.setAttribute("aria-valuenow", "unknown");
                }

                break;

            case "value":
                /*
                    Всё это ручное анимирование нужно, потому что браузеры
                    не умеют сами гладко анимировать градиентные заливки фона
                */

                // Ограничиваем возможные значения от 0 до 100
                const normalize = (x) => Math.max(0, Math.min(100, x));
                const from = normalize(Number(oldValue));
                const to = normalize(Number(newValue));

                const step = (to - from) / 50; // Шаг анимации
                
                let now = from;

                clearInterval(this.changeValueInterval); // Очищаем прошлую анимацию
                this.changeValueInterval = setInterval(() => {
                    // Завершение
                    if (from < to && now >= to || from > to && now <= to) {
                        clearInterval(this.changeValueInterval);
                        this.style.setProperty("--val", to); // Чтобы исключить ошибки от сложения дробных чисел
                        return;
                    }

                    this.style.setProperty("--val", now);
                    now += step;
                }, 5);

                // Для средств доступности
                this.setAttribute("aria-valuenow", newValue);                        
                
                break;
        }
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.getElementById("circle-loader-template");
        shadow.append(template.content.cloneNode(true));

        this.progressbar = shadow.getElementById("progressbar");
    }
}

customElements.define('circle-loader', CircleLoader);