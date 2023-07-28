import { Component, Input } from "@angular/core";

@Component({
  selector: "app-edit-document-button",
  templateUrl: "./edit-document-button.component.html",
  styleUrls: ["./edit-document-button.component.scss"],
})
export class EditDocumentButtonComponent {
  @Input() documentId: number;
}
