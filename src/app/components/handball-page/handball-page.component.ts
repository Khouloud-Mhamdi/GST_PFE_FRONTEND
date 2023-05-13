import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-handball-page',
  templateUrl: './handball-page.component.html',
  styleUrls: ['./handball-page.component.css']
})
export class HandballPageComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('GST-Disciplines | Handball');
  }

}
