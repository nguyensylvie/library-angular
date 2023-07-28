import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DocumentService } from "src/app/services/document/document.service";
import { BorrowService } from "src/app/services/borrow/borrow.service";
import { Document } from "src/app/services/document/document.model";
import { Member } from "src/app/services/member/member.model";
import { RedirectService } from "src/app/services/redirect/redirect.service";
import { Borrow } from "src/app/services/borrow/borrow.model";

@Component({
  selector: "app-details-document",
  templateUrl: "./details-document.component.html",
  styleUrls: ["./details-document.component.scss"],
})
export class DetailsDocumentComponent {
  document: Document | undefined;
  borrow: Borrow | undefined;
  borrowerMember: Member | undefined;
  documentTypeTranslations: { [key: string]: string };

  constructor(
    private documentService: DocumentService,
    private borrowService: BorrowService,
    private redirectService: RedirectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieves the document ID from the active route
    const documentId = Number(this.route.snapshot.params["id"]);
    this.documentService
      .isDocumentExists(documentId)
      .subscribe((exists: boolean) => {
        if (exists) {
          // If the ID exists, continue with loading the member detail
          this.documentService.getDocumentById(documentId).subscribe({
            next: (document: Document) => {
              this.document = document;
              this.documentTypeTranslations =
                this.documentService.documentTypeTranslations;
            },
            error: (e) => console.error(e),
          });
        } else {
          // If the ID does not exist in the list of documents, redirect here
          this.router.navigate(["/management/documents"]);
        }
      });
    this.borrowService.getBorrowIdByDocumentId(documentId).subscribe({
      next: (borrowId: number) => {
        this.borrowService.getBorrowById(borrowId).subscribe({
          next: (borrow: Borrow) => {
            this.borrow = borrow;
            this.borrowerMember = borrow.member;
          },
          error: (e) => console.error(e),
        });
      },
      error: (e) => console.error(e),
    });
  }

  goBack(): void {
    this.redirectService.goBack();
  }
}
