import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from 'src/services/api.service';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit{
  editCentreForm:FormGroup;
  Id:any;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private api :ApiService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.Id = this.data?._id;
    this.editCentreForm = this.formBuilder.group({
      serviceCenterName: ["", Validators.required],
      serviceCenterPhone: ["", Validators.required],
      serviceCenterAddress: ["", Validators.required],
      serviceCenterImageUrl: ["", Validators.required],
      serviceCentermailId: ["", Validators.required],
      serviceCenterDescription: ["", Validators.required]
    });

    this.editCentreForm.patchValue(this.data);
  }
  updatecenterDetails(){
      this.api.updateServiceCenterDetails(this.editCentreForm.value,"/serviceCenter/",this.Id).subscribe((res)=>{
        alert("Updated Successfully !!")
        this.dialogRef.close(true);
      })
  }
}
