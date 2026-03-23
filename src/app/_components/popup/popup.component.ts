import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/app/_services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css', "./_popup-theme.scss"]
})
export class PopupComponent implements OnInit {
  message = "";
  type = "error";
  isVisible = false;

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
    // Read recent message and type values from the popup service to show in the popup
    this.popupService.popupContent.subscribe(msg => this.message = msg);
    this.popupService.popupType.subscribe(type => this.type = type);

    // Always track when the popup should or should not be visible
    this.popupService.popupVisibility.subscribe(visi => this.isVisible = visi);
  }
}
