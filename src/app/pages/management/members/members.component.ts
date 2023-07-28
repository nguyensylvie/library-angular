import { AfterViewInit, Component, ViewChild } from "@angular/core";
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

  displayedColumns: string[] = ["position", "name", "address", "actions"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.loadMemberList();
  }
}
