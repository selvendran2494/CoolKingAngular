import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from "src/services/api.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      role: ["", Validators.required],
      email: ["", Validators.required],
      username: ["", Validators.required],
      mobile: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get data() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    } else {
      this.api.postData(this.registerForm.value, "/auth/register").subscribe({
        next: (res: any) => {
          let data = res;
          if ((data.message = "Registered Successfully!")) {
            this.snackBar.open("Registered Successfully", "Success", {
              duration: 2000,
            });
          }
        },
        error: (e) => {
          this.snackBar.open("Registration Failed!", "❌", {
            duration: 2000,
          });
        },
        complete: () => console.log("done"),
      });

      // this.router.navigate(['/login']);
    }
  }
}
