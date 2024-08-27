import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-img',
  templateUrl: './preview-img.component.html',
  styleUrls: ['./preview-img.component.scss']
})
export class PreviewImgComponent implements OnInit {
  @Input() imageChangedEvent: any;
  public selectedFiles: string = ''
  imagePreviewUrls: string[] = [];
  currentImageIndex: number = 0;
  imageURL?: string = '';
  @Input() selectedIMG: any

  constructor() { }

  ngOnInit(): void {
    this.previewImage()
  }

  public prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.imagePreviewUrls.length) % this.imagePreviewUrls.length;
  }

  public nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.imagePreviewUrls.length;
  }

  public delete(index:number) {
    this.imagePreviewUrls.splice(index, 1);
    
    // this.addProduct.controls['img'].reset();

  }
  private previewImage() {
    debugger
    if (this.selectedIMG ) {
      this.selectedFiles = this.selectedIMG.target.files[0]
      const files = this.selectedIMG.target.files;
      this.selectedFiles = files;
      this.imageURL = this.selectedFiles;
  
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviewUrls.push(e.target.result);
          // this.selectedFiles.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }
   

}
