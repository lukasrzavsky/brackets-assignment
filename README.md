# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Set env variables
   There is a need to set EXPO_PUBLIC_API_URL with API url   

3. Start the app

   ```bash
   npx expo start
   ```

## App issues

There is a problem with images when using filtering or search. Since we don't get the image from the API response, but only get it from the hardcoded url based on the item id, when the list order is changed the images don't match. The solution would be to retrieve the images from the endpoint.