import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { BoostInfoComponent } from '../boost-info/boost-info.component';

@Component({
  selector: 'app-boost-form',
  templateUrl: './boost-form.component.html',
  styleUrls: ['./boost-form.component.css']
})
export class BoostFormComponent implements OnInit {

  stones: string[] =
    ['Mystic Star', 'Ancient Stone', 'Metal Stone', 'Crystal Stone', 'Enigma Stone', 'Punch Stone', 'Ice Stone', 'Fire Stone', 'Rock Stone', 'Earth Stone', 'Venom Stone', 'Thunder Stone', 'Water Stone', 'Cocoon Stone', 'Leaf Stone', 'Feather Stone', 'Heart Stone', 'Darkness Stone', 'Dimensional Stone', 'Mirror Stone'];

  boosts: number[] = [];
  boosts1: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 50];
  boosts2: number[] = [30, 50];

  boostForm: FormGroup = this.formBuilder.group({
    stoneName: ['', [Validators.required]],
    currentBoost: ['', [Validators.required, Validators.min(0), Validators.max(49)]],
    desiredBoost: ['', [Validators.required, Validators.max(50), Validators.min(1)]],
    price: [''],
    boostStonePrice: [''],
    boost: ['', [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  checkStone() {
    let getStone = this.boostForm.value.stoneName;

    if (getStone === 'Metal Stone' || getStone === 'Crystal Stone' || getStone === 'Ancient Stone') {
      this.boosts = this.boosts2
    } else {
      this.boosts = this.boosts1
    }
  }

  calcularBoost(): void {
    let boost = this.boostForm.value;
    let current = boost.currentBoost;
    let desired = boost.desiredBoost;
    let priceStone = boost.price
    let priceBS = boost.boostStonePrice
    let stonesLeft = 0;
    let arrayBoost: number[] = [];
    let worthBS = 0;
    let totalStonesPrice = 0;
    let perBoostPrice = 0;
    let splitStonesValue: number[] = [];
    let indexCurrent = current;
    let bsBetter = false;

    this.boostCalc(boost.stoneName).subscribe((resp) => {
      arrayBoost = resp;

      if (current === 0) {
        stonesLeft = arrayBoost[desired - 1];
        totalStonesPrice = stonesLeft * priceStone;
      } else {
        stonesLeft = arrayBoost[desired - 1] - arrayBoost[current - 1];
        totalStonesPrice = stonesLeft * priceStone;
      }

      for (let i = indexCurrent; i < desired; indexCurrent++) {
        perBoostPrice = (arrayBoost[indexCurrent] - arrayBoost[indexCurrent - 1]) * priceStone;

        if (priceStone > priceBS) {
          bsBetter = true;
          worthBS = 0;
          i = desired + 1;
        } else if (perBoostPrice > priceBS) {
          worthBS = indexCurrent;
          i = desired + 1;
        }
        else {
          i++
        }

        if (indexCurrent === 0) {
          perBoostPrice = 0
        } else {
          perBoostPrice = (arrayBoost[indexCurrent] - arrayBoost[indexCurrent - 1]) * priceStone;
        }
      }

      if (worthBS === 0) {
        splitStonesValue.push(0, 0, desired - worthBS, (desired - worthBS) * priceBS)
      } else {
        splitStonesValue.push(current === 0 ? arrayBoost[worthBS - 1] : arrayBoost[worthBS - 1] - arrayBoost[current - 1], current === 0 ? arrayBoost[worthBS - 1] * priceStone : (arrayBoost[worthBS - 1] - arrayBoost[current - 1]) * priceStone, desired - worthBS, (desired - worthBS) * priceBS)
      }

      const dialogRef = this.dialog.open(BoostInfoComponent, {
        disableClose: true,
        width: 'auto',
        height: 'auto',
        data: {
          datakey: { leftStones: stonesLeft, stonePrice: priceStone, desiredBoost: desired, stoneToBS: worthBS, splitStones: splitStonesValue, stoneName: boost.stoneName, bsZero: bsBetter }
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

    if (stoneName == 'Metal Stone' || stoneName == 'Ancient Stone' || stoneName == 'Crystal Stone') {
      for (let i = 0; i < desired; i++) {

        if (i < 10) {
          i++;
          addStone = 1;
          sumStone = sumStone + addStone;
          arrayStones.push(sumStone, sumStone);
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

  reloadPage(): void {
    window.location.reload();
  }
}