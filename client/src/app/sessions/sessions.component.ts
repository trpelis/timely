import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { ProjectsService } from '../projects/projects.api';
import { Project } from '../projects/project-sample';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  startTime = new Date();
  endTime = new Date();
  durationMS = 0;

  duration = {
    hours: 0,
    minutes: 0
  }

  createProject: Project = {
    id: 0,
    name: "",
    startTime: "",
    endTime: "",
    duration: ""
  };

  isRunning = false;

  constructor(
    private dialog: MatDialog,
    private projectsService: ProjectsService
  ) { }

  ngOnInit(): void {
  }

  onButtonClick() {
    let date = new Date();

    if (this.isRunning) {
      this.endTime = date;
      this.createProject.endTime = this.dateTransform(date);

      this.addNewProject();
    } else {
      this.startTime = date;
      this.createProject.startTime = this.dateTransform(date);
    }
    this.isRunning = !this.isRunning;
  }

  dateTransform(date: Date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).slice(-2); //get month is zero based, could use .padStart, slice is faster
    let day = String(date.getDate()).slice(-2);
    let hour = String(date.getHours()).slice(-2);
    let mins = String(date.getMinutes()).slice(-2);

    return day + '.' + month + '.' + year + " " + hour + ":" + mins;
  }

  durationCalculation() {
    this.durationMS = this.endTime.valueOf() - this.startTime.valueOf();
    this.duration.minutes = Math.floor(Math.floor(this.durationMS / 60000));
    this.duration.hours = Math.floor(this.duration.minutes / 60);
    this.duration.minutes = this.duration.minutes % 60;

    this.createProject.duration = this.duration.hours + ":" + this.duration.minutes;
  }

  addNewProject() {
    this.durationCalculation();

    let dialogReference = this.dialog.open(DialogBoxComponent);
    dialogReference.afterClosed().subscribe(passed => {
      if (passed) {
        this.createProject.name = passed.name;

        const project = new Project(
          0,
          this.createProject.name,
          this.createProject.startTime,
          this.createProject.endTime,
          this.createProject.duration
        );
        this.projectsService.addNewProject(project).subscribe(
          response => { },
          errorLog => {
            console.log(errorLog)
          }
        );
      }
    });

  }
}
