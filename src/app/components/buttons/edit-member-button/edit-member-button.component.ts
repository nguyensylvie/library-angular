import { Component, Input } from "@angular/core";

@Component({
  selector: "app-edit-member-button",
  templateUrl: "./edit-member-button.component.html",
  styleUrls: ["./edit-member-button.component.scss"],
})
export class EditMemberButtonComponent {
  @Input() memberId: number;
}
