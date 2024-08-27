import { AdminService } from './../admin-service/admin.service';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HomeService } from 'src/app/home/home.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  public allProductList: any;
  public selectedFiles: string = '';
  public editProductForm!: FormGroup;
  public selectedRow: any;
  public modalOpen: boolean = false;

  constructor(
    private homeService: HomeService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getallProducts();
    this.buildForm();
  }

  public getallProducts() {
    this.homeService.getAllUsers().subscribe((data: any) => {
      this.allProductList = data
    })
  }

  public deleteProduct(id:any) {
    this.adminService.deleteStudent(id).subscribe((data: any) => {
      console.log(data)
    })
  }

  public editProduct(selectedRow: any) {
    this.setFormvalue(selectedRow);
    this.selectedRow = selectedRow
  }

  public onFileChange(event:any) {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      this.selectedFiles=event.target.files[0]
    }
  }

  public buildForm() {
    this.editProductForm = this.formBuilder.group({
      categoryName: [''],
      description: [''],
      discount: [''],
      img: []
    })
  }

  public setFormvalue(selectedRow: any) {
    debugger
    this.editProductForm.controls['categoryName'].setValue(selectedRow.categoryName);
    this.editProductForm.controls['description'].setValue(selectedRow.description);
    this.editProductForm.controls['discount'].setValue(selectedRow.discount);
    this.editProductForm.controls['img'].setValue(selectedRow.img);
  }

  public submitForm() {
    const formData = new FormData();
    formData.append('categoryName', this.editProductForm?.controls['categoryName'].value),
    formData.append('description', this.editProductForm?.controls['description'].value),
    formData.append('discount', this.editProductForm?.controls['discount'].value),
    formData.append('image', this.selectedFiles);
    this.adminService.editForm(formData, this.selectedRow._id).subscribe(data => {
      console.log(data);
    })
  }

}
