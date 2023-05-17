import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/services/api.service";


@Component({
  selector: "app-resetpassword",
  templateUrl: "./resetpassword.component.html",
  styleUrls: ["./resetpassword.component.scss"],
})
export class ResetpasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  private token :string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private activatedRoute:ActivatedRoute,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
    this.activatedRoute.params.subscribe(val=>{
      this.token = val['token'];
      console.log(this.token);
    })
  }

  get data() {
    return this.resetForm.controls;
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      return;
    } else {
      let resetPasswordobj = {
        token:this.token,
        password: this.resetForm.value?.confirmPassword,
      };
      this.api.postData(resetPasswordobj, "/auth/reset-password").subscribe({
        next: (res: any) => {
          let data = res;
          if(data.success == true){
            this.snackBar.open("Password Reset Successfully", "✔️", {
              duration: 2000,
            });
          }
        },
        error: (res: any) => {
          this.snackBar.open("Reset Password Failed", "❌", {
            duration: 2000,
          });
        },
        complete: () => console.log("done"),
      });
    }
    // else if (this.data.username.value == localStorage.getItem("username") && this.data.password.value == localStorage.getItem("password")) {
    //   this.router.navigate(['/home']);
    // } else {
    //   this.submitted = true;
    // }
  }
}
