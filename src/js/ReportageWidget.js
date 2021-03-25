export default class ReportageWidget {
    constructor(url) {
        this.container = document.getElementsByClassName('container').item(0);
        this.url = url;
    }
    
    init() {
        const eventSource = new EventSource(this.url);
        eventSource.addEventListener('unreadMessages', (evt) => {
            const unreadMessages = JSON.parse(evt.data);
            unreadMessages.forEach(message => this.createMessage(message.value, message.date, message.type));
        });
        
        eventSource.addEventListener('message', (evt) => {
            const message = JSON.parse(evt.data);
            console.log(evt.data);
            this.createMessage(message.value, message.date, message.type);
        });

        eventSource.addEventListener('error', (evt) => {
            console.log('error');
        });
    }

    createMessage(message, date, type) {
        let img = null;
        if(type == 'action') img = '';
        if(type == 'freekick') img = '&#10071;';
        if(type == 'goal') img = '&#9917;';
        
        this.container.insertAdjacentHTML('beforeEnd', `
            <li class="container__item">
                <span class="container__img">${img}</span>
                <div>
                    <span class="container__date">${date}</span>
                    <p class="container__message">${message}</p>
                </div>
            </li>`
        );
    }
}
