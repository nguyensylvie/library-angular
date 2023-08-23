import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { DocumentService } from "./document.service";
import { Document } from "./document.model";
import { environment } from "src/environments/environment";

describe("DocumentService", () => {
  let documentService: DocumentService;
  let httpTestingController: HttpTestingController;

  let apiUrl = `${environment.apiUrl}/documents`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DocumentService],
    });
    documentService = TestBed.inject(DocumentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(documentService).toBeTruthy();
  });

  it("should retrieve documents from the API via GET", () => {
    const mockDocuments: Document[] = [
      {
        documentId: 1,
        title: "The Lord of the Rings",
        author: "J. R. R. Tolkien",
        releaseDate: new Date("1954"),
        available: true,
        registrationDate: new Date(),
        documentType: "BOOK",
      },
      {
        documentId: 2,
        title: "The Hobbit",
        author: "J. R. R. Tolkien",
        releaseDate: new Date("1937"),
        available: true,
        registrationDate: new Date(),
        documentType: "BOOK",
      },
    ];

    documentService.getAllDocuments().subscribe((documents) => {
      expect(documents).toEqual(mockDocuments);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockDocuments);
  });

  it("should retrieve a document by ID via GET", () => {
    const documentId = 1;
    const mockDocument: Document = {
      documentId: 1,
      title: "The Lord of the Rings",
      author: "J. R. R. Tolkien",
      releaseDate: new Date("1954"),
      available: true,
      registrationDate: new Date(),
      documentType: "BOOK",
    };

    documentService.getDocumentById(documentId).subscribe((document) => {
      expect(document).toEqual(mockDocument);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${documentId}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockDocument);
  });

  it("should check if a document exists", () => {
    const mockDocuments: Document[] = [
      {
        documentId: 1,
        title: "The Lord of the Rings",
        author: "J. R. R. Tolkien",
        releaseDate: new Date("1954"),
        available: true,
        registrationDate: new Date(),
        documentType: "BOOK",
      },
      {
        documentId: 2,
        title: "The Hobbit",
        author: "J. R. R. Tolkien",
        releaseDate: new Date("1937"),
        available: true,
        registrationDate: new Date(),
        documentType: "BOOK",
      },
    ];
    const documentIdToCheck = 1;

    documentService.isDocumentExists(documentIdToCheck).subscribe((exists) => {
      expect(exists).toBeTrue();
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockDocuments);
  });

  it("should add a new document via POST", () => {
    const newDocument: Document = {
      documentId: 1,
      title: "The Lord of the Rings",
      author: "J. R. R. Tolkien",
      releaseDate: new Date("1954"),
      available: true,
      registrationDate: new Date(),
      documentType: "BOOK",
    };

    documentService.addDocument(newDocument).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe("POST");
    req.flush({});
  });

  it("should update an existing document via PUT", () => {
    const updatedDocument: Document = {
      documentId: 1,
      title: "The Lord of the Rings",
      author: "J. R. R. Tolkien",
      releaseDate: new Date("1954"),
      available: true,
      registrationDate: new Date(),
      documentType: "BOOK",
    };

    documentService.updateDocument(updatedDocument).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${apiUrl}/${updatedDocument.documentId}`
    );
    expect(req.request.method).toBe("PUT");
    req.flush({});
  });

  it("should delete a document via DELETE", () => {
    const documentIdToDelete = 1;

    documentService.deleteDocument(documentIdToDelete).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${apiUrl}/${documentIdToDelete}`
    );
    expect(req.request.method).toBe("DELETE");
    req.flush({});
  });

  it("should retrieve all document types", () => {
    const mockDocumentTypes: string[] = [
      "BOOK",
      "DICTIONARY",
      "COMIC",
      "ARCHIVE",
      "NOVEL",
      "MAGAZINE",
      "NEWSPAPER",
    ];

    documentService.getAllDocumentTypes().subscribe((documentTypes) => {
      expect(documentTypes).toEqual(mockDocumentTypes);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/document-type`);
    expect(req.request.method).toBe("GET");
    req.flush(mockDocumentTypes);
  });
});
