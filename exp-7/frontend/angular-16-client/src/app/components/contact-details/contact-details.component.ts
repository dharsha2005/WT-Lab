import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentContact: Contact = {
    name: '',
    email: '',
    msg: '',
    products: [],
  };

  newProduct = {
    birdType: '',
    productType: '',
    quantity: 0,
    pricePerUnit: 0,
  };

  message = '';

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getContact(this.route.snapshot.params['id']);
    }
  }

  getContact(id: string): void {
    this.contactService.get(id).subscribe({
      next: (data) => {
        this.currentContact = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  addProduct(): void {
    if (!this.currentContact._id) return;

    this.contactService.addProductToContact(this.currentContact._id, this.newProduct).subscribe({
      next: (updatedContact) => {
        this.currentContact = updatedContact; // Update the contact with the new product
        this.newProduct = { birdType: '', productType: '', quantity: 0, pricePerUnit: 0 }; // Reset the form
      },
      error: (e) => console.error(e),
    });
  }
}