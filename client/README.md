# Client-side App

This is an example frontend app that can be used as a starting point for a wide variety of apps.

Features

- On-demand meeting bot: Instantly send a bot to any meeting platform - all you need is the link!
- AI transcription, summaries, and sentiment: Uses the intelligence capabilities of multiple industry-leading generative AI providers, all through Recall's unified API.

This is only a glimpse into what you can build on top of Recall. The possibilities are [endless](/README.md)

Application Structure

```
src/
|-- assets/
|-- components/
|-- features/
|-- hooks/
|-- lib/
|-- pages/
```

`assets/`: Static assets (images, fonts, etc)

`components/`: Reusable UI components used across the app.

`features/`: Organize components, styles, and logic specific to different features.

`hooks/`: Custom React hooks used throughout the app.

`lib/`: Utility functions and helper classes

`pages/`: Top-level components representing different pages or views.

## Setup

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Your app is now live at http://localhost:5173/ 🎉

## Technologies Used

- [React](https://react.dev/reference/react)
- [Vite](https://vitejs.dev/guide/)
- [Radix UI](https://www.radix-ui.com/primitives/docs/overview/introduction): UI primitives and icons. Feel free to replace this with your favorite UI framework or library.
