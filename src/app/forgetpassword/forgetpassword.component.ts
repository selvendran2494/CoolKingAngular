import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ApiService } from "src/services/api.service";

@Component({
  selector: "app-forgetpassword",
  templateUrl: "./forgetpassword.component.html",
  styleUrls: ["./forgetpassword.component.scss"],
})
export class ForgetpasswordComponent implements OnInit {
  forgetForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      email: ["", Validators.required],
    });
  }

  get data() {
    return this.forgetForm.controls;
  }

  onSubmit() {
    if (this.forgetForm.invalid) {
      return;
    } else {
      this.api
        .postData(this.forgetForm.value, "/auth/send-reset-email")
        .subscribe({
          next: (res: any) => {
            let data = res;
            if ((data.message = "Reset Link Sent!")) {
              this.snackBar.open("Reset Link Sent", "✔️", {
                duration: 2000,
              });
            }
          },
          error: (e: any) => {
            this.snackBar.open("Reset Link not Sent", "❌", {
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
