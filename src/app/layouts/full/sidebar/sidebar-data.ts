import { NavItem } from "./nav-item/nav-item";

export const navItems: NavItem[] = [
  {
    navCap: "Gestion",
  },
  {
    displayName: "Documents",
    iconName: "books",
    route: "/management/documents",
  },
  {
    displayName: "Membres",
    iconName: "users",
    route: "/management/members",
  },
  {
    displayName: "Emprunts",
    iconName: "book-2",
    route: "/management/borrows",
  },
  // {
  //   navCap: "Auth",
  // },
  // {
  //   displayName: "Login",
  //   iconName: "lock",
  //   route: "/authentication/login",
  // },
  // {
  //   displayName: "Register",
  //   iconName: "user-plus",
  //   route: "/authentication/register",
  // },
];
