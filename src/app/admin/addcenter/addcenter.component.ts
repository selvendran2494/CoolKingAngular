import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/services/api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";





@Component({
  selector: 'app-addcenter',
  templateUrl: './addcenter.component.html',
  styleUrls: ['./addcenter.component.scss']
})
export class AddcenterComponent implements OnInit {
  addCentreForm:FormGroup;

  constructor(private formBuilder: FormBuilder,private api:ApiService,private snackBar:MatSnackBar,private router:Router) { }

  ngOnInit(): void {

    this.addCentreForm = this.formBuilder.group({
      serviceCenterName: ["", Validators.required],
      serviceCenterPhone: ["", Validators.required],
      serviceCenterAddress: ["", Validators.required],
      serviceCenterImageUrl: ["assets/images/ac1.jpg", Validators.required],
      serviceCentermailId: ["", Validators.required],
      serviceCenterDescription: ["", Validators.required]
    });
  }
  addCentre(){
    if(this.addCentreForm.valid){
      this.api.postData(this.addCentreForm.value,"/serviceCenter/add").subscribe((res)=>{
        this.snackBar.open("Added center details Successfully", "✔️", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      })
      // this.router.navigateByUrl("/admin/centerprofile");
    }
    else{
      alert("Please Enter all the details")
    }
  }

}
