import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { BorrowService } from "src/app/services/borrow/borrow.service";
import { Borrow } from "src/app/services/borrow/borrow.model";

@Component({
  selector: "app-all-borrows",
  templateUrl: "./all-borrows.component.html",
  styleUrls: ["./all-borrows.component.scss"],
})
export class AllBorrowsComponent implements AfterViewInit {
  borrows: Borrow[] = [];
  dataSource = new MatTableDataSource<Borrow>();

  constructor(private borrowService: BorrowService) {}

  ngOnInit(): void {
    this.loadBorrowList();
  }

  loadBorrowList(): void {
    this.borrowService.getAllBorrows().subscribe({
      next: (borrows: Borrow[]) => {
        this.borrows = borrows;
        this.dataSource.data = this.borrows;
        this.dataSource.paginator = this.paginator;
      },
      error: (e) => console.error(e),
    });
  }

  displayedColumns: string[] = [
    "position",
    "document",
    "member",
    "loanDate",
    "returnDate",
    "action",
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.loadBorrowList();
  }
}
