![[jade logo.png]]
<h1 align="center">Jade</h1>
---
<p align="center"> A 3-minute personal diary for the lazy. </p>

### Preview
---
![[jade home.png]]

![[2023-01-14 14.07.43 localhost 9a9fa173d52a.png]]

![[2023-01-14 14.09.58 localhost 6f39d94701f1.png]]

## Features
---
- Create an account via Google authentication
- For each day, fill in a description capped at 200 characters, your top 3 thoughts, and a song and food of the day
- Upload photos (stored in Firebase)
- Mark and easily view your favorite days
- Hop on a time capsule by revisiting entries written on the same day of the month or by jumping to a random entry
- Track your writing statistics
- Customize your global theme

## Usage
---
Navigate to the live deployment at https://jade-liart.vercel.app, or:

### Local Installation
1. Clone the repo
2. Create a `.env` file in `/api` and provide your own `MONGO_URL`
3. Create a `.env` file in `/client` and provide your own `REACT_APP_CLIENT_ID` and `REACT_APP_SECRET` (for Google OAuth)
4. In both `/api` and `/client`:
	1. `npm install`
	2. `npm start` 
5. The backend runs in https://localhost:9000/, and the frontend runs in https://localhost:3000/ 

## License
---
MIT