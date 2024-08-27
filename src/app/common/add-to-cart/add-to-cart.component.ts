import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  data: any;
  rows: any;

  constructor(
  ) { }

  ngOnInit(): void {
    let value = JSON.parse(localStorage.getItem('details') || '{}');
    console.log(value);
    this.data = value
    this.rows = [value]
  }

}
