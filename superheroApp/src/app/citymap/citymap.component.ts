import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as L from 'leaflet';
import { nuisanceReport } from 'src/nuisanceReport';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-citymap',
  templateUrl: './citymap.component.html',
  styleUrls: ['./citymap.component.css']
})
export class CitymapComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initializeMap();
    console.log("INTiALSDI")
  }
  reports:nuisanceReport[];
  
  constructor(private rs: ReportService) {
      this.reports = this.rs.read();
   }

  initializeMap(): void {
    const map = L.map('map').setView([49.2506,-122.9248], 12);
    const markerArray: { [key: string]: { num: number; marker: L.Marker } } = {};
   
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    
    map.on('click', (e: L.LeafletMouseEvent) => onMapClick(e));
    
    var popup = L.popup();
    function onMapClick(e: L.LeafletMouseEvent): void {
      const latitude = e.latlng.lat;
      const longitude = e.latlng.lng;
      popup.setLatLng(e.latlng).setContent(`To create a report. <a href='/report/add/${longitude}/${latitude}'>Click here</a>.`).openOn(map);
    }

    this.reports.forEach(report => {
      const locationKey = `${report.longitude}_${report.lattitude}`;
      if(markerArray[locationKey]) {
        console.log("Report Again Clicked, and Found")
        var num = ++markerArray[locationKey].num;
        markerArray[locationKey].marker.bindPopup(`Location: ${report.location} \n <a href='/report/add/${report.longitude}/${report.lattitude}'>Report again.</a>. \n Reports: ${num++}`);
        markerArray[locationKey].num = num; 
      } else {
        console.log("ELSE")
      var num = 1;
      const marker = L.marker([report.lattitude, report.longitude]).addTo(map).bindPopup(`Location: ${report.location} \n <a href='/report/add/${report.longitude}/${report.lattitude}'>Report again.</a>. \n Reports: ${num}`);
      console.log(report.reporter + " " + report.longitude + " " + report.lattitude)
      const newMarker = {num: 1, marker: marker}
      markerArray[locationKey] = newMarker;
      }
    });
  }
  }
