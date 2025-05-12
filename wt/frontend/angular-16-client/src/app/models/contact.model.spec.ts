import { Contact } from './contact.model';

describe('Contact', () => {
  it('should allow creating a contact object', () => {
    const contact: Contact = {
      name: 'Test Name',
      email: 'test@example.com',
      msg: 'Hello'
    };
    expect(contact).toBeTruthy();
    expect(contact.name).toBe('Test Name');
    expect(contact.email).toBe('test@example.com');
    expect(contact.msg).toBe('Hello');
  });
});