import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit, QueryList, ViewChild} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WorkoutMove } from 'src/app/model/workout-move.model';
import { WorkoutSection } from 'src/app/model/workout-section.model';
import { NgrxDialogFacade } from 'src/app/ngrx-dialog/+state/ngrx-dialog.facade';
import { WorkoutFacade } from '../+state/workout.facade';


@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss']
})
export class WorkoutDetailComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger!: QueryList<MatMenuTrigger>;
  displayedColumns: string[] = ['name', 'set', 'repetation', 'actions'];
  
  sections$!: Observable<WorkoutSection[]>;
  moves$!: Observable<WorkoutMove[]>;
  
  constructor(private workoutFacade: WorkoutFacade,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngrxDialogFacade: NgrxDialogFacade) {
  }
  ngOnInit(): void {
    this.sections$ = this.workoutFacade.sections$;
    this.moves$ = this.workoutFacade.moves$;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      var workoutId = paramMap.get("workoutId");
      if (!workoutId) {
        
      }else {
        this.workoutFacade.setWorkoutId(workoutId);
      }
    });
  }

  openWorkoutSectionDialog(section?: WorkoutSection) {
    const dialogRef = this.ngrxDialogFacade.openFormDialog(
      {
        title: "Antrenman Bolumu",
        actions: [
          { text: "Iptal", value: "CANCEL" },
          { text: "Kaydet", value: "OK", color: 'primary' },
        ],
        formData: {
          id: section ? section.id : '',
          name: section ? section.name : '',
          desc: section ? section.desc : ''
        },
        formStructure: [
          { name: "name", type: 'INPUT', label: "Antrenman Bolum Adi", placeholder: "Ornek: Gogus Ve Biceps", validator: [Validators.required]},
          { name: "desc", type: 'TEXTAREA', label: "Antrenman Bolum Aciklamasi", placeholder: "Ornek: Haftanin 1. gunu", validator: [Validators.required]},
        ]
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result == "OK") {
        if(section && section.id) {
          this.workoutFacade.updateWorkoutSection();
        }else {
          this.workoutFacade.createWorkoutSection();
        }
      }
    });
  }

  openWorkoutMoveDialog(move? : WorkoutMove) {
    const dialogRef = this.ngrxDialogFacade.openFormDialog(
      {
        title: "Hareket",
        actions: [
          { text: "Iptal", value: "CANCEL" },
          { text: "Kaydet", value: "OK", color: 'primary' },
        ],
        formData: {
          id: move ? move.id : '',
          name: move ? move.name : '',
          set: move ? move.set : '',
          repetition: move ? move.repetition : ''
        },
        formStructure: [
          { name: "name", type: 'INPUT', label: "Hareket Adi", placeholder: "Ornek: Bench Press", validator: [Validators.required]},
          { name: "set", type: 'INPUT', label: "Set Sayisi", placeholder: "Ornek: 4", validator: [Validators.required]},
          { name: "repetition", type: 'INPUT', label: "Tekrar Sayisi", placeholder: "Ornek: 12, 10, 8, 6", validator: [Validators.required]},
        ]
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result == "OK") {
        if(move && move.id) {
          this.workoutFacade.updateWorkoutMove();
        }else {
          this.workoutFacade.createWorkoutMove();
        }
      }
    });
  }

  openDeleteWorkoutSectionWarningDialog(section : WorkoutSection) {
    const dialogRef = this.ngrxDialogFacade.openMessageDialog({
      title: "Uyari",
      message: "Bu bolumu silmek istediginizden emin misiniz?",
      actions: [
        { text: "Iptal", value: "CANCEL" },
        { text: "Devam", value: "OK", color: 'primary' },
      ],
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result == "OK") {
        if(section && section.id) {
          this.workoutFacade.deleteWorkoutSeciton(section.id);
        }
      }
    });
  }

  openDeleteWorkoutMoveWarningDialog(move : WorkoutMove) {
    const dialogRef = this.ngrxDialogFacade.openMessageDialog({
      title: "Uyari",
      message: "Bu hareketi silmek istediginizden emin misiniz?",
      actions: [
        { text: "Iptal", value: "CANCEL" },
        { text: "Devam", value: "OK", color: 'primary' },
      ],
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result == "OK") {
        if(move && move.id) {
          this.workoutFacade.deleteWorkoutMove(move.id);
        }
      }
    });
  }

  openWorkoutMoveActionMenu(index: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.trigger.toArray()[index].openMenu();
  }

  onExpandedSection(section: WorkoutSection) {
    this.workoutFacade.setWorkoutSectionId(section.id);
  }

  

}
