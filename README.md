# Online Blood Management System

A full-stack web application for managing blood donation, inventory, and distribution processes.

## 🚀 Features

- User Authentication and Authorization
- Blood Donor Management
- Blood Bank Management
- Appointment Scheduling
- Real-time Blood Inventory Tracking
- Admin Dashboard
- Statistics and Analytics
- Email Notifications

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- TailwindCSS
- React Router DOM
- Axios
- Framer Motion
- Recharts (for analytics)
- React Icons & Feather Icons

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- Bcrypt for Password Hashing
- Nodemailer for Email Notifications
- Cookie Parser
- CORS

## 📁 Project Structure

```
Online Blood Management/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── config/
    ├── controller/
    ├── middleware/
    ├── model/
    ├── routes/
    ├── utils/
    ├── server.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Online-Blood-Management
```

2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

3. Install Backend Dependencies
```bash
cd ../backend
npm install
```

4. Environment Setup
Create a `.env` file in the backend directory with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### Running the Application

1. Start the Backend Server
```bash
cd backend
npm run dev
```

2. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 🔒 API Endpoints

### Authentication
- POST `/api/v1/auth/register` - Register new user
- POST `/api/v1/auth/login` - User login
- POST `/api/v1/auth/logout` - User logout

### Donor Management
- GET `/api/v1/donors` - Get all donors
- POST `/api/v1/donors` - Add new donor
- GET `/api/v1/donors/:id` - Get donor details
- PUT `/api/v1/donors/:id` - Update donor information

### Blood Bank
- GET `/api/v1/blood-bank` - Get blood inventory
- POST `/api/v1/blood-bank` - Add blood units
- PUT `/api/v1/blood-bank/:id` - Update blood units

### Admin
- GET `/api/v1/admin/stats` - Get system statistics
- GET `/api/v1/admin/users` - Get all users
- PUT `/api/v1/admin/users/:id` - Update user status

## 🔄 Automated Tasks

- Appointment status updates every 5 minutes
- Email notifications for appointment reminders
- Blood inventory alerts for low stock

## 👥 User Roles

1. **Admin**
   - Full system access
   - User management
   - System statistics
   - Blood bank management

2. **Donor**
   - Profile management
   - Appointment scheduling
   - Donation history

3. **Blood Bank Staff**
   - Inventory management
   - Donation processing
   - Blood unit management

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Secure cookie handling
- Input validation and sanitization

## 📈 Monitoring and Maintenance

- Error logging
- Performance monitoring
- Regular database backups
- System health checks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- All contributors who have helped shape this project
- Open source community for the amazing tools and libraries 