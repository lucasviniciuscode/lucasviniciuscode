import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, MatSortable, MatSortHeader, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

export interface Info {
  time: string;
  indiceTecnico: number;
  golAverage: number
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class AppComponent implements AfterViewInit {
  constructor(private router: Router) {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'indiceTecnico':
          return item.indiceTecnico;
        case 'golAverage':
          return item.golAverage;
        default:
          return '';
      }
    };

  }

  //navigateTo(path: string) {
  //  this.router.navigate([path]);
  //}

  displayedColumns: string[] = ['time', 'indiceTecnico', 'golAverage'];
  classificacao: Info[] = [
    { time: 'REAL CITY', indiceTecnico: 3, golAverage: 5 },
    { time: 'LDF FUTSAL', indiceTecnico: 3, golAverage: 4 },
    { time: 'VILA FUTSAL', indiceTecnico: 3.0, golAverage: 2.33 },
    { time: 'OTIMIZE FÊNIX', indiceTecnico: 3.0, golAverage: 1.75 },
    { time: 'JNT FUTSAL', indiceTecnico: 2, golAverage: 12 },
    { time: 'FÚRIA', indiceTecnico: 2, golAverage: 3.75 },
    { time: 'NEW BOYS', indiceTecnico: 2, golAverage: 2.5 },
    { time: 'REIS DO SERTÃO', indiceTecnico: 1.33, golAverage: 0.75 }
  ];
  dataSource = new MatTableDataSource(this.classificacao);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.sort.active = 'indiceTecnico';
    this.sort.direction = 'desc';
    this.sort.sortChange.emit({
      active: this.sort.active,
      direction: this.sort.direction
    });

    this.dataSource.sortData = (data: Info[], sort: MatSort) => {
      const active = sort.active;
      const direction = sort.direction;
      if (!active || direction === '') {
        return data;
      }
      return data.sort((a, b) => {
        let comparatorResult = 0;

        // Ordenação primária por 'indiceTecnico'
        if (a.indiceTecnico < b.indiceTecnico) {
          comparatorResult = -1;
        } else if (a.indiceTecnico > b.indiceTecnico) {
          comparatorResult = 1;
        } else {
          // Desempate por 'golAverage'
          if (a.golAverage < b.golAverage) {
            comparatorResult = -1;
          } else if (a.golAverage > b.golAverage) {
            comparatorResult = 1;
          }
        }

        return direction === 'asc' ? comparatorResult : -comparatorResult;
      });
    };

  }


  real = 0;
  bastard = 0;
  fenix = 0;
  vila = 0;

  onGolsFenixChange(): void {
    const time = this.classificacao.find(team => team.time === 'OTIMIZE FÊNIX');

    if (time) {
      time.golAverage = (7 + this.fenix) / (4 + this.vila);
      time.indiceTecnico = this.fenix > this.vila ? 3 : 2;
      if (this.fenix == this.vila) {
        time.indiceTecnico = (7 / 3);
      }
      const sortState1: Sort = { active: 'indiceTecnico', direction: 'desc' };
      this.sort.active = sortState1.active;
      this.sort.direction = sortState1.direction;
      this.sort.sortChange.emit(sortState1);
    }

    const time1 = this.classificacao.find(team => team.time === 'VILA FUTSAL');
    if (time1) {
      time1.golAverage = (7 + this.vila) / (3 + this.fenix);
      time1.indiceTecnico = this.fenix > this.vila ? 2 : 3;
      if (this.fenix == this.vila) {
        time1.indiceTecnico = (7 / 3);

      }
    }
    this.reorder();
  }

  reorder() {
    const sortState1: Sort = { active: 'indiceTecnico', direction: 'desc' };
    this.sort.active = sortState1.active;
    this.sort.direction = sortState1.direction;
    this.sort.sortChange.emit(sortState1);
  }

  onGolsVilaChange(): void {
    const time1 = this.dataSource.data.find(team => team.time === 'VILA FUTSAL');
    if (time1) {
      time1.golAverage = (7 + this.vila) / (3 + this.fenix);
      time1.indiceTecnico = this.fenix > this.vila ? 2 : 3;
      if (this.fenix == this.vila) {
        time1.indiceTecnico = (7 / 3);

      }
    }

    const time = this.dataSource.data.find(team => team.time === 'OTIMIZE FÊNIX');

    if (time) {
      time.golAverage = (7 + this.fenix) / (4 + this.vila);
      time.indiceTecnico = this.fenix > this.vila ? 3 : 2;
      if (this.fenix == this.vila) {
        time.indiceTecnico = (7 / 3);
      }
    }
    this.reorder();
  }

  onGolsRealChange(): void {
    const time = this.dataSource.data.find(team => team.time === 'REAL CITY');
    if (time) {
      time.golAverage = (5 + this.real) / (1 + this.bastard);
      time.indiceTecnico = this.real > this.bastard ? 3 : 2;
      if (this.real == this.bastard) {
        time.indiceTecnico = (7 / 3);
      }
    }
    this.reorder();
  }
}
