class MessageQueue {
    constructor() {
        this.queue = [];
    }

    addMessage = (status, message, timeout = 5000) => {
        // TODO: checking status values
        let id = this.queue.push({ status, message });

        setTimeout(() =>
            this.deleteMessage(id), timeout
        );
    }

    deleteMessage = (id) => {
        this.queue.splice(id - 1, 1);
    }

    getMessages() {
        return this.queue;
    }
}

export default MessageQueue;