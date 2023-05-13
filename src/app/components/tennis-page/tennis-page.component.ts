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
    this.titleService.setTitle('GST-Disciplines | Tennis');
  }

}
