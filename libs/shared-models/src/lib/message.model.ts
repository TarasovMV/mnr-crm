export enum MessageType {
    Text = 'TEXT',
    Image = 'IMAGE',
}

export interface Message {
    id?: string;
    type: MessageType;
    text?: string;
    imgSrc?: string;
    author: string;
    timestamp: Date;
    requestId: string;
}
