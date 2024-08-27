import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HeaderComponent } from './common/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'cc';

   @ViewChild(HeaderComponent, { static: false }) HeaderComponent: HeaderComponent | any;

  ngAfterViewInit() {
    if (this.HeaderComponent) {
      
      console.log(this.HeaderComponent.childParagraph);


    }
  }

}
