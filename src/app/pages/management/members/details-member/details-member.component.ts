import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MemberService } from "src/app/services/member/member.service";
import { Member } from "src/app/services/member/member.model";
import { BorrowService } from "src/app/services/borrow/borrow.service";
import { Document } from "src/app/services/document/document.model";
import { RedirectService } from "src/app/services/redirect/redirect.service";

@Component({
  selector: "app-details-member",
  templateUrl: "./details-member.component.html",
  styleUrls: ["./details-member.component.scss"],
})
export class DetailsMemberComponent {
  member: Member | undefined;
  documentsBorrowed: Document[];

  constructor(
    private memberService: MemberService,
    private borrowService: BorrowService,
    private redirectService: RedirectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieves the member ID from the active route
    const memberId = Number(this.route.snapshot.params["id"]);
    this.memberService.isMemberExists(memberId).subscribe((exists: boolean) => {
      if (exists) {
        // If the ID exists, continue with loading the member detail
        this.memberService.getMemberById(memberId).subscribe({
          next: (member: Member) => (this.member = member),
          error: (e) => console.error(e),
        });
      } else {
        // If the ID does not exist in the list of members, redirect here
        this.router.navigate(["/management/members"]);
      }
    });
    this.borrowService.getBorrowedDocumentsByMemberId(memberId).subscribe({
      next: (documentsBorrowed: Document[]) => {
        this.documentsBorrowed = documentsBorrowed;
      },
      error: (e) => console.error(e),
    });
  }

  goBack(): void {
    this.redirectService.goBack();
  }
}
