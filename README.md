# Recipe Table App - Frontend
## Description
This full-stack application retrieves recipes from the [MealDB API](https://www.themealdb.com/), processes them with a Python script, and then displays them in a table with Angular, .NET, and SQL Server. Moreover, all accounts are implemented with JWT authentication and access/refresh tokens. Users can view, search, favorite, create, edit, and delete recipes and admins can view, search, edit, delete, and create any user or recipe. This app is served in a local Docker Desktop/Kubernetes setup involving deployments, stateful sets, persistent volumes, and secrets. 

## Technologies Used
- Figma for designing the [UI](https://www.figma.com/design/q6Xm7O6OapUXsdYzEy3Uvq/Recipe-App-UI?node-id=1-8&p=f&t=bfuCvAstEz9dqMMa-0)
- Angular v14
- Angular CLI v14.2.13 for frontend development
- [Angular Material v14.2.7](https://v14.material.angular.dev/) for app-wide theming and general components

> [!NOTE]
> This repository is just the frontend. The rest of the technologies can be found at the [recipe-app-backend repo](https://github.com/akali013/recipe-app-backend).

## Challenges Faced
The major challenge faced in the frontend was accessiblity, as some workarounds had to be done with Angular Material components like the [Mat Table](https://v14.material.angular.dev/components/table/overview) and the [Mat Sidenav](https://v14.material.angular.dev/components/sidenav/overview) to make them navigable via the keyboard. Moreover each page is fully resizable based on the browser's screen dimensions.

## Purpose of the Project
This app helps the user conveniently find recipes, reference them for later, and contribute their own recipes to other users.

## Features
### Authentication
- A user can create an account and log into the app with that account.
- The first created account is automatically an admin account.
### Settings
- Users and admins can change their account's email and password.
- Users can view, edit, and remove their published recipes.
### Admin Features
- Admins can view, search, edit, and delete recipes from the recipes table page.
- Admins can view, search, ban/unban, and edit user accounts from the users table page.
- Admins can view, edit, and delete a user's recipes when inspecting a user.
### User Features
- Users can view, search, and favorite recipes in the recipes table page.
- The recipes table page features a section that previews recently viewed recipes.
- Users can view and manage their favorited recipes in the favorite recipes table page.
- Users can create their own recipes including a name, type (breakfast, lunch, dinner, etc.), image, ingredients, and instructions.
- Users can view, search, and delete their created recipes in the created recipes table page.

## How to Run
> [!IMPORTANT]
> The backend must be running for the app to work, which can be found at the [recipe-app-backend repo](https://github.com/akali013/recipe-app-backend).
> [Docker Desktop](https://docs.docker.com/get-started/introduction/get-docker-desktop/) and [Kubernetes with kubectl](https://kubernetes.io/releases/download/) must also be installed.

1. In any IDE, clone this repo using `git clone https://github.com/akali013/recipe-app-frontend.git`.
2. Navigate into the recipe-app-frontend directory using `cd recipe-app-frontend`.
3. In Docker Desktop, go to the Kubernetes section and start a Kubeadm cluster.
4. Start the Kubernetes frontend deployment and service using `kubectl apply -f recipe-app-frontend-kubernetes.yaml`. The app is running if the following output is:
`deployment.apps/recipe-app-frontend created
service/recipe-app-frontend-service created`
5. Go to [http://localhost:30001](http://localhost:30001) in a browser to access the app.

## Credits
- [The MealDB API](https://www.themealdb.com/api.php)
- [Angular JWT Authentication](https://jasonwatmore.com/angular-15-auth-boilerplate-sign-up-with-verification-login-and-forgot-password) by Jason Watmore
- [Angular Docker/Kubernetes setup](https://docs.docker.com/guides/angular/) by Kristiyan Velkov
