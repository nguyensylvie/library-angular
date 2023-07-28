import { Document } from "../document/document.model";
import { Member } from "../member/member.model";

export interface Borrow {
  borrowId: number;
  loanDate: Date;
  returnDate: Date;
  document: Document;
  member: Member;
}
