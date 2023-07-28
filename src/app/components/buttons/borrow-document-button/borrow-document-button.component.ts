import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BorrowDialogComponent } from "../../dialogs/borrow-dialog/borrow-dialog.component";

@Component({
  selector: "app-borrow-document-button",
  templateUrl: "./borrow-document-button.component.html",
  styleUrls: ["./borrow-document-button.component.scss"],
})
export class BorrowDocumentButtonComponent {
  @Input() documentId: number;
  @Output() borrowedDocument: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  openBorrowDialog(): void {
    const dialogRef = this.dialog.open(BorrowDialogComponent, {
      width: "400px",
      data: {
        documentId: this.documentId,
        borrowedDocument: this.borrowedDocument,
      },
    });
  }
}
