# DevConnect 🚀

DevConnect is a full-stack web application designed for developers to showcase their projects, build portfolio profiles, and interact with the community. Developers can publish their work, explore projects created by others, filter by technology stack, leave feedback, and manage their personal developer profile.

Built with **React 18**, **Vite**, **Tailwind CSS**, **Context API + useReducer**, and **Supabase (PostgreSQL & Auth)**.

---

## 📌 Features

### 🌐 Public Pages
* **Home Page (`/`)**: Landing page showcasing featured projects, a clean hero section, and quick action buttons for authentication.
* **Explore Page (`/explore`)**: Public gallery of all user-submitted projects with real-time search by title/description and tech stack filtering (React, Python, Mobile, Full-Stack, etc.).
* **Project Details (`/project/:id`)**: Detailed page for each project featuring live demo links, GitHub repository links, tech tags, like count, and a comment section.
* **About Page (`/about`)**: Information about the platform, assignment criteria fulfilled, and the technology stack utilized.

### 🔒 Protected User Features (Requires Authentication)
* **My Projects Dashboard (`/my-projects`)**: Full CRUD management interface:
  * **Create**: Add new projects with demo/GitHub links, description, and tech stack.
  * **Read**: View list of all projects created by the logged-in user.
  * **Update**: Edit existing project details anytime.
  * **Delete**: Remove projects with a confirmation prompt.
* **Profile Management (`/profile`)**: Manage profile details (Full Name, Bio, Technical Skills list, Avatar, GitHub/LinkedIn links, Logout).

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 (Vite) | Component-based UI architecture |
| **Routing** | React Router v6 | Single Page Application routing & Protected Routes |
| **State Management** | Context API + `useReducer` | Global state management for Auth and Projects |
| **Styling** | Tailwind CSS | Utility-first responsive styling |
| **Icons** | Lucide React | Clean, modern UI icon set |
| **Backend & Auth** | Supabase | Authentication & PostgreSQL Database |
| **Database Security** | Row Level Security (RLS) | Restricts edit/delete access to resource owners |

---

## 🗄️ Database Schema

### `profiles` Table
| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, Foreign Key -> `auth.users.id` | User's unique identifier |
| `full_name` | `text` | Nullable | Developer's full name |
| `bio` | `text` | Nullable | Short personal summary |
| `github_url` | `text` | Nullable | GitHub profile link |
| `skills` | `text` | Nullable | Technical skills list |
| `updated_at` | `timestamp` | Default: `now()` | Last profile update timestamp |

### `projects` Table
| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, Default: `gen_random_uuid()` | Project unique identifier |
| `user_id` | `uuid` | FK -> `profiles.id` | Project owner ID |
| `title` | `text` | NOT NULL | Project title |
| `description` | `text` | Nullable | Detailed project description |
| `tech_stack` | `text` | Nullable | Technologies used (e.g. React, Supabase) |
| `demo_url` | `text` | Nullable | Live demo URL |
| `github_url` | `text` | Nullable | Repository link |
| `likes_count` | `integer` | Default: `0` | Total project likes |
| `created_at` | `timestamp` | Default: `now()` | Creation timestamp |

---

## 📁 Folder Structure

```
src/
├── assets/         # Static images, logos, and icons
├── components/     # Reusable UI components (Navbar, Footer, ProjectCard, Modal, etc.)
├── context/        # Context API & Reducers (AuthContext, ProjectContext)
├── hooks/          # Custom React hooks (useProjects, useAuth)
├── pages/          # Application views (Home, Explore, ProjectDetails, MyProjects, Profile, About)
├── routes/         # React Router setup & ProtectedRoute wrapper
├── services/       # Supabase client instance & API helper services
└── utils/          # Helper functions (date formatting, string utilities)
```

---

## ⚡ Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your machine.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/DevConnect.git
cd DevConnect
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Running the Application
Start the local development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 🔒 Security & Row Level Security (RLS)

DevConnect leverages Supabase's Row Level Security (RLS) to enforce data integrity:
- **Public Access**: Anyone can view published projects (`SELECT` permission for all users).
- **Owner Access**: Only authenticated owners can create, update, or delete their own projects and profile (`INSERT`, `UPDATE`, `DELETE` permissions guarded by `auth.uid() = user_id`).
