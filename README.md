# AI-Blog

## Overview
This project is a modern AI-powered blog platform built using Next.js, Tailwind CSS, Firebase, and the Gemini API. The platform enables users to generate and manage blog content seamlessly using AI, providing an interactive and efficient writing experience. The entire application is containerized with Docker to ensure ease of deployment and scalability.

## Features
- **AI-Generated Content**: Leverages the Gemini API to assist in content creation.
- **User Authentication**: Secure authentication using Firebase Auth.
- **Real-time Database**: Store and manage blog posts with Firebase Firestore.
- **Responsive UI**: Styled with Tailwind CSS for a modern and mobile-friendly experience.
- **SEO Optimization**: Built-in SEO best practices to enhance discoverability.
- **Dockerized Deployment**: Fully containerized for seamless setup and scalability.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Firebase Firestore, Gemini API
- **Authentication**: Firebase Auth
- **Containerization**: Docker

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (Latest LTS version)
- Docker
- Firebase CLI

### Clone the Repository
```bash
 git clone https://github.com/SpandanM110/ai-blog.git
 cd ai-blog
```

### Install Dependencies
```bash
 npm install
```

### Set Up Firebase
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Firestore Database and Authentication.
3. Get the Firebase configuration and create a `.env.local` file with:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### Set Up Gemini API
1. Get API access from [Google AI Gemini](https://ai.google.com/gemini/).
2. Add the API key to the `.env.local` file:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

### Run the Application Locally
```bash
 npm run dev
```
The application will be accessible at `http://localhost:3000`.

## Docker Setup
### Build the Docker Image
```bash
 docker build -t ai-blog .
```

### Run the Container
```bash
 docker run -p 3000:3000 --env-file .env.local ai-blog
```

## Deployment
For cloud deployment, you can use platforms like:
- **Vercel** (Recommended for Next.js apps)
- **Firebase Hosting**
- **Docker-based platforms** like AWS, GCP, or DigitalOcean.

## Contribution
Feel free to submit issues and pull requests. Follow the standard Git workflow:
```bash
 git checkout -b feature-branch
 git commit -m "Add new feature"
 git push origin feature-branch
```

## License
This project is licensed under the MIT License.

---
