import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { BorrowService } from "src/app/services/borrow/borrow.service";
import { Borrow } from "src/app/services/borrow/borrow.model";

@Component({
  selector: "app-returned-borrows",
  templateUrl: "./returned-borrows.component.html",
  styleUrls: ["./returned-borrows.component.scss"],
})
export class ReturnedBorrowsComponent implements AfterViewInit {
  borrows: Borrow[] = [];
  dataSource = new MatTableDataSource<Borrow>();

  constructor(private borrowService: BorrowService) {}

  ngOnInit(): void {
    this.loadBorrowedList();
  }

  loadBorrowedList(): void {
    this.borrowService.getReturnedBorrows().subscribe({
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
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.loadBorrowedList();
  }
}
