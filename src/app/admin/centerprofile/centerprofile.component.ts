import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/services/api.service";
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';


@Component({
  selector: 'app-centerprofile',
  templateUrl: './centerprofile.component.html',
  styleUrls: ['./centerprofile.component.scss']
})
export class CenterprofileComponent implements OnInit {

  ServiceCenterDetails = new Array();
  grid:any;
  items:any;
  constructor(private api: ApiService,private router:Router,public dialog: MatDialog) {}

  ngOnInit() {
    this.getServiceCenter();
  }
  getServiceCenter(){
    this.api.getAllServiceCenter("/serviceCenter").subscribe((res: any) => {
      let {data} = res;
      this.ServiceCenterDetails = data;
    });
  }
  deleteServiceCenter(id:any){
    this.api.deleteServiceCenterById("/serviceCenter/",id).subscribe((res)=>{
      console.log(res);
       this.getServiceCenter();
    })
  }
  openEditDialog(data:any): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data:data
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getServiceCenter();
        }
      },
    });
  }

}
