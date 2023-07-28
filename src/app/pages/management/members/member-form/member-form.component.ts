import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MemberService } from "src/app/services/member/member.service";
import { Member } from "src/app/services/member/member.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-member-form",
  templateUrl: "./member-form.component.html",
  styleUrls: ["./member-form.component.scss"],
})
export class MemberFormComponent {
  memberForm: FormGroup;
  newMember: Member = {
    memberId: 0,
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    city: "",
    registrationDate: new Date(),
  };

  constructor(
    private memberService: MemberService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.memberForm = this.formBuilder.group({
      lastName: ["", Validators.required],
      firstName: ["", Validators.required],
      address: ["", Validators.required],
      postalCode: ["", Validators.required],
      city: ["", Validators.required],
    });
  }

  onAddMember(): void {
    if (this.memberForm.valid) {
      // Create a new member object using the values from the form
      this.newMember = { ...this.memberForm.value };

      this.memberService.addMember(this.newMember).subscribe({
        next: () => this.router.navigate(["/management/members"]),
        error: (e) => console.error(e),
      });
    }
  }
}
