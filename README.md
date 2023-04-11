# COMP6251 Project

-   Using the template from [vite-react-ts-tailwind-firebase-starter](https://github.com/TeXmeijin/vite-react-ts-tailwind-firebase-starter)
-   [Linear](https://linear.app/find-a-service-project/project/find-a-service-project-0ed999db45f3/6251) for project management

## Libraries

-   [React v18.2](https://github.com/facebook/react)
-   [TypeScript](https://github.com/microsoft/TypeScript)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Firebase(v9, modular)](https://firebase.google.com/)
-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [Vite](https://github.com/vitejs/vite)

## Set up

```shell
mv .env.local.example .env.local
# then edit .env.local via the document on linear.app
yarn
yarn dev
```

## Demo

for now, I have created the register and login page with firebase auth.
Note that the backend is changed to firebase since this one is recommended at lecture, and quite convenient based on this project's requirements.
![](images/CleanShot1.PNG)

## FireStore Structure

```
Firestore-root
  |
  --- admin (collection)
  |    |
  |    --- $uid (document)
  |         |
  |         --- //user fields.
  |
  --- serviceProvider (collection)
  |    |
  |    --- $uid (document)
  |         |
  |         --- //user fields.
  |
  --- customer (collection)
  |    |
  |    --- $uid (document)
  |         |
  |         --- //user fields.
  |
  --- service (collection)
       |
       --- $serviceId (document)
            |
            --- uid: "veryLongUid"
            |
            --- //service fields.
            |
            --- comments (sub-collection)
                  |
                  --- $commentId (document)
                         |
                         --- uid: "veryLongUid"
                         |
                         --- //comment fields.
```

## Project File Structure

```
D:.
│   App.tsx
│   favicon.svg
│   index.css
│   logo.svg
│   main.tsx
│   vite-env.d.ts
│
├───components
│   ├───Button
│   │       SignInButton.tsx
│   │       SignOutButton.tsx
│   │       StatusButton.tsx
│   │
│   ├───Card
│   │       CommentCard.tsx
│   │       CustomerServiceCard.tsx
│   │       ProviderCard.tsx
│   │       ProviderServiceCard.tsx
│   │       RequestManagementCard.tsx
│   │       RequestServiceCard.tsx
│   │
│   ├───Creator
│   │       CommentCreator.tsx
│   │       RequestCreator.tsx
│   │
│   ├───Head
│   │       Head.tsx
│   │
│   ├───InputText
│   │       InputTextField.tsx
│   │
│   └───Page
│           Page.tsx
│
├───pages
│   ├───AdminPage
│   │   ├───RemoveProviderPage
│   │   └───VerifyProviderPage
│   │           VerifyProviderPage.tsx
│   │
│   ├───AuthPage
│   │   ├───LoginPage
│   │   │       LoginPage.tsx
│   │   │
│   │   └───RegisterPage
│   │           RegisterPage.tsx
│   │
│   ├───ErrorPage
│   │       404.tsx
│   │
│   ├───HomePage
│   │   ├───CustomerHomePage
│   │   │       CustomerHomePage.tsx
│   │   │
│   │   ├───IndexPage
│   │   │       Index.tsx
│   │   │
│   │   └───ProviderHomePage
│   │           ProviderHomePage.tsx
│   │
│   ├───RequestPage
│   │   ├───RequestManagementPage
│   │   │       RequestListPage.tsx
│   │   │       RequestViewer.tsx
│   │   │
│   │   └───RequestServicePage
│   │           RequestHistoryPage.tsx
│   │
│   ├───ServicePage
│   │   ├───ServiceCreatorPage
│   │   │       ServiceCreatorPage.tsx
│   │   │
│   │   ├───ServiceDetailPage
│   │   │   │   ServiceDetailPage.tsx
│   │   │   │
│   │   │   └───Comments
│   │   │           CommentsListPage.tsx
│   │   │
│   │   └───ServiceListPage
│   │           ServicePage.tsx
│   │
│   └───SettingPage
│           UserSettingPage.tsx
│
├───routers
│       Router.tsx
│
├───services
│   ├───lib
│   │       constants.ts
│   │       firebase.ts
│   │
│   └───types
│           request.tsx
│           service.tsx
│           user.tsx
│
└───utils
    │   FormatTime.ts
    │   ImageUploader.tsx
    │
    └───hooks
            UseCommentCreator.tsx
            UserContext.tsx
            UseRequestService.tsx
            UseServiceCreator.tsx
```
