import { Component, Input } from "@angular/core";

@Component({
  selector: "app-borrows-toggle-button",
  templateUrl: "./borrows-toggle-button.component.html",
  styleUrls: ["./borrows-toggle-button.component.scss"],
})
export class BorrowsToggleButtonComponent {
  @Input() selectedPage: string;
}
