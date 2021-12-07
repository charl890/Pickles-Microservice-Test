export default interface IEmailService {
    sendEmail: (resource: any) => Promise<any>;
}
