<p align="center"> <img src="https://user-images.githubusercontent.com/32557716/212499636-0da43cec-ccb3-4fed-a54c-79519d92e0e0.png" alt="jade-logo" /> </p>

<h1 align="center">Jade</h1>

<p align="center"> A 3-minute personal diary for the lazy. </p>
<p align="center">
  <a href="#preview">Preview</a> •
  <a href="#features">Features</a> •
  <a href="#usage">Usage</a> •
  <a href="#license">License</a>
</p>

## Preview
![2023-01-14 13 39 06 localhost f116d61d5674](https://user-images.githubusercontent.com/32557716/212499649-9337032d-9d88-4c7b-b17f-d1769d2ac07b.png)

![2023-01-14 14 07 43 localhost 9a9fa173d52a](https://user-images.githubusercontent.com/32557716/212499652-ee06399b-5abc-424c-9d16-69f8beb324c9.png)

![2023-01-14 14 09 58 localhost 6f39d94701f1](https://user-images.githubusercontent.com/32557716/212499657-c294c3a9-b899-4aef-b59e-7ffcc54d19f2.png)

## Features
- Create an account via Google authentication
- For each day, fill in a description capped at 200 characters, your top 3 thoughts, and a song and food of the day
- Upload photos (stored in Firebase)
- Mark and easily view your favorite days
- Hop on a time capsule by revisiting entries written on the same day of the month or by jumping to a random entry
- Track your writing statistics
- Customize your global theme
- (In progress) Schedule reminders for yourself in the form of messages

## Usage
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
MIT
