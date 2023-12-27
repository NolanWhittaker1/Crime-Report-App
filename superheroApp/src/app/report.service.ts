import { Injectable, OnInit } from '@angular/core';
import { nuisanceReport } from 'src/nuisanceReport';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService  {
  reports: nuisanceReport[] = [];
  locations: string[] = [];

  constructor(private http: HttpClient){
    this.initializeReports();
  }


  initializeReports(): void {
    console.log("Initalizing reporrts");
    this.reports = [];
    this.locations = [];
    this.http.get<nuisanceReport[]>('https://272.selfip.net/apps/olZxO7GUEu/collections/reports/documents/')
      .subscribe((data) => {
        var rows = <Array<any>>data;
        for (let i = 0; i < rows.length; i++) {
          // Access rows[i] instead of rows[0]
          const row = rows[i];
  
          // Declare newReport outside the loop
          let newReport: nuisanceReport;
  
          // Check if row.data is defined before accessing properties
          if (row.data) {
            newReport = new nuisanceReport(
              row.data.id,
              row.data.reporter,
              row.data.phone,
              row.data.longitude,
              row.data.lattitude,
              row.data.location,
              row.data.picture,
              row.data.time,
              row.data.processed
            );
  
            this.reports.push(newReport);
            this.locations.push(newReport.location)
          }
        }
      });
  }

  read() {
    return this.reports;
  }

  readLocation() {
    return this.locations;
  }

  add(newReport: nuisanceReport) {
    this.http.post<nuisanceReport>('https://272.selfip.net/apps/olZxO7GUEu/collections/reports/documents/', {
      "key": newReport.id,
      "data": newReport
    }).subscribe(
      (data: any) => {
        console.log(data);
        // Assuming you want to add the new report to the local array
        this.reports.push(newReport);
      }
    );
    console.log("Person added: " + newReport.reporter);
  }

  delete(delete_rep_id: string) {
    console.log("Person deleted: " + delete_rep_id);
    this.reports = this.reports.filter(r => r.id !== delete_rep_id);
    this.http.delete(`https://272.selfip.net/apps/olZxO7GUEu/collections/reports/documents/${delete_rep_id}`)
      .subscribe(
        (data: any) => {
          console.log(data);
        }
      );
    return this.reports;
  }
}

