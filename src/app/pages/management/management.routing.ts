import { Routes } from "@angular/router";

// ui
import { DocumentsComponent } from "./documents/documents.component";
import { DetailsDocumentComponent } from "./documents/details-document/details-document.component";
import { DocumentFormComponent } from "./documents/document-form/document-form.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
import { MembersComponent } from "./members/members.component";
import { DetailsMemberComponent } from "./members/details-member/details-member.component";
import { MemberFormComponent } from "./members/member-form/member-form.component";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { BorrowsComponent } from "./borrows/borrows.component";
import { CurrentBorrowsComponent } from "./borrows/current-borrows/current-borrows.component";
import { ReturnedBorrowsComponent } from "./borrows/returned-borrows/returned-borrows.component";
import { AllBorrowsComponent } from "./borrows/all-borrows/all-borrows.component";

export const ManagementRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "documents",
        component: DocumentsComponent,
      },
      {
        path: "documents/add",
        component: DocumentFormComponent,
      },
      {
        path: "documents/:id",
        component: DetailsDocumentComponent,
      },
      {
        path: "documents/edit/:id",
        component: DocumentEditComponent,
      },
      {
        path: "members",
        component: MembersComponent,
      },
      {
        path: "members/add",
        component: MemberFormComponent,
      },
      {
        path: "members/:id",
        component: DetailsMemberComponent,
      },
      {
        path: "members/edit/:id",
        component: MemberEditComponent,
      },
      {
        path: "borrows",
        component: BorrowsComponent,
      },
      {
        path: "borrows/all",
        component: AllBorrowsComponent,
      },
      {
        path: "borrows/current",
        component: CurrentBorrowsComponent,
      },
      {
        path: "borrows/returned",
        component: ReturnedBorrowsComponent,
      },
    ],
  },
];
