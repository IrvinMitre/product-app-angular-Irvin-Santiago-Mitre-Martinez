# ProductApp

An Angular application for managing products — including create, edit, delete, and view functionality.

## Live Demo

You can try the app here:

[https://product-app-angular-irvin-santiago.vercel.app/](https://product-app-angular-irvin-santiago.vercel.app/)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## History of commits

• Feature: Initialize Angular project with CLI configuration
- Generated base Angular structure using Angular CLI
- Created .gitignore with default Angular and Node rules

• Feature: Add config tailwind, eslint, prettier
- Integrated Tailwind CSS for utility-first styling
- Added ESLint with Angular support for code quality enforcement
- Configured Prettier for consistent code formatting
- Updated angular.json to include lint and style configurations

• Feature: Replace default AppComponent view with HomePage component
- Removed default Angular app files (App, app.component.ts, etc.)
- Created HomePage component as the main entry point
- Updated NgModule configuration to register HomePage
- Organized component structure inside /pages folder

• Feature: Display product list in HomePage
- Created ProductTableComponent to display product list
- Added product service and initial HTTP client configuration
- Registered necessary providers in AppModule
- Created initial test files for table and service components

• Feature: Add faker and update test
- Installed @faker-js/faker for generating mock data
- Updated product service and component tests to use Faker-generated values

• Feature: Image sizing and pagination controls
- Wrapped product images in a fixed-height container for consistent sizing
- Replaced full product list with paginatedProducts for rendering
- Implemented pagination logic to divide products into pages of 4 items each
- Improved layout alignment and loading behavior for product images

• Feature: Add product form with controller integration and home usage
- Created ProductFormComponent for adding new products
- Integrated form with ProductController for service communication
- Registered component and dependencies in AppModule
- Used the form inside HomePage layout
- Considered ImageBB integration for image uploads (pending due to time)

• Feature: Add alert componet and delete product
- Created reusable AlertComponent for success and error notifications
- Integrated alert system into HomePage and modal flow

• Feature: Update form
- Extended ProductFormComponent to handle both creation and editing
- Integrated edit handler from ProductTable into modal flow
- Preserved alert and success feedback after update

• Feature: Complete README with usage and commit history and confirm deleted
- Completed and cleaned up README.md content
- Added live demo link, usage instructions, and full commit history
- Implemented confirmation modal before deleting a product
