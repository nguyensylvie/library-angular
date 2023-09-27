import { AfterViewInit, Component, ViewChild, ElementRef } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DocumentService } from "src/app/services/document/document.service";
import { Document } from "src/app/services/document/document.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"],
})
export class DocumentsComponent implements AfterViewInit {
  documents: Document[] = [];
  dataSource = new MatTableDataSource<Document>();
  documentTypeTranslations: { [key: string]: string };
  searchResults: any[] = [];
  newDocument: Document;

  constructor(
    private documentService: DocumentService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDocumentList();
  }

  loadDocumentList(): void {
    this.documentService.getAllDocuments().subscribe({
      next: (documents: Document[]) => {
        this.documents = documents;
        this.dataSource.data = this.documents;
        this.dataSource.paginator = this.paginator;
        this.documentTypeTranslations =
          this.documentService.documentTypeTranslations;
      },
      error: (e) => console.error(e),
    });
  }

  clear(searchInput: string) {
    if (searchInput.trim() === "") {
      this.loadDocumentList();
      this.dataSource.filter = "";
    }
  }

  clearSearchInput() {
    this.searchInput.nativeElement.value = "";
    this.clear(this.searchInput.nativeElement.value);
  }

  applyFilterAndSearchGoogleBooksApi(searchInput: string) {
    if (searchInput.trim() !== "") {
      this.documentService.getGoogleBooksApi(searchInput).subscribe({
        next: (response: any) => {
          if (response.items && response.items.length > 0) {
            const googleBooksDataArray = response.items.map((item: any) => ({
              id: item.id,
              title: item.volumeInfo.title,
              author:
                (item.volumeInfo.authors && item.volumeInfo.authors[0]) ||
                "N/A",
              releaseDate: item.volumeInfo.publishedDate,
              documentType: "BOOK",
              googleBooksApi: true,
            }));

            this.searchResults = googleBooksDataArray;

            this.dataSource.data = [
              ...this.dataSource.data,
              ...this.searchResults,
            ];

            this.dataSource.filter = searchInput.trim().toLowerCase();
          }
        },
        error: (e) => console.error(e),
      });
      this.dataSource.data = this.documents;
    }
  }

  onAddDocument(id: string): void {
    const selectedDocument: any = this.dataSource.data.find(
      (item: any) => item.id === id
    );

    if (selectedDocument) {
      this.newDocument = {
        ...selectedDocument,
        releaseDate: selectedDocument.releaseDate
          ? new Date(selectedDocument.releaseDate).getFullYear()
          : undefined,
      };

      console.log(this.newDocument);

      this.documentService.addDocument(this.newDocument).subscribe({
        next: () => {
          this._snackBar.open("Vous avez ajouté un document", "Fermer", {
            duration: 3000,
          });
          this.loadDocumentList();
          this.applyFilterAndSearchGoogleBooksApi(
            this.searchInput.nativeElement.value
          );
        },
        error: (e) => console.error(e),
      });
    }
  }

  displayedColumns: string[] = [
    "position",
    "title",
    "author",
    "releaseDate",
    "documentType",
    "actions",
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("searchInput") searchInput: ElementRef;

  ngAfterViewInit() {
    this.loadDocumentList();
  }
}
