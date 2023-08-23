import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { BorrowService } from "./borrow.service";
import { Borrow } from "./borrow.model";
import { Document } from "../document/document.model";
import { Member } from "../member/member.model";
import { environment } from "src/environments/environment";

describe("BorrowService", () => {
  let borrowService: BorrowService;
  let httpTestingController: HttpTestingController;

  let apiUrl = `${environment.apiUrl}/borrows`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BorrowService],
    });
    borrowService = TestBed.inject(BorrowService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(borrowService).toBeTruthy();
  });

  it("should retrieve borrows from the API via GET", () => {
    const mockBorrows: Borrow[] = [
      {
        borrowId: 1,
        loanDate: new Date(),
        returnDate: new Date(),
        document: {} as Document,
        member: {} as Member,
      },
      {
        borrowId: 2,
        loanDate: new Date(),
        returnDate: new Date(),
        document: {} as Document,
        member: {} as Member,
      },
    ];

    borrowService.getAllBorrows().subscribe((borrows) => {
      expect(borrows).toEqual(mockBorrows);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockBorrows);
  });

  it("should retrieve a borrow by ID via GET", () => {
    const borrowId = 1;
    const mockBorrow: Borrow = {
      borrowId: 1,
      loanDate: new Date(),
      returnDate: new Date(),
      document: {} as Document,
      member: {} as Member,
    };

    borrowService.getBorrowById(borrowId).subscribe((borrow) => {
      expect(borrow).toEqual(mockBorrow);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${borrowId}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockBorrow);
  });

  it("should check if a borrow exists", () => {
    const mockBorrows: Borrow[] = [
      {
        borrowId: 1,
        loanDate: new Date(),
        returnDate: new Date(),
        document: {} as Document,
        member: {} as Member,
      },
      {
        borrowId: 2,
        loanDate: new Date(),
        returnDate: new Date(),
        document: {} as Document,
        member: {} as Member,
      },
    ];

    const borrowIdToCheck = 1;

    borrowService.isBorrowExists(borrowIdToCheck).subscribe((exists) => {
      expect(exists).toBeTrue();
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockBorrows);
  });

  it("should borrow a document for a specific member", () => {
    const documentId = 1;
    const memberId = 1;

    borrowService.borrowDocument(documentId, memberId).subscribe(() => {
      expect(true).toBeTrue();
    });

    const req = httpTestingController.expectOne(
      `${apiUrl}/${documentId}/${memberId}`
    );
    expect(req.request.method).toBe("POST");
    req.flush({});
  });

  it("should return a borrowed document", () => {
    const documentId = 1;

    borrowService.returnDocument(documentId).subscribe(() => {
      expect(true).toBeTrue();
    });

    const req = httpTestingController.expectOne(
      `${apiUrl}/return/${documentId}`
    );
    expect(req.request.method).toBe("POST");
    req.flush({});
  });

  it("should retrieve a list of borrowed documents", () => {
    const mockBorrowedDocuments: Borrow[] = [
      {
        borrowId: 1,
        loanDate: new Date(),
        returnDate: new Date(),
        document: {} as Document,
        member: {} as Member,
      },
      {
        borrowId: 2,
        loanDate: new Date(),
        returnDate: new Date(),
        document: {} as Document,
        member: {} as Member,
      },
    ];

    borrowService.getBorrowedDocuments().subscribe((borrowedDocuments) => {
      expect(borrowedDocuments).toEqual(mockBorrowedDocuments);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/borrowed`);
    expect(req.request.method).toBe("GET");
    req.flush(mockBorrowedDocuments);
  });

  it("should retrieve a list of returned borrows", () => {
    const mockReturnedBorrows: Borrow[] = [
      {
        borrowId: 1,
        loanDate: new Date(),
        returnDate: new Date(),
        document: {} as Document,
        member: {} as Member,
      },
      {
        borrowId: 2,
        loanDate: new Date(),
        returnDate: new Date(),
        document: {} as Document,
        member: {} as Member,
      },
    ];

    borrowService.getReturnedBorrows().subscribe((returnedBorrows) => {
      expect(returnedBorrows).toEqual(mockReturnedBorrows);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/returned`);
    expect(req.request.method).toBe("GET");
    req.flush(mockReturnedBorrows);
  });

  it("should retrieve the borrower of a document by document ID", () => {
    const documentId = 1;
    const mockBorrower = {
      memberId: 1,
      firstName: "John",
      lastName: "Doe",
      address: "123 Street",
      postalCode: "12345",
      city: "City",
    };

    borrowService.getBorrowerByDocumentId(documentId).subscribe((borrower) => {
      expect(borrower).toEqual(mockBorrower);
    });

    const req = httpTestingController.expectOne(
      `${apiUrl}/document/${documentId}/borrower`
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockBorrower);
  });

  it("should retrieve the borrow ID of a document by document ID", () => {
    const documentId = 1;
    const mockBorrowId = 1;

    borrowService.getBorrowIdByDocumentId(documentId).subscribe((borrowId) => {
      expect(borrowId).toEqual(mockBorrowId);
    });

    const req = httpTestingController.expectOne(
      `${apiUrl}/document/${documentId}`
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockBorrowId);
  });

  it("should retrieve a list of borrowed documents by member ID", () => {
    const memberId = 1;
    const mockBorrowedDocuments: Document[] = [
      {
        documentId: 1,
        title: "Titre 1",
        author: "Auteur 1",
        releaseDate: new Date(),
        available: true,
        registrationDate: new Date(),
        documentType: "BOOK",
      },
      {
        documentId: 2,
        title: "Titre 2",
        author: "Autheur 2",
        releaseDate: new Date(),
        available: true,
        registrationDate: new Date(),
        documentType: "MAGAZINE",
      },
    ];

    borrowService
      .getBorrowedDocumentsByMemberId(memberId)
      .subscribe((borrowedDocuments) => {
        expect(borrowedDocuments).toEqual(mockBorrowedDocuments);
      });

    const req = httpTestingController.expectOne(
      `${apiUrl}/member/${memberId}/borrowed`
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockBorrowedDocuments);
  });
});
