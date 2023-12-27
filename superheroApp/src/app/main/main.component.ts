import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor() {}

  onNeedHelp() {
    alert("Sorry that you are experiencing difficulties. \n To create a report please click on the map or on one of the supplied markers if applicable. \n To edit/delete a report please click more info. Thanks.")
  }
}
