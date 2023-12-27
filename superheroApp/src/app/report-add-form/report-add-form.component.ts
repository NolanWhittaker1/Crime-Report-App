import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { nuisanceReport } from 'src/nuisanceReport';
import { ReportService } from '../report.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report-add-form',
  templateUrl: './report-add-form.component.html',
  styleUrls: ['./report-add-form.component.css']
})
export class ReportAddFormComponent implements OnInit {
  form: FormGroup
  longitude: number = +this.ActivatedRouter.snapshot.params['lat'];
  lattitude: number = +this.ActivatedRouter.snapshot.params['long'];
  selectedLocation: string;
  reports: nuisanceReport[];
  locations: string[];
  selectedValue: string = "";
 
  constructor(private ActivatedRouter:ActivatedRoute, private rs:ReportService, private router:Router) { 
    let formControls = {
      reporter: new FormControl('',[ Validators.required, Validators.nullValidator]),
      phone: new FormControl('', [Validators.required, Validators.nullValidator, Validators.minLength(12), Validators.maxLength(12),this.phonePatternValidator()]),
      location: new FormControl('',[Validators.required]),
      location1: new FormControl('',[]),
      picture: new FormControl('', [ Validators.required, Validators.nullValidator]),
    }
    this.form = new FormGroup(formControls)
    this.selectedLocation = '';
    this.reports = []
    this.locations = [];
    this.form.get('location')!.valueChanges.subscribe((value) => {
      console.log('Selected Location:', value);
      this.selectedValue = value;
    });
  }

  phonePatternValidator() {
    return Validators.pattern(/^\d{3}-\d{3}-\d{4}$/);
  }

  onSubmit(newReport:nuisanceReport) {
    console.log(this.form.get('location')!.value);
    if(this.form.get('location')!.value == 'Create New Location') {
        console.log("New Form Detected");
        const a = this.form.get('location1')!.value;
        
        newReport = new nuisanceReport("",newReport.reporter, newReport.phone, this.longitude, this.lattitude, a, newReport.picture, new Date(), false);
    } else {
        const locationValue = this.form.get('location')!.value;
        const p = this.reports.find((report) => report.location === locationValue);
        newReport = new nuisanceReport("",newReport.reporter, newReport.phone, p!.longitude, p!.lattitude, newReport.location, newReport.picture, new Date(), false);
    }
    this.rs.add(newReport);
    setTimeout(() => {
      this.onBack();
    }, 500); //This makes it so the program has to time to fetch the data from the server.
  }

  onBack() {
    this.router.navigate([`/main`]);
  }

  ngOnInit(): void {
    this.reports = this.rs.read()
    this.locations = this.rs.readLocation();

     setTimeout(() => {
      this.locations = this.makeLocationsUnique(this.locations);
    }, 500);
    this.locations.push("Create New Location")
  }

  makeLocationsUnique(locations: string[]): string[] {
    return Array.from(new Set(locations));
  }

onLocationChange() {
  console.log('Selected Location:', this.selectedLocation);

  
}

  

  
  
 

}
