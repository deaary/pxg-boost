import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-boost-info',
  templateUrl: './boost-info.component.html',
  styleUrls: ['./boost-info.component.css']
})
export class BoostInfoComponent implements OnInit {

  boost!: any
  desired!: any
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<BoostInfoComponent>
  ) { }

  ngOnInit(): void {
    this.dataBoost()
    console.log(this.boost.stoneToBS);
    
  }

  dataBoost(): void {
    this.boost = this.data.datakey   
    let priceToDesired = this.boost.leftStones * this.boost.stonePrice
    this.desired = priceToDesired 
  }

  close(): void { 
    this.dialogRef.close()
    window.location.reload()
  }
}
