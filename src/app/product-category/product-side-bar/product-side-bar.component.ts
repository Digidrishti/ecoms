import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'product-side-bar',
  templateUrl: './product-side-bar.component.html',
  styleUrls: ['./product-side-bar.component.scss']
})
export class ProductSideBarComponent implements OnInit {
  @Output() filterValuesChange = new EventEmitter<{ minPrice: string, maxPrice: string }>();
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  public filterItem!: FormGroup;

  ngOnInit(): void {
    this.buildfilterItemForm();
    this.filterItem.valueChanges.subscribe(() => {
      this.emitFilterValues();
    });
  }

  public buildfilterItemForm() {
    this.filterItem = this.formBuilder.group({
      minPrice: ['', ],
      maxPrice: ['', ],
      // confirmPassword: ['', Validators.required]
    })
  }

  public emitFilterValues() {
    const filterValues = this.filterItem.value;
    this.filterValuesChange.emit(filterValues);
  }

}
