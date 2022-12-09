import { action, computed, makeObservable, observable } from "mobx";

class MessageQueue {
    queue = [
        {
            'status': 'success',
            'message': 'Success'
        },
        {
            'status': 'warning',
            'message': 'Warning'
        },
        {
            'status': 'success',
            'message': 'ABCD'
        }
    ];

    constructor() {
        makeObservable(this, {
            queue: observable,
            addMessage: action,
            deleteMessage: action,
            getMessages: computed
        });
    }

    addMessage = (status, message, timeout = 5000) => {
        // TODO: checking status values
        let id = this.queue.push({ status, message });

        setTimeout(() =>
            this.deleteMessage(id), timeout
        );
    }

    deleteMessage = (id) => {
        this.messageQueue.splice(id - 1, 1);
    }

    get getMessages() {
        return(this.queue);
    }
}

export default MessageQueue;
