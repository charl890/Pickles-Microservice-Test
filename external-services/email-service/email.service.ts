import EmailDto from './email.dto';
import IEmailService from './emailservice.interface';

class EmailService implements IEmailService {
    async sendEmail(resource: EmailDto) {
     // Sending and receiving data in JSON format using POST method
     //
     const xhr = new XMLHttpRequest();
     const url = "http://localhost:9100/ExtEmailService";
     xhr.open("POST", url, true);
     xhr.setRequestHeader("Content-Type", "application/json");
     xhr.onreadystatechange = function () {
       if (xhr.readyState === 4 && xhr.status === 200) {
        const json = JSON.parse(xhr.responseText);
        console.log(json.email);
      }
     };
     const data = JSON.stringify({"ToEmail": resource.sendTo, "FromEmail": resource.sendFrom, "Subject": resource.subject, "Body": resource.body});
     xhr.send(data);
     return (resource);
    }
}

export default new EmailService();
