export default class API {
    constructor() {
        this.container = document.getElementsByClassName('container').item(0);
    }
    
    init() {
        const eventSource = new EventSource("https://ahj-reportage.herokuapp.com/sse");
        eventSource.addEventListener('message', (evt) => {
            const message = JSON.parse(evt.data);
            this.createMessage(message);
        });

        eventSource.addEventListener('open', (evt) => {
            this.createMessage('Игра началась');
        });
        eventSource.addEventListener('error', (evt) => {
            console.log('error');
        });
    }

    createMessage(message) {
        const date = this.getDate();
        this.container.insertAdjacentHTML('beforeEnd', `
            <li class="container__item">
                <span class="container__date">${date}</span>
                <span class="container__message">${message}</span>
            </li>`
        );
    }
    
    getDate() {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
        };
        
        return  new Date().toLocaleString("ru", options);
    }
}
