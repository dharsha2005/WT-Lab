import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
  contact: Contact = {
    name: '',
    email: '',
    msg: ''
  };
  submitted = false;

  constructor(private contactService: ContactService) {}

  saveContact(): void {
    this.contactService.create(this.contact).subscribe({
      next: (res) => {
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newContact(): void {
    this.submitted = false;
    this.contact = {
      name: '',
      email: '',
      msg: ''
    };
  }
}