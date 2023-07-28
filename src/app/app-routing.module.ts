import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlankComponent } from "./layouts/blank/blank.component";
import { FullComponent } from "./layouts/full/full.component";

const routes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      {
        path: "",
        redirectTo: "/management/documents",
        pathMatch: "full",
      },
      {
        path: "management",
        loadChildren: () =>
          import("./pages/management/management.module").then(
            (m) => m.ManagementModule
          ),
      },
    ],
  },
  {
    path: "",
    component: BlankComponent,
    children: [
      {
        path: "authentication",
        loadChildren: () =>
          import("./pages/authentication/authentication.module").then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
