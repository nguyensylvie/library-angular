import { Routes } from "@angular/router";
import { DocumentsComponent } from "./management/documents/documents.component";

export const PagesRoutes: Routes = [
  {
    path: "",
    component: DocumentsComponent,
    data: {
      title: "Starter Page",
    },
  },
];
