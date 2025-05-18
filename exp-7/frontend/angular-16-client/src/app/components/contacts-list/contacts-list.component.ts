import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];
  searchTerm: string = ''; // For search input

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.retrieveContacts();
  }

  retrieveContacts(): void {
    this.contactService.getAll(this.searchTerm).subscribe({
      next: (data) => {
        this.contacts = data;
      },
      error: (e) => console.error(e)
    });
  }

  searchContacts(): void {
    this.retrieveContacts(); // Fetch contacts based on search term
  }
}