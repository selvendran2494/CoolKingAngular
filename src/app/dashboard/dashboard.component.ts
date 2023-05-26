import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from 'src/services/api.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedDate: Date = new Date();
  dashboardForm: FormGroup;
  serviceCenterId: any;
  serviceCenterDetails: any;
  getSlots: any;
  slotDetails:any;
  availableSlotsOnly:any;
  isClicked:boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,private dp:DatePipe,private snackBar: MatSnackBar) {
   }

  ngOnInit(): void {
    this.dashboardForm = this.formBuilder.group({
      productName: ["", Validators.required],
      productModelNo: ["", Validators.required],
      bookingDate: ["", Validators.required],
      contactNumber: ["", Validators.required],
      problemDescription: ["", Validators.required],
      bookedSlot: ["", Validators.required]
    });
    this.activatedRoute.params.subscribe(val => {
      this.serviceCenterId = val['id'];
    })
    this.getServiceCenterbyId();
    this.getAllSlots();
    this.getSlotdetailsById();
    this.getOnlyAvailableSlot();
  }
  isSlotDisabled(slot: number): boolean {
    return false;
  }
  getServiceCenterbyId() {
    this.api.getServiceCenterbyId("/serviceCenter/", this.serviceCenterId).subscribe((res: any) => {
      let { data } = res;
      this.serviceCenterDetails = data;
      // console.log(this.serviceCenterDetails);
    })
  }
  getAllSlots() {
    this.api.getAllSlots("/slot/").subscribe((res: any) => {
      let { data } = res;
      // this.getSlots = data.map((obj) => obj.slot);
      this.getSlots = data;
      console.log("AllSlots",this.getSlots);
    })
  }
  allotSlot(slots:any){
    console.log(slots)
    this.dashboardForm.get('bookedSlot').setValue(slots.slot);
  }
  getSlotdetailsById() {
    this.api.getSlotdetailsById("/appointment/",this.serviceCenterId).subscribe((res: any) => {
     let { data } = res;
     this.slotDetails = data;
     console.log("slotDetailsbyServiceCenterId",this.slotDetails);
    })
  }
  onSubmit(){
    const formatDate = this.dp.transform(this.dashboardForm?.value?.bookingDate,"yyyy-MM-dd");
    let getSlotTime = this.dashboardForm?.value?.bookedSlot;
    const filteredSlotId = this.getSlots.find((obj)=>obj.slot === getSlotTime); // First Appointment
    let postData_obj = {
      "userId": "646b00ca4d9ad64b82938d11", //Hardcoded based on login value
      "slotId": filteredSlotId?._id,
      "serviceCenterId": this.serviceCenterDetails._id
    }
    this.dashboardForm.get('bookingDate').setValue(formatDate);
    const postDataAppointment = {...postData_obj,...this.dashboardForm.value}
    console.log(postDataAppointment);
    this.api.createAppointment(postDataAppointment,"/appointment/add").subscribe((res:any)=>{
      console.log(res);
      this.snackBar.open("Appointment Created Successfully", "✔️", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    })

  }
  getOnlyAvailableSlot() {
    setTimeout(()=>{
      let bookedSlotId = this.slotDetails?.map((obj)=>obj.slotId); //Booked Slot Id
      let totalSlotId = this.getSlots?.map((obj)=>obj._id);        //All Slot Id
      function removeElementsFromArray(bookedSlotId, totalSlotId) {
        const newArray = totalSlotId?.filter((element) => !bookedSlotId.includes(element));
        return newArray;
      }
      const result = removeElementsFromArray(bookedSlotId, totalSlotId);
      this.availableSlotsOnly= this.getSlots?.filter((obj)=>result.includes(obj._id));
      console.log("Available Slot",this.availableSlotsOnly);
    },300)

  }


}
