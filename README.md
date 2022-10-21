![cover](https://res.cloudinary.com/argyle-media/image/upload/v1666202829/argyle-x/homepage/application-autofill-github.png)

Use Argyle to autofill applications that require profile, income, employment, or deposit information from your users. Instead of filling out form fields like name, date of birth, current employer, etc. manually, users can connect their employment account via Argyle Link. Following that, you can use the user’s data for various use cases such as verification of income and employment, underwriting, or direct deposit switching.

Click [here](https://sampleapps.argyle.com/application-autofill) to explore Application Autofill in your browser.

## Getting Started

Rename env.example to .env and fill in Argyle related keys from your [console.argyle.com](https://console.argyle.com) account.

Install the dependencies

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [localhost:3000/application-autofill](http://localhost:3000/application-autofill) with your browser to see the result.

## Prerequisites

- [Argyle Account](https://console.argyle.com/sign-up)

## Folder structure (in `src`)

- **Hooks** - used when caching when same network calls are required for multiple components.
- **Layouts** - define reusable page layouts.
- **Models** - store reusable TypeScript types.
- **Pages** - API for all backend functionality that's hidden from end-user. To not expose any keys or potentially abusive calls.
- **Stores** - [Zustand](https://www.npmjs.com/package/zustand) is used since it provides a simple yet scalable storage solution. Storage is split into decoupled slices separated by logical flows. All actions are defined in relevant slices. The global store contains parameters that are essential for the whole app, i.e. isPdConfigured or userId.
- **Styles** - [TailwindCSS](https://tailwindcss.com/) globals and [react-phone-number-input](https://www.npmjs.com/package/react-phone-number-input) style overrides. `tailwind.config.js` file contains custom styling presets like fonts and colors.
- **Utils** - store reusable functions.
- **Components** - components that do not carry their own state but rather use what is provided via props.
- **Views** - smart views that have their own state, business logic and are reused over multiple screens.

## Learn More

To learn more, take a look at the following resources:

- [Argyle Docs](https://argyle.com/docs) - learn about Argyle integration
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
