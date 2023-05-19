import { Component, OnInit,ViewChild, TemplateRef } from '@angular/core';
import { MatDialog,MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Date','Timing', 'actions'];
  dataSource: any[] = [
    { name: 'Item 1', date: new Date('2023-05-18') },
    { name: 'Item 2', date: new Date('2023-05-19') },
    { name: 'Item 3', date: new Date('2023-05-20') }
  ];
  @ViewChild('editDialogTemplate', { static: true }) editDialogTemplate!: TemplateRef<any>;
  constructor(private dialog: MatDialog) {}
  // editElement(element: any) {
  //   // Handle edit action
  //   console.log('Edit:', element);
  //   alert("Pop")
  // }
  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(this.editDialogTemplate, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle changes from dialog
        console.log('Save:', result);
      }
    });
  }
  closeDialog() {
    this.dialog.closeAll();
  }
  deleteElement(element: any) {
    // Handle delete action
    console.log('Delete:', element);
  }

  ngOnInit(): void {
  }

}
