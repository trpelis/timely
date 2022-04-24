import {EventEmitter, Injectable} from "@angular/core";
import { HttpClient} from "@angular/common/http";
import {Project} from "./project-sample";


/*The @Injectable() decorator specifies that Angular can use this class in the DI system. The metadata, 
providedIn: 'root', means that the service is visible throughout the application.

*/
@Injectable(
  {
    providedIn: 'root',
  }
)
export class ProjectsService {
  projectsChange = new EventEmitter<Project[]>();
  private projects: Project[] = [];
  readonly baseURL = "http://localhost:8000/api/timely/work-sessions";

  constructor(private http: HttpClient) {}

  setProjects() {
    this.http.get<Project[]>(this.baseURL)
      .subscribe(response => {
        this.projects = response;
        this.projectsChange.emit(this.projects.slice());
      });
  }

  getProjects() {
    return this.projects.slice();
  }

  addNewProject(project: Project) {
    this.projects.push(project);
    this.projectsChange.emit(this.projects.slice());
    return this.http.post(this.baseURL, project);
  }
}
