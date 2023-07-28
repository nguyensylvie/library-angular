import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../material.module";

// icons
import { TablerIconsModule } from "angular-tabler-icons";
import * as TablerIcons from "angular-tabler-icons/icons";

import { ManagementRoutes } from "./management.routing";

// ui components
import { DocumentsComponent } from "./documents/documents.component";
import { DetailsDocumentComponent } from "./documents/details-document/details-document.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
import { DocumentFormComponent } from "./documents/document-form/document-form.component";
import { DeleteDocumentButtonComponent } from "src/app/components/buttons/delete-document-button/delete-document-button.component";
import { EditDocumentButtonComponent } from "src/app/components/buttons/edit-document-button/edit-document-button.component";
import { MembersComponent } from "./members/members.component";
import { DetailsMemberComponent } from "./members/details-member/details-member.component";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { MemberFormComponent } from "./members/member-form/member-form.component";
import { DeleteMemberButtonComponent } from "src/app/components/buttons/delete-member-button/delete-member-button.component";
import { EditMemberButtonComponent } from "src/app/components/buttons/edit-member-button/edit-member-button.component";
import { BorrowsComponent } from "./borrows/borrows.component";
import { BorrowDocumentButtonComponent } from "src/app/components/buttons/borrow-document-button/borrow-document-button.component";
import { ReturnDocumentButtonComponent } from "src/app/components/buttons/return-document-button/return-document-button.component";
import { AllBorrowsComponent } from "./borrows/all-borrows/all-borrows.component";
import { CurrentBorrowsComponent } from "./borrows/current-borrows/current-borrows.component";
import { ReturnedBorrowsComponent } from "./borrows/returned-borrows/returned-borrows.component";
import { BorrowsToggleButtonComponent } from "src/app/components/buttons/borrows-toggle-button/borrows-toggle-button.component";
import { BorrowDialogComponent } from "src/app/components/dialogs/borrow-dialog/borrow-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ManagementRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    DocumentsComponent,
    DetailsDocumentComponent,
    DocumentEditComponent,
    DocumentFormComponent,
    DeleteDocumentButtonComponent,
    EditDocumentButtonComponent,
    MembersComponent,
    DetailsMemberComponent,
    MemberEditComponent,
    MemberFormComponent,
    DeleteMemberButtonComponent,
    EditMemberButtonComponent,
    BorrowsComponent,
    AllBorrowsComponent,
    CurrentBorrowsComponent,
    ReturnedBorrowsComponent,
    BorrowDocumentButtonComponent,
    ReturnDocumentButtonComponent,
    BorrowsToggleButtonComponent,
    BorrowDialogComponent,
  ],
})
export class ManagementModule {}
