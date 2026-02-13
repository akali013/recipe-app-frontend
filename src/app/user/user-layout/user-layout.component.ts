import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {
  // This component is a parent component that brings the sidebar, header, and any user module component together 
  constructor() { }

  ngOnInit(): void {
  }

}
