import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-apropos-page',
  templateUrl: './apropos-page.component.html',
  styleUrls: ['./apropos-page.component.css']
})
export class AproposPageComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('GST-A propos');
    window.scrollTo(0, 0);
  }

}
