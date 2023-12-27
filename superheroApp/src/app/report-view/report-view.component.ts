import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../report.service';
import { nuisanceReport } from 'src/nuisanceReport';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})

export class ReportViewComponent implements OnInit {
  reportId:string = this.ActivatedRouter.snapshot.params['id'];
  reports:nuisanceReport[];
  newReport:nuisanceReport | undefined;
  currentReport:nuisanceReport | undefined;
  constructor(private ActivatedRouter:ActivatedRoute, private rs: ReportService, private router:Router, private activatedRoute: ActivatedRoute) {
      this.reports =[];
      this.reportId = '';
   }

   ngOnInit() {
    this.reportId = this.ActivatedRouter.snapshot.params['id'];
    this.reports = this.rs.read();
    this.currentReport = this.reports.find(report => report.id === this.reportId);
    console.log(this.currentReport);
   }

    onReportDelete(reportId: string) {
    console.log(`Report ${reportId} has been deleted!`);
    this.reports = this.rs.delete(reportId);
    this.router.navigate(["/main"])
    }

    onProcessed(reportId: string) {
      if(this.currentReport!.processed == false) {
      this.newReport = new nuisanceReport("",this.currentReport!.reporter, this.currentReport!.phone, this.currentReport!.longitude, this.currentReport!.lattitude, this.currentReport!.location, this.currentReport!.picture, this.currentReport!.time, true);
      } else {
        this.newReport = new nuisanceReport("",this.currentReport!.reporter, this.currentReport!.phone, this.currentReport!.longitude, this.currentReport!.lattitude, this.currentReport!.location, this.currentReport!.picture, this.currentReport!.time, false);
      }
      this.reports = this.rs.delete(this.reportId);
      this.rs.add(this.newReport);
      setTimeout(() => {
        this.onBack();
      }, 500);
    }

    onBack() {
      this.router.navigate([`/main`]);
    }

  

}
