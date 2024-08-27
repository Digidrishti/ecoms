import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('childParagraph', { static: false }) childParagraph: any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  gotoRegisterPage() {
    this.router.navigate(['auth/' + 'register'])
  }

}
