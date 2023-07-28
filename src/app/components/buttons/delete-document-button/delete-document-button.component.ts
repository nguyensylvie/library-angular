import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DocumentService } from "src/app/services/document/document.service";

@Component({
  selector: "app-delete-document-button",
  templateUrl: "./delete-document-button.component.html",
  styleUrls: ["./delete-document-button.component.scss"],
})
export class DeleteDocumentButtonComponent {
  @Input() documentId: number;
  @Output() documentDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  onDeleteDocument(documentId: number): void {
    this.documentService.deleteDocument(documentId).subscribe(() => {
      this.router.navigate(["/management/documents"]);
      this.documentDeleted.emit();
      this._snackBar.open("Vous avez supprimé un document", "Fermer", {
        duration: 3000,
      });
    });
  }
}
