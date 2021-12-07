export default interface EmailDto {
    id: string;
    sendTo: string;
    sendFrom: string;
    subject?: string;
    body?: string;
}
