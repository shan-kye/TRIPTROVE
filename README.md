
TripTrove:

TripTrove is a travel platform engineered to deliver intelligent, personalized, and interactive travel experiences. The system utilizes data-driven algorithms to generate smart destination recommendations and dynamic day plans tailored to user preferences, location data, and trip context.

The platform is built with a modular architecture, separating the frontend interface, backend API services, and data layer for scalability and maintainability. The backend integrates recommendation logic powered by machine learning models and real-time data pipelines to ensure adaptive and relevant trip suggestions.

Features:

Explore Destinations — Browse curated travel spots with photos, ratings, and insights.

Smart Trip Planner — Build personalized itineraries with weather, location, and travel time integration.

Community Reviews — Read and share reviews, tips, and hidden gems with fellow travelers.

Save Favorites — Bookmark destinations and create collections for future trips.

Project Overview:

TripTrove is built with a focus on performance, scalability, and user experience. It combines modern front-end and back-end technologies to deliver a fast, reliable, and visually stunning experience for travelers worldwide.

Tech Stack:
Layer	Technology
Frontend HTML, JS, Tailwind CSS
Backend	Node.js / Express.js
Database	MongoDB / Mongoose
APIs	Google Maps API, Gemini API, Uber
Deployment	Vercel 
Getting Started:
Prerequisites

Make sure you have the following installed:

Node.js v18+

npm or yarn

MongoDB (local or Atlas)

Installation
# Clone the repository
git clone https://github.com/yourusername/triptrove.git

# Navigate to the project directory
cd triptrove

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

Environment Variables

Create a .env file in the root directory and add the following:

MONGO_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_google_maps_api_key
GEMINI_API_KEY=your_gemini_api_key

Run the App
# Start the development server
npm run dev
Visit http://localhost:3000
 to explore TripTrove locally.

Screenshots:
 
<img width="583" height="291" alt="image" src="https://github.com/user-attachments/assets/41b060c6-d989-408a-96ae-a4f5e0094a53" />

![WhatsApp Image 2025-10-17 at 09 59 45_eb184275](https://github.com/user-attachments/assets/6496f398-45cf-4b71-a1ef-22840f8bc22d)

<img width="630" height="304" alt="image" src="https://github.com/user-attachments/assets/88f2963f-56b4-4b1c-822a-bd36800f37c5" />



Folder Structure:
triptrove/
├── client/              # Frontend (HTML,Tailwind CSS, JS)
├── server/              # Backend (Node.js/Express)
├── public/              # Static assets
├── .env.example         # Environment variable template
├── package.json
└── README.md

Testing:
# Run tests
npm run test

Contributing:

Contributions are welcome!
To get started:

Fork the repo

Create your feature branch (git checkout -b feature/awesome-feature)

Commit your changes (git commit -m 'Add awesome feature')

Push to the branch (git push origin feature/awesome-feature)

Open a Pull Request

Contact:

Project Maintainer: Aastha Rajput

Email:aastharajput379@gmail.com
