workconnect-app/
│
├── public/
│ └── favicon.ico
│
├── src/
│ ├── assets/
│ │ ├── images/
│ │ ├── icons/
│ │ ├── logos/
│ │ └── illustrations/
│ │
│ ├── components/
│ │ ├── common/
│ │ │ ├── Button.jsx
│ │ │ ├── Input.jsx
│ │ │ ├── Spinner.jsx
│ │ │ ├── Modal.jsx
│ │ │ └── Card.jsx
│ │ │
│ │ ├── layout/
│ │ │ ├── Navbar.jsx
│ │ │ ├── Footer.jsx
│ │ │ └── Sidebar.jsx
│ │ │
│ │ ├── job/
│ │ │ ├── JobCard.jsx
│ │ │ ├── JobFilter.jsx
│ │ │ └── JobList.jsx
│ │ │
│ │ └── user/
│ │ ├── ProfileCard.jsx
│ │ ├── ReviewCard.jsx
│ │ └── UserAvatar.jsx
│
│ ├── context/
│ │ ├── AuthContext.jsx
│ │ └── ThemeContext.jsx
│
│ ├── hooks/
│ │ ├── useAuth.js
│ │ ├── useFetch.js
│ │ ├── useDebounce.js
│ │ └── useLocalStorage.js
│
│ ├── layouts/
│ │ ├── MainLayout.jsx
│ │ ├── DashboardLayout.jsx
│ │ └── AuthLayout.jsx
│
│ ├── lib/
│ │ ├── api.js
│ │ ├── axiosInstance.js
│ │ └── endpoints.js
│
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Jobs.jsx
│ │ ├── JobDetails.jsx
│ │ ├── PostJob.jsx
│ │ ├── Workers.jsx
│ │ ├── WorkerDetails.jsx
│ │ ├── Dashboard.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── Profile.jsx
│ │ └── NotFound.jsx
│
│ ├── routes/
│ │ ├── AppRoutes.jsx
│ │ └── ProtectedRoute.jsx
│
│ ├── services/
│ │ ├── authService.js
│ │ ├── jobService.js
│ │ ├── workerService.js
│ │ └── userService.js
│
│ ├── store/
│ │ ├── authStore.js (if using Zustand)
│ │ └── appStore.js
│
│ ├── styles/
│ │ ├── globals.css
│ │ └── variables.css
│
│ ├── utils/
│ │ ├── formatDate.js
│ │ ├── validateEmail.js
│ │ ├── calculateRating.js
│ │ ├── generateID.js
│ │ └── helpers.js
│
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── package.json
└── vite.config.js
