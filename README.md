# Otto's Collection: A Digital Wine Portfolio

A personal wine portfolio website to catalog, search, and visualize a wine collection.

## Overview

This project is a modern, full-stack web application designed to manage and showcase a personal wine collection. It features a clean, dark-themed interface, powerful search capabilities, and an interactive map to visualize the origins of each wine.

**Tech Stack:**
- **Framework:** Next.js (App Router)
- **CMS:** Sanity.io for headless content management.
- **Styling:** Tailwind CSS
- **Mapping:** Leaflet.js
- **Deployment:** Vercel

---

## Getting Started

Follow these steps to set up the project for local development.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Sanity CLI](https://www.sanity.io/docs/getting-started-with-the-cli): `npm install -g @sanity/cli`

### 1. Sanity Studio Setup

The Sanity Studio contains your content model and is where you'll manage your wine data.

1.  **Navigate to the `sanity` folder:**
    ```bash
    cd sanity
    ```
2.  **Initialize Sanity & Deploy:**
    Follow the prompts to create a new Sanity project. When asked about the schema, say "no" as the schema is already defined in `sanity/schema.js`.
    ```bash
    sanity init
    ```
3.  **Deploy the Studio:**
    This will deploy your content backend to Sanity's cloud, making it accessible online.
    ```bash
    sanity deploy
    ```
    After deploying, visit the provided URL to start adding your wines.

### 2. Local Development (Next.js Frontend)

1.  **Clone the Repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Set Up Environment Variables:**
    Create a file named `.env.local` in the root of your project and add your Sanity project details. You can find these on your [manage.sanity.io](https://manage.sanity.io) dashboard.

    ```.env.local
    NEXT_PUBLIC_SANITY_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_SANITY_DATASET="production"
    NEXT_PUBLIC_SANITY_API_VERSION="2024-06-17"
    ```

### 3. Running the Dev Server

Start the Next.js development server to view your frontend.

```bash
npm run dev