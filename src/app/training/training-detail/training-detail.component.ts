import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit, QueryList, ViewChild} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFacade } from 'src/app/auth/+state/auth.facade';
import { TrainingMove } from 'src/app/model/training-move.model';
import { TrainingSection } from 'src/app/model/training-section.model';
import { NgrxDialogFacade } from 'src/app/ngrx-dialog/+state/ngrx-dialog.facade';
import { TrainingFacade } from '../+state/training.facade';


@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.scss']
})
export class TrainingDetailComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger!: QueryList<MatMenuTrigger>;
  displayedColumns: string[] = ['name', 'set', 'repetation', 'actions'];
  
  sections$!: Observable<TrainingSection[]>;
  moves$!: Observable<TrainingMove[]>;
  isLoggedIn: boolean = false;
  
  constructor(private trainingFacade: TrainingFacade,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngrxDialogFacade: NgrxDialogFacade,
    private authFacade: AuthFacade) {
  }
  ngOnInit(): void {
    this.sections$ = this.trainingFacade.sections$;
    this.moves$ = this.trainingFacade.moves$;
    this.authFacade.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      var trainingId = paramMap.get("trainingId");
      if (!trainingId) {
        
      }else {
        this.trainingFacade.setTrainingId(trainingId);
      }
    });
  }

  openTrainingSectionDialog(section?: TrainingSection) {
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
          this.trainingFacade.updateTrainingSection();
        }else {
          this.trainingFacade.createTrainingSection();
        }
      }
    });
  }

  openTrainingMoveDialog(move? : TrainingMove) {
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
          this.trainingFacade.updateTrainingMove();
        }else {
          this.trainingFacade.createTrainingMove();
        }
      }
    });
  }

  openDeleteTrainingSectionWarningDialog(section : TrainingSection) {
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
          this.trainingFacade.deleteTrainingSeciton(section.id);
        }
      }
    });
  }

  openDeleteTrainingMoveWarningDialog(move : TrainingMove) {
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
          this.trainingFacade.deleteTrainingMove(move.id);
        }
      }
    });
  }

  openTrainingMoveActionMenu(index: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.trigger.toArray()[index].openMenu();
  }

  onExpandedSection(section: TrainingSection) {
    this.trainingFacade.setTrainingSectionId(section.id);
  }

  

}
