import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/commonService/data-sharing.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

 

  progress = 0;

  constructor(private progressService: DataSharingService) {}

  ngOnInit(): void {
    this.progressService.progress$.subscribe(progress => {
      this.progress = progress;
    });
  }

}


