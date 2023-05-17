import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/services/api.service";

@Component({
  selector: "app-resetpassword",
  templateUrl: "./resetpassword.component.html",
  styleUrls: ["./resetpassword.component.scss"],
})
export class ResetpasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
  }

  get data() {
    return this.resetForm.controls;
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      return;
    } else {
      let resetPasswordobj = {
        password: this.resetForm.value?.confirmPassword,
      };
      this.api.postData(resetPasswordobj, "/auth/reset-password").subscribe({
        next: (res: any) => {},
        error: (res: any) => {},
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
