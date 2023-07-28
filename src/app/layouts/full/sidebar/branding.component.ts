import { Component } from "@angular/core";

@Component({
  selector: "app-branding",
  template: `
    <div class="branding">
      <a href="/" class="d-flex align-items-center">
        <img src="./assets/images/logos/books.png" class="m-2" alt="logo" />
        <span class="align-middle m-l-10">Gestion de bibliothèque</span>
      </a>
    </div>
  `,
  styleUrls: ["./branding.component.scss"],
})
export class BrandingComponent {
  constructor() {}
}
