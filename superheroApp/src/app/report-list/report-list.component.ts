import { Component, OnInit } from '@angular/core';
import { nuisanceReport } from 'src/nuisanceReport';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit{
  reports:nuisanceReport[]
  query:string
  constructor(private rs: ReportService, private router:Router) {
    this.query = ''
    this.reports = []
   }

  //  onReportDelete(reportId: string) {
  //   console.log(`Report ${reportId} has been deleted!`);
  //   this.reports = this.rs.delete(reportId);
  // }

  onReportShowMore(reportId: string) {
    console.log(`Report ${reportId} has been showed more!`);
    this.router.navigate(["/login/",reportId])
  }

  ngOnInit(): void {
      this.reports = this.rs.read()
  }

  handleHeaderClick(headerText: string): void {
    // Replace this with your logic for handling the click
    console.log(`Header clicked: ${headerText}`);
    switch (headerText) {
      case 'Report ID':
        this.reports.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'Reporter':
        this.reports.sort((a, b) => a.reporter.localeCompare(b.reporter));
        break;
      case 'Date':
          this.reports.sort((a, b) => a.time.toString().localeCompare(b.time.toString()));
      break;
      case 'Time':
        this.reports.sort((a, b) => a.time.toString().localeCompare(b.time.toString()));
      break;
      case 'Processed':
        this.reports.sort((a, b) => (a.processed ? 1 : 0) - (b.processed ? 1 : 0));
    break;
    }
    console.log(this.reports)
  }

}
