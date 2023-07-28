import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DocumentService } from "src/app/services/document/document.service";
import { Document } from "src/app/services/document/document.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-document-edit",
  templateUrl: "./document-edit.component.html",
  styleUrls: ["./document-edit.component.scss"],
})
export class DocumentEditComponent implements OnInit {
  documentTypes: string[];
  documentTypeTranslations: { [key: string]: string } = {
    BOOK: "Livre",
    DICTIONARY: "Dictionnaire",
    COMIC: "Bande dessinée",
    ARCHIVE: "Archive",
    NOVEL: "Roman",
    MAGAZINE: "Magazine",
    NEWSPAPER: "Journal",
  };
  documentForm: FormGroup;
  document: Document | undefined;
  updateDocument: Document;

  documentId: string;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.documentForm = this.formBuilder.group({
      title: ["", Validators.required],
      author: ["", Validators.required],
      releaseDate: ["", Validators.required],
      documentType: ["", Validators.required],
    });
  }

  ngOnInit() {
    // Retrieves the document ID from the active route
    const documentId = Number(this.route.snapshot.params["id"]);
    this.documentService
      .isDocumentExists(documentId)
      .subscribe((exists: boolean) => {
        if (exists) {
          this.documentService
            .getDocumentById(documentId)
            .subscribe((document: Document) => {
              this.document = document;
              if (this.document) {
                this.documentForm.patchValue({
                  title: this.document.title,
                  author: this.document.author,
                  releaseDate: new Date(this.document.releaseDate),
                  documentType: this.document.documentType,
                });
              }
            });
        } else {
          // If the ID does not exist in the list of documents, redirect here
          this.router.navigate(["/management/documents"]);
        }
      });
    this.loadDocumentsTypes();
  }

  loadDocumentsTypes(): void {
    this.documentService.getAllDocumentTypes().subscribe({
      next: (documentTypes: string[]) => {
        this.documentTypes = documentTypes;
      },
      error: (e: any) => console.error(e),
    });
  }

  onEditDocument(): void {
    if (this.documentForm.valid && this.document) {
      // Use the spread operator to update the document object with the documentForm values
      this.updateDocument = {
        ...this.document,
        ...this.documentForm.value,
        releaseDate: this.documentForm.value.releaseDate.getFullYear(),
      };
      this.documentService.updateDocument(this.updateDocument).subscribe(() => {
        this.router.navigate(["/management/documents"]);
      });
    }
  }
}
