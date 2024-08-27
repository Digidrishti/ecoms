import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  timeLeft: number = 300;
  key1:any
  device:any
  photos:any[]=[]
  timeLeftString: string | undefined;
  data: any;
  constructor(private route: ActivatedRoute,
    private router: Router
  ) { }




  ngOnInit(): void {
    let value = JSON.parse(localStorage.getItem('details') || '{}');
    console.log(value);
    this.data = value



    setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeLeftString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
    },1000)
  }

    gotoCart(value:any) {
      this.router.navigate(['/addToCart/', value.im]);
      // localStorage.setItem('details',JSON.stringify(value))
    }
}