import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-volleyball-page',
  templateUrl: './volleyball-page.component.html',
  styleUrls: ['./volleyball-page.component.css']
})
export class VolleyballPageComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('GST-Disciplines | Haltérophilie');
  }

}
