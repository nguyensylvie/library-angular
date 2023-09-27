import { AfterViewInit, Component, ViewChild, ElementRef } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MemberService } from "src/app/services/member/member.service";
import { Member } from "src/app/services/member/member.model";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"],
})
export class MembersComponent implements AfterViewInit {
  members: Member[] = [];
  dataSource = new MatTableDataSource<Member>();

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.loadMemberList();
  }

  loadMemberList(): void {
    this.memberService.getAllMembers().subscribe({
      next: (members: Member[]) => {
        this.members = members;
        this.dataSource.data = this.members;
        this.dataSource.paginator = this.paginator;
      },
      error: (e) => console.error(e),
    });
  }

  clearSearchInput() {
    this.searchInput.nativeElement.value = "";
    this.dataSource.filter = "";
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const fullName = `${data.firstName} ${data.lastName}`.toLowerCase();
      const address = data.address.toLowerCase();
      const city = data.city.toLowerCase();
      const postalCode = data.postalCode.toLowerCase();
      return (
        fullName.includes(filter) ||
        address.includes(filter) ||
        city.includes(filter) ||
        postalCode.includes(filter)
      );
    };
  }

  displayedColumns: string[] = ["position", "name", "address", "actions"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("searchInput") searchInput: ElementRef;

  ngAfterViewInit() {
    this.loadMemberList();
  }
}
