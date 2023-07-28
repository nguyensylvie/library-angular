import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MemberService } from "src/app/services/member/member.service";
import { Member } from "src/app/services/member/member.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.scss"],
})
export class MemberEditComponent implements OnInit {
  memberForm: FormGroup;
  member: Member | undefined;
  updateMember: Member;

  memberId: string;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit() {
    // Retrieves the member ID from the active route
    const memberId = Number(this.route.snapshot.params["id"]);
    this.memberService.isMemberExists(memberId).subscribe((exists: boolean) => {
      if (exists) {
        this.memberService
          .getMemberById(memberId)
          .subscribe((member: Member) => {
            this.member = member;
            if (this.member) {
              this.memberForm.patchValue(this.member);
            }
          });
      } else {
        // If the ID does not exist in the list of members, redirect here
        this.router.navigate(["/management/members"]);
      }
    });
  }

  onEditMember(): void {
    if (this.memberForm.valid && this.member) {
      // Use the spread operator to update the member object with the memberForm values
      this.updateMember = { ...this.member, ...this.memberForm.value };
      this.memberService.updateMember(this.updateMember).subscribe(() => {
        this.router.navigate(["/management/members"]);
      });
    }
  }
}
