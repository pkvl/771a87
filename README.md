## Introduction

This is a project built for Avantos.

Technologies used:
- [Next.js](https://nextjs.org/) (used mostly for convenient dev-server and builds, SSR/routing is not currently used)
- [Zustand](https://zustand.docs.pmnd.rs/) (great state management tool for data manipulating, heavily used for current task)
- [shadcn/ui](https://ui.shadcn.com/) / Tailwind / Lucide Icons
- [axios](https://axios-http.com/) (HTTP-client, probably redundant for demo purposes but good in a long run)
- [React-Flow](https://reactflow.dev/) (Required by the task)
- [TypeScript](https://www.typescriptlang.org/) (of course)

## Getting Started

1. Copy `.example.env` to `.env`, edit with appropriate API host
2. Install all necessary dependencies with `npm install` or `pnpm install` (recommended)
3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To build the project and start the Production version - `pnpm run build` and `pnpm run start` (the same scripts should work with any other package manager)

## Learn More

How it works:

- Once user reaches the application, app makes a call to the server to retrieve React-flow typed data.
- The custom node is implemented to support appropriate data from Avantos.
- User have ability to select any node that is not root and can select any fields from parent to 'prefill' the data.
- User have ability to select only one field form parent form.
- User have ability to unselect the field for the current form/node.
- All nodes with prefilled fields are marked with "⦁" sign.
- The app contains a functionality to sync all prefilled fields by sending POST request to API (currently just dummy stub) in format of:
```json
[
  {
    currentNodeId: string,
    currentFieldKey: string,
    parentNodeId: string,
    parentFieldKey: string,
  },
  ...
]
```
- The `dynamic_field_config` object/property is used to manipulate the form fields.
- To extend the application, it's possibly to introduce a custom node types. Create any custom types and register a custom type in the `./components/graph-canvas.tsx`.

## Project Structure

- All UI components (generated by shadcn/ui library) is stored in `./components/ui` folder.
- Every React-component that is used by current application has their own properties type that are located in the same file of component.
- All state-management related files located in the `./stores` folder and ending with `...-store.ts`.
- All application data types are stored in `./stores/types.ts`.
- HTTP-client config is located in `./lib/http-client.ts`.