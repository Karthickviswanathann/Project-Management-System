import { Component, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(
    private title: Title,
    private meta: Meta
  ) {
  }

  ngOnInit(): void {

    this.title.setTitle(
      'Allocate — Smart Project & Resource Management'
    );

    this.meta.addTags([

      {
        name: 'description',
        content:
          'Plan projects, allocate resources, and track delivery in one place.'
      },

      {
        property: 'og:title',
        content:
          'Allocate — Smart Project & Resource Management'
      },

      {
        property: 'og:type',
        content: 'website'
      }

    ]);

  }

}
