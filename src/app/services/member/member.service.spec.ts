import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { MemberService } from "./member.service";
import { Member } from "./member.model";
import { environment } from "src/environments/environment";

describe("MemberService", () => {
  let memberService: MemberService;
  let httpTestingController: HttpTestingController;

  let apiUrl = `${environment.apiUrl}/members`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberService],
    });
    memberService = TestBed.inject(MemberService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(memberService).toBeTruthy();
  });

  it("should retrieve members from the API via GET", () => {
    const mockMembers: Member[] = [
      {
        memberId: 1,
        firstName: "John",
        lastName: "Doe",
        address: "1 rue de la Paix",
        postalCode: "75000",
        city: "Paris",
        registrationDate: new Date(),
      },
      {
        memberId: 2,
        firstName: "Jane",
        lastName: "Doe",
        address: "1 rue de la Paix",
        postalCode: "75000",
        city: "Paris",
        registrationDate: new Date(),
      },
    ];

    memberService.getAllMembers().subscribe((members) => {
      expect(members).toEqual(mockMembers);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockMembers);
  });

  it("should retrieve a member by ID via GET", () => {
    const memberId = 1;
    const mockMember: Member = {
      memberId: 1,
      firstName: "John",
      lastName: "Doe",
      address: "1 rue de la Paix",
      postalCode: "75000",
      city: "Paris",
      registrationDate: new Date(),
    };

    memberService.getMemberById(memberId).subscribe((member) => {
      expect(member).toEqual(mockMember);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${memberId}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockMember);
  });

  it("should check if a member exists", () => {
    const mockMembers: Member[] = [
      {
        memberId: 1,
        firstName: "John",
        lastName: "Doe",
        address: "1 rue de la Paix",
        postalCode: "75000",
        city: "Paris",
        registrationDate: new Date(),
      },
      {
        memberId: 2,
        firstName: "Jane",
        lastName: "Doe",
        address: "1 rue de la Paix",
        postalCode: "75000",
        city: "Paris",
        registrationDate: new Date(),
      },
    ];
    const memberIdToCheck = 1;

    memberService.isMemberExists(memberIdToCheck).subscribe((exists) => {
      expect(exists).toBeTrue();
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockMembers);
  });

  it("should add a new member via POST", () => {
    const newMember: Member = {
      memberId: 1,
      firstName: "John",
      lastName: "Doe",
      address: "1 rue de la Paix",
      postalCode: "75000",
      city: "Paris",
      registrationDate: new Date(),
    };

    memberService.addMember(newMember).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe("POST");
    req.flush({});
  });

  it("should update an existing member via PUT", () => {
    const updatedMember: Member = {
      memberId: 1,
      firstName: "John",
      lastName: "Doe",
      address: "1 rue de la Paix",
      postalCode: "75000",
      city: "Paris",
      registrationDate: new Date(),
    };

    memberService.updateMember(updatedMember).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${apiUrl}/${updatedMember.memberId}`
    );
    expect(req.request.method).toBe("PUT");
    req.flush({});
  });

  it("should delete a member via DELETE", () => {
    const memberIdToDelete = 1;

    memberService.deleteMember(memberIdToDelete).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${apiUrl}/${memberIdToDelete}`
    );
    expect(req.request.method).toBe("DELETE");
    req.flush({});
  });
});
