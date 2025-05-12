import { Component } from '@angular/core';
import { PoultryService } from 'src/app/services/poultry.service';

@Component({
  selector: 'app-poultry',
  templateUrl: './poultry.component.html',
  styleUrls: ['./poultry.component.css']
})
export class PoultryComponent {
  numChickens: number | null = null;
  eggsPerChicken: number | null = null;
  days: number | null = null;
  totalEggs: number | null = null;

  constructor(private poultryService: PoultryService) {}

  calculateTotalEggs(): void {
    // Validate inputs
    if (
      this.numChickens === null || this.eggsPerChicken === null || this.days === null ||
      this.numChickens <= 0 || this.eggsPerChicken <= 0 || this.days <= 0
    ) {
      alert('Please enter valid positive numbers for all fields.');
      return;
    }

    // Calculate total eggs
    this.totalEggs = this.numChickens * this.eggsPerChicken * this.days;

    // Save data to the backend
    const poultryData = {
      numChickens: this.numChickens,
      eggsPerChicken: this.eggsPerChicken,
      days: this.days,
      totalEggs: this.totalEggs,
    };

    this.poultryService.savePoultryData(poultryData).subscribe({
      next: (response) => {
        console.log('Poultry data saved:', response);
        alert('Poultry data saved successfully!');
      },
      error: (error) => {
        console.error('Error saving poultry data:', error);
        alert('Failed to save poultry data.');
      },
    });
  }
}