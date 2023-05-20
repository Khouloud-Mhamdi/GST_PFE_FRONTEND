import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-karate-page',
  templateUrl: './karate-page.component.html',
  styleUrls: ['./karate-page.component.css']
})
export class KaratePageComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('GST-Disciplines | Karaté');
  }

}
