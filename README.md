This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Financial Fellows

## Project Description

### What is Financial Fellows

Financial Fellows is a mobile application written with the React-Native CLI for the user to keep track of their income and expenses while also being able to visualize the numbers with graphs and other visuals. With the clean and easy to navigate UI, Financial Fellows allows the user to have an easy and enjoyable in app experience.

### Technologies Involved

- **React-Native CLI**: This project was a beginner application into React-Native to allow me to learn the language and I felt using RN CLI as opposed to Expo would allow for me to better understand the different aspects involved with React-Native
- **Redux**: Used as an effective state-management tool for organization, scalability, and allow for better application debugging
- **Firebase**: Used as a reliable and scalable database for the apps progression
-  **React-Hook-Form** : Used for the user inputs to improve the performance of Financial Fellows

<img src="https://miro.medium.com/v2/resize:fit:1200/1*Yxr8ZeUl49xbUl1S4TA5oQ.png" width="80" height="40">   <img src="https://miro.medium.com/v2/resize:fit:800/1*2dJ3D8gz4CVy3EtOJQNZvw.png" width="100" height="40">   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxQktpK3Jy3GkxXutGPzl8R3OBCNMxfFWP5A&s" width="120" height="40">   <img src="https://miro.medium.com/v2/resize:fit:1400/1*gNqOZJUc38gktiKMV3fhrA.png" width="150" height="40" background-color="black">

### Major Milestones Throughout The Project

- Coming up with the idea:
   - After being given the assignment to build a mobile app I knew I wanted to build a financial app but I just didn't know exactly what that would look like. As my first ever mobile application I knew I didn't want to go too crazy but I also wanted to learn as much as I could throughout development so I ended up deciding on an app for users to be able to track their money (incomes and expenses) as well as create budgets and be able to keep track of those.
- The Software Development Lifecyle
   - **Planning & Requirements Gathering**: With the help of my classmates I was able to devise a plan for how the app would function including functional and non-functional requirements, a short and data dictionary, use case diagrams with the proper use case descriptions, class diagrams, sequence diagrams, and other important factors within the planning stage. A PDF of the documentation for this step can be downloaded [**here**](https://github.com/user-attachments/files/15945230/Financial.Fellows.Phase.1.pdf).
   - **Design**: As the team lead I was tasked with designing a clean and simple UI for the user's comfortability. Utilizing the design platform [**Figma**](https://figma.com), I was able to build out my idea for the mobile app UI creating each screen I wanted to display for the user to see. The _Figma_ design can be viewed [**here**](https://www.figma.com/design/BngkXcr9e0pMR72d8xZRB0/CIS-250-Financial-Fellows?node-id=0-1&t=56SaGrRq7HKajpEb-1).
   - **Implementation & Testing**: Learning React-Native was the main goal of this project for me as it is a new and growing framework in the frontend development world. Throughout the entirety of the project I was learning React-Native as well as Redux, React-Hook-Form and also learning how to use and implement Firebase's database and authentication. While creating this, Financial Fellows had to go through and pass a multitude of different tests to make sure the app is functioning properly. To view some of the key methods and test cases you can download this PDF [**here**](https://github.com/user-attachments/files/15945295/Financial.Fellows.Part-3.pdf).
   - **Deployment/Maintenance**: Financial Fellows was never deployed to the iOS App Store or the Android Google Play Store.

     
- The Final Report: The final project report PDF can be downloaded [**here**](https://github.com/user-attachments/files/15945316/CIS.250.Final-Report.pdf).


## How to Run

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Download Code or Clone Repository

```
git clone https://github.com/JacksonKovarik/Financial-Fellows.git
cd financial-fellows
```

### Install **npm** Dependencies

```
npm install
```

### Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Starting The Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

#### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see Financial Fellows running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
