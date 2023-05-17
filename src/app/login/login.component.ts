import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/services/api.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get data() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    } else {
      this.api.postData(this.loginForm.value, "/auth/login").subscribe({
        next: (res: any) => {
          let data = res;
          if ((data.message = "Login Success!")) {
            this.snackBar.open("Loggedin Successfully", "Success", {
              duration: 2000,
            });
            this.router.navigateByUrl("/home");
          }
        },
        error: (e) => {
          this.snackBar.open('Login Failed!', '❌', {
            duration: 2000,
          });
        },
        complete: () => console.log("done"),
      });
    }
  }
}
