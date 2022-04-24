import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from './project-sample';
import { ProjectsService } from './projects.api';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  displayColumns = ["name", "start", "end", "duration"];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.projectsService.setProjects();
    this.projects = this.projectsService.getProjects();
    this.projectsService.projectsChange.subscribe(
      (projects: Project[]) =>{
        this.projects = projects;
      }
    )
  }

}
