import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.titleService.setTitle('GST-Contact');
  }

}
