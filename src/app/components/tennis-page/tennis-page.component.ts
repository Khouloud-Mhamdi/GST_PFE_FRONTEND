import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tennis-page',
  templateUrl: './tennis-page.component.html',
  styleUrls: ['./tennis-page.component.css']
})
export class TennisPageComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.titleService.setTitle('GST-Disciplines | Tennis');
  }

}
