import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contact: Contact = {
    name: '',
    email: '',
    msg: ''
  };
  submitted = false;

  contacts: Contact[] = [];
  searchTerm: string = '';
  showSearch: boolean = false;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getAll().subscribe({
      next: (data) => {
        this.contacts = data;
      },
      error: (e) => console.error(e)
    });
  }

  saveContact(): void {
    this.contactService.create(this.contact).subscribe({
      next: (res) => {
        this.submitted = true;
        this.getContacts(); // Refresh the list after adding
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

  filteredContacts(): Contact[] {
    if (!this.searchTerm) {
      return this.contacts;
    }
    const term = this.searchTerm.toLowerCase();
    return this.contacts.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.msg.toLowerCase().includes(term)
    );
  }
}