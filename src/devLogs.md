## Brainstorming

- We came up with two ideas and decided to go with one, we wanted to solve a real life problem which everyone face while renting a property or letting a property.
- We chose 4 names and decided to go with AI name picker wheel for no conflicts and finalised LeaseLink.
- We decided to do something which has some meaning did our research, some of the apps in the market are landlord oriented some are tenants focussed and some are only reviews but there is nothing for the effective communication and credibility.
- In the early stage of planning things started getting complicated when I (Maha) did DrawSQl for the tables I decided to write how are we going to take it what is the app about.
- When we were heading in different directions, we kinda **Manny-ed** ourselves to get to one direction. Maha made the notes, the questions were:

- 1: Explain in your own words what is the project about?

- 2: What are you thinking about the app?

- **Replies:**

**Dan:**

- App (communication app)
- An app landlords and tenants discuss issue with the property, sorted or not sorted 

**Aren:**

- Tenant and landlord connect and share problem

**Callum:**

- Landlord and tenants communicate regarding repairs

- **Maha:**

An app where landlord do listings and they communicate about repairs and people can see credibility.

- **The conclusion:** its a communication app for landlords and tenants and for the credibility after discussing we all agreed and decided to go in the same direction without any conflict. 

- I (Maha) did the PostreSQL tables because I did DrawSQL and we all agreed to the tables. I (Maha) drafted the tables and we all agreed and continued.

- Dan started sketching Wireframe, Aren made the logo, we decided the color scheme and decided to go with the logo. I (Maha) made the homepage wireframe on Powerpoint to see the color scheme.

- Dan and Aren started Trello, Aren did the user stories we all made few changes 

- The first day of project we did all the designing, sql tables, I (Maha) shared the initial planning and shared documents on google. We all made our points and changes in initial planning

- 2nd Day:

- We were still at the planning stage and decided how the app is going to work, we finished database, initialised the project, set up auth, decided the folder structure, we worked on how the landlord is going to get the notifications, we decided to do in the app notification and email as well. When the tenant updates repair the landlord will get the email notification.
- I (Maha) researched how to do it, we decided to go with Supabse resend.
- Dan set up the project and GitHub, Auth, we did pair programming
- Callum researched on images, how the tenant will upload images and tested Supabase bucket
- Aren worked on User Stories

- Made few changes in the Trello, disused through shared google docs, shared powerpoint slides, shared Figma, share DrawSQl, the communication was too good
- I (Maha) worked on Readme and Readme markdown and all the details from initial planning to how to set up auth is in the readme.
- By the end of the 2nd day planning our set up was ready.

**Monday:**

- The plan for Monday was in the Trello 
- Stand-up questions were in the Trello too

- I (Maha) worked on email notification, so when tenant submits a repair landlord will get the notification.
- I decided to go with Resend.

#### Resend email notification:

- When a tenant submits a repair request through the app, the system automatically sends an email notification to the landlord using Resend, which is an email delivery service. This happens instantly through a server action — so as soon as the repair is submitted, the landlord gets notified in their email.

- 📨 Automatic Email Notification (via Resend)
When a tenant submits a repair, the system automatically notifies the landlord.
This uses Resend, a reliable email delivery service integrated into our app.
The notification is sent instantly through a server action — no manual steps required.
Ensures faster communication and quicker repair response times between tenants and landlords.
Setup guide for Resend in Next.js

1. Create a Resend Account
Go to https://resend.com
Sign up (you can use GitHub or email).
Once inside, go to Dashboard ➡️ API Keys ➡️ Create API Key
Copy the key.

2. Add Environment Variable
In your Next.js project root, create a .env file, put it in .gitignore file (if it’s not there)
Add resend API Key 
RESEND_API_KEY=your_resend_api_key
3. Install the resend package
In your next js project - npm install resend

- Connect Resend to the App
- The app uses a server action (a backend function in Next.js) to contact Resend.
When a tenant submits a repair request, this action runs automatically and sends an email through Resend.
- The landlord receives an email with the tenant’s name, property address, and repair details.
Deployment Notes:
- Add API key in Vercel’s environment variables (or wherever you are deploying your app, Render etc)

- https://resend.com/nextjs

#### CHANGES in Method:

- https://resend.com/docs/send-with-nodemailer-smtp
- I (Maha) used node mailer instead of Resend because for resend we needed custom email and we switched to node mailer with gmail for demo. We have plans to change it in the future with resend plus Supabase triggers and edge function. We decided not to do it now because it was time consuming and complicated and we needed more time for research. We have also planned to use WaSenderAPI or Twilio for messages for notification to make it easier for landlord and tenants so landlords will not miss a repair.

#### Nodemailer and gmail for notification
1: Install nodemailer
npm install nodemailer
Step 2: Configure Gmail
A lot of small companies use gmail for business purposes. 
Gmail has strict security, so you cannot use your regular password directly.
Enable 2-Step Verification for your Gmail account.
Generate an App Password:
Go to Google App Passwords
Select “App name (for example LeaseLink” as the app and click Generate.
Copy the 16-character app password.
.env
Add gmail 16 digit password and email address in .env
GMAIL_USER=your_email
GMAIL_APP_PASSWORD=16_digit_password
4. Server action 

## Future notes:
https://wasenderapi.com/blog/how-to-send-whatsapp-messages-in-nextjs-using-wasenderapi-fast-easy-guide
https://arnab-k.medium.com/implementing-sms-notifications-with-next-js-and-twilio-451788862b8c
TUESDAY:
https://reactnavigation.org/docs/use-theme/
- I (Maha) worked on custom color but the problem I faced was when in tailwind config I did @theme it was giving error even I was using tailwind 4.1 but still getting error, I watched few videos tried so many things but nothing worked and the postcss.config.mjs was still giving errors finally followed Manny (instructor)’s week 8’s styling assignment’s format and it worked.
- I (Maha) worked on sign-in sign-up pages, homepage and dark and light theme. I started with following Tim’s (instructor) reducer example it worked but the problem was it was just appear in header or it was not changing the whole page. I watched few videos, read documents and after so many trial and errors finally get it fixed. I added react icon, 
useReducer to manage the state of the theme (light vs dark), 
createContext it creates a ThemeContext to hold the theme state and dispatch function.
useContext to allows any component access the current theme and toggle function without passing props manually.
useTheme hook to access the currently active theme
To install react icon : npm install react-icons —save
import { FaRegMoon } from 'react-icons/fa';

#### CallumEveritt

I looked for a way to upload images from the computer/mobiles. I watched a youtube video explaining how to create a bucket and the set up to creating the code. While typing out the code I had realised that the code i was copying was in typescript. I asked chatgpt to help convert this from typescript to javascript to make sure it worked for our app. After converting all the code into javascript, alot of the errors were just cant find certain modules or that I hadnt installed the right packages for this. I had looked at quite a few documentations to find the right packages to install. All the cant find modules were fixed by me getting the correct path for the imports. After copying the code into the app there was the errors of finding the right paths for the files but Dan had helped figure this out.
Our communication was so good, we communicated through Google Docs, Powerpoint, Discord. We did pair programming whenever any of us get stuck.

- I (Maha) used AI to get th exact color of the theme, logo which Aren made  wanted to go with the color and used AI to give me the same color for the powerpoint presentation and for the app. I worked on lighthouse report and fixed errors and added mateadata and made few changes in the intial metadata Aren's added.

- Dan fixed all the errors and issues, dubug and pair programming

- Callum worked on the supabase bucket and uploading image

- Aren working on the apps pages 

- As a team we smashed it, no conflicts and we were there to support and shared all the problems and erros and tried to fix together.