import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, timeInterval } from 'rxjs';
import { BoostInfoComponent } from '../boost-info/boost-info.component';

@Component({
  selector: 'app-boost-form',
  templateUrl: './boost-form.component.html',
  styleUrls: ['./boost-form.component.css']
})
export class BoostFormComponent implements OnInit {

  stones: string[] =
    ['Mystic Star', 'Ancient Stone', 'Metal Stone', 'Crystal Stone', 'Enigma Stone', 'Punch Stone', 'Ice Stone', 'Fire Stone', 'Rock Stone', 'Earth Stone', 'Venom Stone', 'Thunder Stone', 'Water Stone', 'Cocoon Stone', 'Leaf Stone', 'Feather Stone', 'Heart Stone', 'Darkness Stone']

  boosts: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 50]

  boostForm: FormGroup = this.formBuilder.group({
    stoneName: ['', [Validators.required]],
    currentBoost: ['', [Validators.required, Validators.min(0), Validators.max(49)]],
    desiredBoost: ['', [Validators.required, Validators.max(50)]],
    price: [''],
    boostStonePrice: [''],
    boost: ['', [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  calcularBoost(): void {
    let boost = this.boostForm.value;
    let current = boost.currentBoost;
    let desired = boost.desiredBoost;
    let priceStone = parseFloat(boost.price)
    let priceBS = parseFloat(boost.boostStonePrice)
    let stonesLeft = 0;
    let arrayBoost: number[] = [];
    let worthBS = 0;
    let totalStonesPrice = 0;
    let perBoostPrice = 0;
    let splitStonesValue: number[] = []

    this.boostCalc(boost.stoneName).subscribe((resp) => {
      arrayBoost = resp;

      if (current === 0) {
        stonesLeft = arrayBoost[desired - 1];
        totalStonesPrice = stonesLeft * priceStone;
      } else {
        stonesLeft = arrayBoost[desired - 1] - arrayBoost[current - 1];
        totalStonesPrice = stonesLeft * priceStone;
      }
      let index = current
      
      for (let i = index; i < desired; index++) {       
        
        
        if (index === 0) {
          perBoostPrice = 0          
          
          
          
        } else {
          perBoostPrice = (arrayBoost[index] - arrayBoost[index - 1]) * priceStone;
          
        }
       
        
        if (perBoostPrice > priceBS) {
          worthBS = index;
          i = desired + 1;
                   
        }
        
      }      
      
      splitStonesValue.push(current === 0 ? arrayBoost[worthBS - 1] : arrayBoost[worthBS - 1] - arrayBoost[current - 1], current === 0 ? arrayBoost[worthBS - 1] * priceStone : (arrayBoost[worthBS - 1] - arrayBoost[current - 1]) * priceStone, desired - worthBS, (desired - worthBS) * priceBS)

      const dialogRef = this.dialog.open(BoostInfoComponent, {
        disableClose: true,
        width: 'auto',
        height: 'auto',
        data: {
          datakey: { leftStones: stonesLeft, stonePrice: priceStone, desiredBoost: desired, stoneToBS: worthBS, splitStones: splitStonesValue, stoneName: boost.stoneName }
        }
      })
    })
  }

  boostCalc(stoneName: string): Observable<any[]> {
    let boost = this.boostForm.value;
    let desired = boost.desiredBoost;
    let addStone = 0;
    let sumStone = 0;
    let arrayStones: number[] = []

    if (stoneName === 'Metal Stone' || stoneName === 'Ancient Stone' || stoneName === 'Crystal Stone') {
      for (let i = 0; i < desired; i++) {
        if (i < 10) {
          i++;
          addStone = 1;
          sumStone = sumStone + addStone;
          arrayStones.push(0, sumStone);
        } else if (i % boost.boost == 0) {
          addStone = addStone + 1;
          sumStone = sumStone + addStone;
          arrayStones.push(sumStone);
        } else {
          sumStone = sumStone + addStone;
          arrayStones.push(sumStone);
        }
      }
      return of(arrayStones)
    } else {
      for (let i = 0; i < desired; i++) {
        if (i % boost.boost == 0) {
          addStone = addStone + 1;
          sumStone = sumStone + addStone;
          arrayStones.push(sumStone);
        } else {
          sumStone = sumStone + addStone;
          arrayStones.push(sumStone);
        }
      }
      return of(arrayStones)
    }
  }
}