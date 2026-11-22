# Graph Report - qr-attendance-system-with-laraverl-api  (2026-11-22)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 528 nodes · 909 edges · 42 communities (12 shown, 30 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ee43b45c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.jsx
- composer.json
- Illuminate\Database\Schema\Blueprint
- frontend/package.json
- Illuminate\Database\Eloquent\Factories\Factory
- Illuminate\Http\Request
- backend/package.json
- Illuminate\Database\Seeder
- Enrollment
- User
- EnrollmentController
- RoleController
- ScheduleController
- SubjectController
- Schedule
- Subject
- Illuminate\Foundation\Http\FormRequest
- Attendance
- Illuminate\Auth\Access\Response
- bootstrap/app.php
- StoreAttendanceRequest
- AppServiceProvider
- TestCase.php

## God Nodes (most connected - your core abstractions)
1. `User` - 55 edges
2. `react` - 22 edges
3. `Subject` - 20 edges
4. `Enrollment` - 18 edges
5. `Attendance` - 16 edges
6. `Schedule` - 15 edges
7. `Role` - 14 edges
8. `Controller` - 9 edges
9. `require-dev` - 9 edges
10. `RolePolicy` - 8 edges

## Surprising Connections (you probably didn't know these)
- `autoprefixer@^10.4.20` --declares--> `autoprefixer`  [EXTRACTED]
  frontend/package.json → backend/package.json
- `tailwindcss@^3.4.15` --declares--> `tailwindcss`  [EXTRACTED]
  frontend/package.json → backend/package.json
- `EnrollmentController` --inherits--> `Controller`  [EXTRACTED]
  backend/app/Http/Controllers/EnrollmentController.php → backend/app/Http/Controllers/Controller.php
- `RoleController` --inherits--> `Controller`  [EXTRACTED]
  backend/app/Http/Controllers/RoleController.php → backend/app/Http/Controllers/Controller.php
- `ScheduleController` --inherits--> `Controller`  [EXTRACTED]
  backend/app/Http/Controllers/ScheduleController.php → backend/app/Http/Controllers/Controller.php

## Import Cycles
- 2-file cycle: `frontend/src/components/FacultySubjectModal.jsx -> frontend/src/components/Student.jsx -> frontend/src/components/FacultySubjectModal.jsx`
- 2-file cycle: `frontend/src/components/FacultySubjectModal.jsx -> frontend/src/components/SubjectStudentDetails.jsx -> frontend/src/components/FacultySubjectModal.jsx`
- 2-file cycle: `frontend/src/App.jsx -> frontend/src/Dashboard.jsx -> frontend/src/App.jsx`
- 2-file cycle: `frontend/src/App.jsx -> frontend/src/ModalOverlay.jsx -> frontend/src/App.jsx`
- 3-file cycle: `frontend/src/App.jsx -> frontend/src/Authentication.jsx -> frontend/src/components/LoginForm.jsx -> frontend/src/App.jsx`
- 3-file cycle: `frontend/src/App.jsx -> frontend/src/Dashboard.jsx -> frontend/src/components/QrPage.jsx -> frontend/src/App.jsx`
- 3-file cycle: `frontend/src/App.jsx -> frontend/src/Dashboard.jsx -> frontend/src/components/ProfilePage.jsx -> frontend/src/App.jsx`
- 3-file cycle: `frontend/src/App.jsx -> frontend/src/ModalOverlay.jsx -> frontend/src/components/FacultySubjectModal.jsx -> frontend/src/App.jsx`
- 3-file cycle: `frontend/src/App.jsx -> frontend/src/Dashboard.jsx -> frontend/src/components/Header.jsx -> frontend/src/App.jsx`
- 3-file cycle: `frontend/src/App.jsx -> frontend/src/Authentication.jsx -> frontend/src/components/RegistrationForm.jsx -> frontend/src/App.jsx`
- 4-file cycle: `frontend/src/App.jsx -> frontend/src/Dashboard.jsx -> frontend/src/StudentPage.jsx -> frontend/src/components/QrPage.jsx -> frontend/src/App.jsx`
- 4-file cycle: `frontend/src/App.jsx -> frontend/src/Dashboard.jsx -> frontend/src/FacultyPage.jsx -> frontend/src/components/ProfilePage.jsx -> frontend/src/App.jsx`
- 4-file cycle: `frontend/src/App.jsx -> frontend/src/Dashboard.jsx -> frontend/src/StudentPage.jsx -> frontend/src/components/ProfilePage.jsx -> frontend/src/App.jsx`
- 4-file cycle: `frontend/src/App.jsx -> frontend/src/Dashboard.jsx -> frontend/src/FacultyPage.jsx -> frontend/src/components/QrScanner.jsx -> frontend/src/App.jsx`
- 4-file cycle: `frontend/src/App.jsx -> frontend/src/ModalOverlay.jsx -> frontend/src/components/FacultySubjectModal.jsx -> frontend/src/components/SubjectStudentDetails.jsx -> frontend/src/App.jsx`
- 4-file cycle: `frontend/src/App.jsx -> frontend/src/Dashboard.jsx -> frontend/src/components/StudentSubjectPage.jsx -> frontend/src/components/Subject.jsx -> frontend/src/App.jsx`
- 5-file cycle: `frontend/src/App.jsx -> frontend/src/Dashboard.jsx -> frontend/src/StudentPage.jsx -> frontend/src/components/StudentSubjectPage.jsx -> frontend/src/components/Subject.jsx -> frontend/src/App.jsx`
- 5-file cycle: `frontend/src/App.jsx -> frontend/src/Dashboard.jsx -> frontend/src/FacultyPage.jsx -> frontend/src/components/FacultySubjectPage.jsx -> frontend/src/components/FacultySubject.jsx -> frontend/src/App.jsx`

## Communities (42 total, 30 thin omitted)

### Community 0 - "App.jsx"
Cohesion: 0.09
Nodes (36): App(), CurrentSubjectContext, IsLoggedInContext, IsModalOnContext, ModalIdContext, NextSubjectsContext, SelectedNavBtnContext, SelectedSubjectContext (+28 more)

### Community 1 - "composer.json"
Cohesion: 0.04
Nodes (46): pestphp/pest-plugin, php-http/discovery, autoload, autoload-dev, psr-4, psr-4, config, allow-plugins (+38 more)

### Community 2 - "Illuminate\Database\Schema\Blueprint"
Cohesion: 0.07
Nodes (14): {closure#1}(), {closure#1}(), {closure#2}(), {closure#3}(), {closure#1}(), {closure#2}(), {closure#1}(), {closure#2}() (+6 more)

### Community 3 - "frontend/package.json"
Cohesion: 0.07
Nodes (42): dependencies, react@^18.3.1, react-dom@^18.3.1, react-qr-code@^2.0.15, @yudiel/react-qr-scanner@^2.0.8, devDependencies, eslint@^9.15.0, @eslint/js@^9.15.0 (+34 more)

### Community 4 - "Illuminate\Database\Eloquent\Factories\Factory"
Cohesion: 0.08
Nodes (6): AttendanceFactory, EnrollmentFactory, RoleFactory, ScheduleFactory, SubjectFactory, UserFactory

### Community 5 - "Illuminate\Http\Request"
Cohesion: 0.10
Nodes (6): AttendanceController, AuthController, Controller, RecordController, UserController, GET /user()

### Community 6 - "backend/package.json"
Cohesion: 0.09
Nodes (22): devDependencies, autoprefixer@^10.4.20, axios@^1.7.4, concurrently@^9.0.1, laravel-vite-plugin@^1.0, postcss@^8.4.47, tailwindcss@^3.4.13, vite@^5.0 (+14 more)

### Community 7 - "Illuminate\Database\Seeder"
Cohesion: 0.13
Nodes (7): AttendanceSeeder, DatabaseSeeder, EnrollmentSeeder, RoleSeeder, ScheduleSeeder, SubjectSeeder, UserSeeder

### Community 10 - "User"
Cohesion: 0.25
Nodes (3): Role, User, RolePolicy

### Community 11 - "EnrollmentController"
Cohesion: 0.15
Nodes (3): EnrollmentController, StoreEnrollmentRequest, UpdateEnrollmentRequest

### Community 12 - "RoleController"
Cohesion: 0.15
Nodes (3): RoleController, StoreRoleRequest, UpdateRoleRequest

### Community 13 - "ScheduleController"
Cohesion: 0.15
Nodes (3): ScheduleController, StoreScheduleRequest, UpdateScheduleRequest

## Knowledge Gaps
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `User` connect `User` to `Illuminate\Database\Eloquent\Factories\Factory`, `Illuminate\Http\Request`, `Illuminate\Database\Seeder`, `Enrollment`, `User.php`, `SubjectController`, `Schedule`, `Subject`, `Attendance`, `Illuminate\Auth\Access\Response`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09126984126984126 - nodes in this community are weakly interconnected._
- **Why does `Enrollment` connect `Enrollment` to `Illuminate\Database\Eloquent\Factories\Factory`, `Illuminate\Http\Request`, `Illuminate\Database\Seeder`, `EnrollmentController`, `Illuminate\Auth\Access\Response`, `console.php`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Should `composer.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Why does `react` connect `App.jsx` to `frontend/package.json`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `Illuminate\Database\Schema\Blueprint` be split into smaller, more focused modules?**
  _Cohesion score 0.07246376811594203 - nodes in this community are weakly interconnected._
- **Should `frontend/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06553911205073996 - nodes in this community are weakly interconnected._