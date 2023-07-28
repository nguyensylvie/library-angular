import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DocumentService } from "src/app/services/document/document.service";
import { Document } from "src/app/services/document/document.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-document-form",
  templateUrl: "./document-form.component.html",
  styleUrls: ["./document-form.component.scss"],
})
export class DocumentFormComponent {
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
  newDocument: Document = {
    documentId: 0,
    title: "",
    author: "",
    releaseDate: new Date(),
    available: true,
    registrationDate: new Date(),
    documentType: "",
  };

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.documentForm = this.formBuilder.group({
      title: ["", Validators.required],
      author: ["", Validators.required],
      releaseDate: ["", Validators.required],
      documentType: ["", Validators.required],
    });
  }

  ngOnInit(): void {
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

  onAddDocument(): void {
    if (this.documentForm.valid) {
      // Create a new document object using the values from the form
      this.newDocument = {
        ...this.documentForm.value,
        releaseDate: this.documentForm.value.releaseDate.getFullYear(),
      };

      this.documentService.addDocument(this.newDocument).subscribe({
        next: () => this.router.navigate(["/management/documents"]),
        error: (e) => console.error(e),
      });
    }
  }
}
