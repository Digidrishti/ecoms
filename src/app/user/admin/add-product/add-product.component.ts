import { PreviewImgComponent } from './../preview-img/preview-img.component';
import { HomeService } from 'src/app/home/home.service';
import { AdminService } from './../admin-service/admin.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { DataSharingService } from 'src/app/commonService/data-sharing.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers:[FormBuilder]
})
export class AddProductComponent implements OnInit {
  public Files: File[] = [];
  private formData = new FormData();
  public addProduct!: FormGroup;
  public addType!: FormGroup;
  public selectedFiles: string = ''
  imagePreviewUrls: string[] = [];
  public isloaded = false;
  // image edit variables;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation?: number;
  translateH = 0;
  translateV = 0;
  scale = 1;
  aspectRatio = 4 / 3;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {
    translateUnit: 'px'
  };
  imageURL?: string = '';
  loading = false;
  allowMoveImage = false;
  hidden = false;
  allProductList: any;
  addProductCategory: boolean = true;
  addProductTypes: boolean = false;
  @ViewChild(PreviewImgComponent) PreviewImgComponent: PreviewImgComponent | undefined
  

  completeStep() {
    this.progressService.updateProgress(25);
  }

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private sanitizer: DomSanitizer,
    private homeService: HomeService,
    private progressService: DataSharingService,
    private readonly changeDetectorRef: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.addProductForm();
    this.addProductTypeForm();
    this.getallProducts();
    this.completeStep();

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    debugger
    this.PreviewImgComponent?.delete(0);
    
  }

  ngAfterViewChecked(): void {
    debugger
    this.changeDetectorRef.detectChanges();
    this.PreviewImgComponent?.delete(0);
    this.addProduct.controls['img'].reset();
  }

  public addProductForm() {
    this.addProduct = this.formBuilder.group({
      categoryName: [''],
      description: [''],
      discount: [''],
      productWeight: [''],
      img : []
    })
  }

  public addProductTypeForm() {
    this.addType = this.formBuilder.group({
      categoryName:[''],
      productName: [''],
      productType: [''],
      productPrice: [''],
      productQuantity: [''],
      productWeight: [''],
      img : []
    }
    )
  }

  public submitForm() {
    this.formData = new FormData();

    console.log(this.addProduct.value);
    this.formData.append('categoryName', this.addProduct?.controls['categoryName'].value),
      this.formData.append('description', this.addProduct?.controls['description'].value),
      this.formData.append('discount', this.addProduct?.controls['discount'].value),
      this.formData.append('image', this.selectedFiles);
      console.log(this.selectedFiles);
    
    // if (this.imagePreviewUrls.length > 0) {
    //   debugger
    //   Array.from(this.imagePreviewUrls).forEach((file, index) => {
    //     this.formData.append("img[0].file[" + index + "]", file);
    //   });
    // }
    this.adminService.addNewProduct(this.formData).subscribe(data => {
      console.log(data);
      this.addProductCategory = false;
      this.addProductTypes = true;
    })
  }

  public onFileChange(event:any) {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      this.selectedFiles = files;
      this.imageChangedEvent = event;

      this.isloaded = true;
      
    }
    
  }

  public getallProducts() {
    this.homeService.getAllUsers().subscribe(data => {
      console.log(data);
      this.allProductList = data
    })
  }

 

  public addProductType() {

    const formData = new FormData();

    formData.append('categoryName', this.addType?.controls['categoryName'].value),
    formData.append('productName', this.addType?.controls['productName'].value),
    formData.append('productType', this.addType?.controls['productType'].value),
    formData.append('productPrice', this.addType?.controls['productPrice'].value),
    formData.append('productQuantity', this.addType?.controls['productQuantity'].value),
    formData.append('productWeight', this.addType?.controls['productWeight'].value),
    this.Files.forEach((image, index) => {
      formData.append(`image${index}`, image, image.name);
    });
      
    
    
    // formData.append('image', this.selectedFiles);
    // console.log(this.selectedFiles);
    
    // if (this.imagePreviewUrls.length > 0) {
    //   debugger
    //   Array.from(this.imagePreviewUrls).forEach((file, index) => {
    //     this.formData.append("img[0].file[" + index + "]", file);
    //   });
    // }
    this.adminService.addType(formData).subscribe(data => {
          console.log(data);
    })

  }

  onFileSelected(event: any) {
    this.Files = [];
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.Files.push(files.item(i)!);
    }
  }








  // image edit methods

  public fileChangeEvent(event: any): void {
    this.loading = true;
    this.imageChangedEvent = event;
  }

  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl || event.base64 || '');
    console.log(event);
  }

  public imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  public cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
    this.loading = false;
  }

  public loadImageFailed() {
    console.error('Load image failed');
  }

  public rotateLeft() {
    this.loading = true;
    setTimeout(() => {
      this.canvasRotation--;
      this.flipAfterRotate();
    });
  }

  public rotateRight() {
    this.loading = true;
    setTimeout(() => {
      this.canvasRotation++;
      this.flipAfterRotate();
    });
  }

  public moveLeft() {
    this.transform = {
      ...this.transform,
      translateH: ++this.translateH
    };
  }

  public moveRight() {
    this.transform = {
      ...this.transform,
      translateH: --this.translateH
    };
  }

  public moveTop() {
    this.transform = {
      ...this.transform,
      translateV: ++this.translateV
    };
  }

  public moveBottom() {
    this.transform = {
      ...this.transform,
      translateV: --this.translateV
    };
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
    this.translateH = 0;
    this.translateV = 0;
  }

  public flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  public flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  public resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {
      translateUnit: 'px'
    };
  }

  public zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  public zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  public toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  public toggleAspectRatio() {
    this.aspectRatio = this.aspectRatio === 4 / 3 ? 16 / 5 : 4 / 3;
  }

  // updateRotation() {
  //   this.transform = {
  //     ...this.transform,
  //     rotate: this.rotation
  //   };
  // }

}
