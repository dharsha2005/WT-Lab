import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  newProduct = {
    birdType: '',
    productType: '',
    quantity: 0,
    pricePerUnit: 0,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.http.get('http://localhost:3000/products').subscribe((data: any) => {
      this.products = data;
    });
  }

  addProduct(): void {
    this.http.post('http://localhost:3000/products', this.newProduct).subscribe(() => {
      this.getProducts(); // Refresh the product list
      this.newProduct = { birdType: '', productType: '', quantity: 0, pricePerUnit: 0 }; // Reset form
    });
  }

  deleteProduct(id: string): void {
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe(() => {
      this.getProducts(); // Refresh the product list
    });
  }
}