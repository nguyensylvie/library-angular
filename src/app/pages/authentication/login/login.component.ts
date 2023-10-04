import { Component } from "@angular/core";
import { LoginService } from "src/app/services/login/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class AppSideLoginComponent {
  username: string;
  password: string;

  constructor(private loginService: LoginService) {}

  onLogin() {
    // console.log(this.username, this.password);
    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (e) => console.error(e),
    });
  }
}
