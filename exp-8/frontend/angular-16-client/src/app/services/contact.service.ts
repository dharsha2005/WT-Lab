import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

const baseUrl = 'http://localhost:3000/contacts'; // Base URL for the backend API

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  // Get all contacts with optional search parameter
  getAll(search: string = ''): Observable<Contact[]> {
    const params = search ? { params: { search } } : {};
    return this.http.get<Contact[]>(baseUrl, params);
  }

  // Get a single contact by ID
  get(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${baseUrl}/${id}`);
  }

  // Create a new contact
  create(data: Contact): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // Update an existing contact by ID
  update(id: string, data: Contact): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // Delete a contact by ID
  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // Delete all contacts
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  // Add a product to a contact (example functionality)
  addProductToContact(contactId: string, product: any): Observable<any> {
    return this.http.post(`${baseUrl}/${contactId}/products`, product);
  }
}