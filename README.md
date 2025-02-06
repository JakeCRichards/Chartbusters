# hackathon1

# **Chartbusters**

This website has been created to fulfill the project brief for Code Institute's JavaScript Hackathon assessment created by Jake Richards, Ben Wade, Paul O'Sullivan and Francesca Waters.

Live link: [Chartbusters](https://jakecrichards.github.io/hackathon1/)

## Table of Contents

- [Description](#description)
- [User Stories](#user-stories)
- [Wireframes](#wireframes)
- [How AI Was Used](#how-ai-was-used)
- [Features](#features)
  - [Existing Features](#existing-features)
  - [Features left to Implement](#features-left-to-implement)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
  - [Code Validation](#code-validation)
  - [Lighthouse Testing](#lighthouse-testing)
- [Deployment](#deployment)
- [Credits](#credits)
  - [Content](#content)
  - [Media](#media)
  - [Acknowledgements](#acknowledgements)

## **Description**

Chartbusters is a higher or lower music song quiz game that challenges users to guess whether the next song's chart position is higher or lower than the current song. This interactive and fun game allows users to test their knowledge of music chart history. Aimed at people aged 8 and above, the game is designed to be accessible and enjoyable for a wide range of audiences. The simple yet engaging concept makes it easy for younger players to grasp while still providing a challenge for older music enthusiasts.

Have you ever had a friendly argument with a friend about whether a song made it to No1 or not? Or even in the top ten? Well then this could be the game for you.

![Responsive Mock Up](/assets/images/responsive.png)

## **Project Board and User Stories**

In line with Agile methodology, we wrote user stories in the planning and development of our website. The full details of these can be found on our project board.

![User Stories Project Board](/assets/images/user-stories.png)

## **Wireframes**

Before starting the project, a couple of basic wireframes were created to visualise the final product. Both mobile and desktop wireframes were developed.

![Mobile wireframe](/assets/images/mobile.png) ![desktop wireframe](/assets/images/desktop.png)

---

## **How AI Was Used**

Artificial Intelligence played a significant role in the development of this project. Here are some ways AI was utilised:

- **Code Generation**

  - AI tools like GitHub Copilot were used to generate code snippets for various parts of the website. This included HTML structure and CSS styling. The AI provided context-aware suggestions that helped streamline the coding process and reduce development time.

- **Debugging**

  - AI-powered debugging tools were utilised to identify and fix issues in the code. These tools analysed the codebase, detected potential bugs, and provided recommendations for resolving them. This ensured a smoother development process and a more robust final product.

- **Accessibility Improvements**
  - AI was used to analyse the website's accessibility features.

By leveraging AI, the project was able to achieve a higher level of efficiency, creativity, and accessibility.

## **Features**

### **Existing Features**

The website includes several features, which are detailed below.

**Colour Palette:**

By using bright neon blue and pink colours, the quiz game creates an appealing, dynamic, and user-friendly experience that encourages engagement and enjoyment. These vibrant colours not only make the game visually attractive but also help in creating a lively and energetic atmosphere that keeps users entertained.

![Colour-palette](/assets/images/palette.png)

**Responsive Design:**

The website is responsive and works seamlessly on various devices, including desktops, tablets, and smartphones. This ensures that users have a consistent and enjoyable experience regardless of the device they are using. The responsive design adapts to different screen sizes and orientations, providing optimal usability and accessibility.

![Responsive Mock Up](/assets/images/responsive.png)

**Game Intro and Instructions Accordion:**

The game intro features a visually appealing logo and a prominent "Start Game" button to attract users and encourage them to start the quiz. The logo represents the theme of the game, while the "Start Game" button provides a clear call-to-action, making it easy for users to begin playing. This introductory section sets the tone for the game and enhances the overall user experience by providing an engaging and inviting entry point.

Using two accordion features help to reduce space used by the instructions and the large selection of years, making the interface cleaner and more user-friendly. This feature allows users to easily access the information they need without overwhelming them with too much content at once. The accordion design enhances the overall user experience by keeping the interface organised and intuitive.

![Game Intro Feature](/assets/images/game-intro.png)

**Interactive Quiz:**

Users can play the higher, lower, or the same music song quiz, which is the core feature of the website. During the quiz, users are presented with buttons to choose whether the next song's chart position is higher, lower, or the same as the current song. 

During the quiz, users can view the cover image of the current song, along with the song title and artist name. This feature enhances the user experience by providing visual and contextual information about the song being played. Additionally, users can listen to a short audio clip of the song, which helps them make an informed guess about its chart position.

This combination of visual and audio elements makes the quiz more engaging and interactive, allowing users to immerse themselves in the music and enjoy a richer gaming experience.

![Quiz Feature](/assets/images/quiz.png)

**Real-time Feedback and Score Tracking:**

The game tracks the user's score in real-time and displays it at the end of the quiz, providing immediate feedback. This feature allows users to see their progress and performance instantly, motivating them to improve their scores and continue playing. Real-time feedback enhances the gaming experience by making it more interactive and rewarding.

![Score Feature](/assets/images/score.png)

**Results and Social Sharing:**

Users can share their scores on social media platforms, adding a social element to the game and encouraging competition among friends. This feature not only increases user engagement but also helps in promoting the game to a wider audience. Social sharing makes the game more interactive and fun by allowing users to connect and compete with others.

![Share feature](/assets/images/results.png)

### **Features left to Implement**

- **Leaderboard:**

  - Implement a leaderboard to display the top scores of all users. This feature will encourage competition and increase user engagement.

- **User Authentication:**

  - Add user authentication to allow users to create accounts, save their scores, and track their progress over time.

- **Multiplayer Mode:**

  - Develop a multiplayer mode where users can compete against each other in real-time.

- **Achievements and Badges:**

  - Implement a system of achievements and badges to reward users for reaching certain milestones or completing specific challenges.

- **Customizable Themes:**
  - Allow users to customize the appearance of the game with different themes and color schemes.

### **Technologies Used**

- HTML
- CSS
- JavaScript

## **Testing**
The website underwent comprehensive testing to ensure its functionality and accessibility:

- **Manual Code Review:** Conducted to identify and fix bugs, and to ensure accessibility requirements such as alt text on images are met.
- **W3C Validation:** The site was checked using the W3C HTML and CSS validators to ensure compliance with web standards.
- **Link Testing:** Verified that all links work correctly and that external links open in a new tab.
- **Local Testing:** Manually tested the site locally for rendering issues, image loading, navigation links, responsiveness at different breakpoints, and checked the console for errors using developer tools.
- **Hosted Site Testing:** Manually tested the deployed site to ensure it functions as expected.
- **Lighthouse Testing:** Used Dev Tools Lighthouse to assess performance, accessibility, best practices, and SEO.

These steps ensured a robust and user-friendly final product.

### **Code Validation**

All HTML and CSS code was validated using the W3C Markup Validation Service and W3C CSS Validation Service, respectively. The results are as follows:

**HTML Validation:**

All HTML code was validated using the W3C Markup Validation Service to ensure it meets web standards and best practices. The validation process helped identify six errors which were easily corrected, resulting in a clean and compliant HTML structure.

![HTML Validation](/assets/images/html.png)

**CSS Validation:**

All CSS code was validated using the W3C CSS Validation Service to ensure it adheres to web standards and best practices. The validation process helped identify one error in the CSS code which was corrected, ensuring a clean and efficient stylesheet.

![CSS Validation](/assets/images/css.png)

### **Lighthouse Testing**

Lighthouse was used to test the performance, accessibility, best practices, and SEO of the website. The results are as follows:

![Lighthouse Testing](/assets/images/lighthouse.png)

## **Deployment**

This project was deployed on GitHub. Below are the steps followed to deploy the website:

1. In the GitHub repository, navigate to the Settings tab.
2. Scroll down until GitHub Pages is found.
3. From the source section drop-down menu, select the main branch.
4. Once the main branch has been selected, hit the save button.
5. Finally, when the page is refreshed, a detailed ribbon display will indicate the successful deployment.

The live link can be found here: [Chartbusters Live](https://jakecrichards.github.io/hackathon1/)

## **Credits**

### **Content**

- The text content for the game, including song and artist names, was sourced from the [Official UK Singles Chart](https://www.officialcharts.com/charts/singles-chart/).

### **Media**

- The images and audio used in this project were sourced from the [Official UK Singles Chart](https://www.officialcharts.com/charts/singles-chart/).
- The logo was created by Paul O'Sullivan on the project team using Adobe Photoshop.

### **Acknowledgements**

- We would like to thank Code Institute for providing the project brief and guidance throughout the development process.
- We also appreciate the feedback and suggestions from our peers and testers, which helped improve the final product.
- Finally, we acknowledge the use of GitHub Copilot for assisting in code generation and debugging.
