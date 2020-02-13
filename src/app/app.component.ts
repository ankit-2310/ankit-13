import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';
import {HitsService} from './hits.service';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ankit13';
  displayedColumns: string[] = ['title', 'url', 'created_at', 'author'];
  dataSource :any;
  interval:any 

  constructor(public dialog: MatDialog, public hitsService : HitsService) {}

  ngOnInit() {
    this.getData();
    this.setNewInterval();
  }

  ngOnDestory(){
    clearInterval(this.interval);
  }

  getData() {
    this.hitsService.get()
      .subscribe((data: {}) => {
          this.dataSource = new MatTableDataSource(data['hits']);
          console.log(this.dataSource)
      });
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setNewInterval(){
    this.interval = setInterval(() => {this.getData();},10000)
  }
}
