import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-automation-setup',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './automation-setup.component.html',
  styleUrl: './automation-setup.component.css'
})
export class AutomationSetupComponent {
  selectedSuite: string = 'Ranorex';
  projectName: string = '';
  websiteUrl: string = '';
  selectedBrowser: string = 'chrome';
  editedTestCases: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const navState = history.state;

    if (navState && navState.editedTestCases) {
      this.editedTestCases = navState.editedTestCases;
    }
  }

  generateRanorexSolution(): void {
    const automationData = {
      suite: this.selectedSuite,
      projectName: this.projectName,
      websiteUrl: this.websiteUrl,
      browser: this.selectedBrowser,
      testCases: this.editedTestCases
    };

    console.log('Generating Ranorex Solution with the following data:', automationData);

    // Send data to the backend to generate Ranorex project files
    this.http.post('http://localhost:8000/setup-automation', automationData)
      .subscribe(response => {
        console.log('Ranorex project generated successfully:', response);
      }, error => {
        console.error('Error generating Ranorex project:', error);
      });
  }

  goBackToUpload() {
    this.router.navigate(['/preview'], {
      state: { editedTestCases: this.editedTestCases, file: history.state.file}
    });
  }

}
