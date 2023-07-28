import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BorrowService } from "src/app/services/borrow/borrow.service";
import { Member } from "src/app/services/member/member.model";
import { MemberService } from "src/app/services/member/member.service";

@Component({
  selector: "app-borrow-dialog",
  templateUrl: "./borrow-dialog.component.html",
  styleUrls: ["./borrow-dialog.component.scss"],
})
export class BorrowDialogComponent {
  members: Member[] = [];
  selectedMemberId: number;

  constructor(
    private memberService: MemberService,
    private borrowService: BorrowService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadMemberList();
  }

  loadMemberList(): void {
    this.memberService.getAllMembers().subscribe({
      next: (members: Member[]) => {
        this.members = members;
      },
      error: (e: any) => console.error(e),
    });
  }

  onBorrowDocument(): void {
    this.borrowService
      .borrowDocument(this.data.documentId, this.selectedMemberId)
      .subscribe({
        next: () => {
          this.data.borrowedDocument.emit();
          this._snackBar.open("L'emprunt a été enregistré", "Fermer", {
            duration: 3000,
          });
        },
        error: (e: any) => console.error(e),
      });
  }
}
