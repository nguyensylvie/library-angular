import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { MemberService } from "src/app/services/member/member.service";

@Component({
  selector: "app-delete-member-button",
  templateUrl: "./delete-member-button.component.html",
  styleUrls: ["./delete-member-button.component.scss"],
})
export class DeleteMemberButtonComponent {
  @Input() memberId: number;
  @Output() memberDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private memberService: MemberService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  onDeleteMember(memberId: number): void {
    this.memberService.deleteMember(memberId).subscribe(() => {
      this.router.navigate(["/management/members"]);
      this.memberDeleted.emit();
      this._snackBar.open("Vous avez supprimé un membre", "Fermer", {
        duration: 3000,
      });
    });
  }
}
