import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  boost2: number[] = [
    1, 2, 4, 6, 9, 12, 16, 20, 25, 30, 36, 42, 49, 56, 64, 72, 81, 90, 100, 110, 121, 132, 144, 156, 169, 182, 196, 210, 225, 240, 256, 272, 289, 306, 324, 342, 361, 380, 400, 420, 441, 462, 484, 506, 529, 552, 576, 600, 625, 650
  ]

  boost3: number[] = [
    1, 2, 3, 5, 7, 9, 12, 15, 18, 22, 26, 30, 35, 40, 45, 51, 57, 63, 70, 77, 84, 92, 100, 108, 117, 126, 135, 145, 155, 165, 176, 187, 198, 210, 222, 234, 247, 260, 273, 287, 301, 315, 330, 345, 360, 376, 392, 408, 425, 442
  ]

  boost4: number[] = [
    1, 2, 3, 4, 6, 8, 10, 12, 15, 18, 21, 24, 28, 32, 36, 40, 45, 50, 55, 60, 66, 72, 78, 84, 91, 98, 105, 112, 120, 128, 136, 144, 153, 162, 171, 180, 190, 200, 210, 220, 231, 242, 253, 264, 276, 288, 300, 312, 325, 338
  ]

  boost5: number[] = [
    1, 2, 3, 4, 5, 7, 9, 11, 13, 15, 18, 21, 24, 27, 30, 34, 38, 42, 46, 50, 55, 60, 65, 70, 75, 81, 87, 93, 99, 105, 112, 119, 126, 133, 140, 148, 156, 164, 172, 180, 189, 198, 207, 216, 225, 235, 245, 255, 265, 275
  ]

  boost6: number[] = [
    1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 21, 24, 27, 30, 33, 36, 40, 44, 48, 52, 56, 60, 65, 70, 75, 80, 85, 90, 96, 102, 108, 114, 120, 126, 133, 140, 147, 154, 161, 168, 176, 184, 192, 200, 208, 216, 225, 234
  ]

  boost7: number[] = [
    1, 2, 3, 4, 5, 6, 7, 9, 11, 13, 15, 17, 19, 21, 24, 27, 30, 33, 36, 39, 42, 46, 50, 54, 58, 62, 66, 70, 75, 80, 85, 90, 95, 100, 105, 111, 117, 123, 129, 135, 141, 147, 154, 161, 168, 175, 182, 189, 196, 204
  ]

  boost8: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 42, 45, 48, 52, 56, 60, 64, 67, 72, 76, 80, 85, 90, 95, 100, 105, 110, 115, 120, 126, 132, 138, 144, 150, 156, 162, 168, 175, 182
  ]

  boost9: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 58, 62, 66, 70, 74, 78, 82, 86, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 141, 147, 153, 159, 165
  ]

  boost10: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150
  ]

  boost15: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 94, 98, 102, 106, 110
  ]

  boost20: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90
  ]

  boost25: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75
  ]

  boost30: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70
  ]

  boost30plus: number[] = [
    0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65
  ]

  boost50plus: number[] = [
    0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45
  ]

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

  ngOnInit(): void {

  }

  calcularBoost(): void {
    let boost = this.boostForm.value;
    let current = boost.currentBoost;
    let desired = boost.desiredBoost;
    let priceStone = parseFloat(boost.price)
    let priceBS = parseFloat(boost.boostStonePrice)
    let spentStones = 0;
    let stonesLeft = 0;
    let boost1: number[] = [];

    switch (boost.boost) {
      case 2:
        spentStones = this.boost2[current - 1]
        stonesLeft = this.boost2[desired - 1] - spentStones
        boost1 = this.boost2
        break;
      case 3:
        spentStones = this.boost3[current - 1]
        stonesLeft = this.boost3[desired - 1] - spentStones
        boost1 = this.boost3
        break;
      case 4:
        spentStones = this.boost4[current - 1]
        stonesLeft = this.boost4[desired - 1] - spentStones
        boost1 = this.boost4
        break;
      case 5:
        spentStones = this.boost5[current - 1]
        stonesLeft = this.boost5[desired - 1] - spentStones
        boost1 = this.boost5
        break;
      case 6:
        spentStones = this.boost6[current - 1]
        stonesLeft = this.boost6[desired - 1] - spentStones
        boost1 = this.boost6
        break;
      case 7:
        spentStones = this.boost7[current - 1]
        stonesLeft = this.boost7[desired - 1] - spentStones
        boost1 = this.boost7
        break;
      case 8:
        spentStones = this.boost8[current - 1]
        stonesLeft = this.boost8[desired - 1] - spentStones
        boost1 = this.boost8
        break;
      case 9:
        spentStones = this.boost9[current - 1]
        stonesLeft = this.boost9[desired - 1] - spentStones
        boost1 = this.boost9
        break;
      case 10:
        spentStones = this.boost10[current - 1]
        stonesLeft = this.boost10[desired - 1] - spentStones
        boost1 = this.boost10
        break;
      case 15:
        spentStones = this.boost15[current - 1]
        stonesLeft = this.boost15[desired - 1] - spentStones
        boost1 = this.boost15
        break;
      case 20:
        spentStones = this.boost20[current - 1]
        stonesLeft = this.boost20[desired - 1] - spentStones
        boost1 = this.boost20
        break;
      case 25:
        spentStones = this.boost25[current - 1]
        stonesLeft = this.boost25[desired - 1] - spentStones
        boost1 = this.boost25
        break;
      case 30:
        if (boost.stoneName === 'Metal Stone' || boost.stoneName === 'Ancient Stone' || boost.stoneName === 'Crystal Stone') {
          spentStones = this.boost30plus[current - 1]
          stonesLeft = this.boost30plus[desired - 1] - spentStones
          boost1 = this.boost30plus
        } else {
          spentStones = this.boost30[current - 1]
          stonesLeft = this.boost30[desired - 1] - spentStones
          boost1 = this.boost30
        }
        break;
      case 50:
        if (boost.stoneName === 'Metal Stone' || boost.stoneName === 'Ancient Stone' || boost.stoneName === 'Crystal Stone') {
          spentStones = this.boost50plus[current - 1]
          stonesLeft = this.boost50plus[desired - 1] - spentStones
          boost1 = this.boost50plus
        } else {
          spentStones = current
          stonesLeft = desired - current
          boost1 = current
        }
        break;
      default:
        break;
    }

    let worthBS = 0;
    let totalStonesPrice = 0;    
    
    for (let i = current; i <= 50; i++) {
      
      totalStonesPrice = (boost1[i] - boost1[i - 1]) * priceStone;      
      
      if (totalStonesPrice > priceBS) {
        worthBS = i   ;     
        i = 51;
      } else {}
    }    
    
    const dialogRef = this.dialog.open(BoostInfoComponent, { 
      disableClose: true, 
      width: 'auto',
      height: 'auto',
      data: {
        datakey: {leftStones: stonesLeft, stonePrice: priceStone, desiredBoost: desired, stoneToBS: worthBS}
      }
    })    
    
  }
}