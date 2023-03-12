import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.css']
})
export class BasketPageComponent implements OnInit {


  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Disciplines - Basketball');
  }

}
