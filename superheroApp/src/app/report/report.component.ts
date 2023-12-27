import { Component, EventEmitter, Input, Output } from '@angular/core';
import { nuisanceReport} from "src/nuisanceReport";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  @Input() report: nuisanceReport | undefined;
  @Output() delete = new EventEmitter()

  constructor() {
    
  }

  onDelete(evt:any, report_id:String) {
    evt["report_id"] = report_id;
    this.delete.emit(evt);
  }
}
