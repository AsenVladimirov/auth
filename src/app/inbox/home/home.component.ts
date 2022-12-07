import { Component, OnInit } from '@angular/core';
import { BeDataService } from '../be-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emails: any[] = [];

  constructor(private beDataService: BeDataService) { }

  ngOnInit(): void {
  }

  push() {
    this.beDataService.pushData().subscribe(() => { })
  }

  fetch() {
    this.beDataService.fetchData().subscribe((data: any) => {
      this.emails = data;
    });
  }

}
