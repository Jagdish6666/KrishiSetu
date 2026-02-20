# KrishiSetu Backend - Quick Start Guide

## ✅ Backend Setup Complete!

Your KrishiSetu backend is now fully configured with:
- ✅ JWT Authentication
- ✅ Role-based Authorization (FARMER, BUYER, ADMIN)
- ✅ Crop Management System
- ✅ Buyer Offer System
- ✅ Government Scheme Eligibility Engine
- ✅ Complete REST API

## 🚀 How to Run

### Method 1: Using Command Line
```bash
cd c:\Users\asus\Downloads\KrishiSetu\demo
.\mvnw spring-boot:run
```

### Method 2: Using the Batch File
Double-click on `run.bat` in the demo folder

## ⚙️ Before Running

**IMPORTANT**: Make sure MySQL is running and the database is created:

```sql
CREATE DATABASE krishisetu;
```

Your current configuration in `application.properties`:
- Database: `krishisetu`
- Username: `root`
- Password: `super`
- Port: `8080`

## 📡 Test the API

Once the server starts successfully (you'll see "Started KrishiSetuApplication"), you can test it:

### 1. Register a Farmer
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Ravi Kumar\",
    \"email\": \"ravi@example.com\",
    \"password\": \"password123\",
    \"role\": \"FARMER\",
    \"landSize\": 5.5,
    \"annualIncome\": 200000,
    \"state\": \"Punjab\",
    \"district\": \"Ludhiana\"
  }"
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"ravi@example.com\",
    \"password\": \"password123\"
  }"
```

This will return a JWT token. Use it in the Authorization header for protected endpoints.

## 🧪 Postman Collection

You can also use Postman to test all endpoints. Import requests manually or use these examples:

**Base URL**: `http://localhost:8080`

**Headers for authenticated requests**:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json
```

## 📋 Complete API Endpoints Reference

### Authentication (No auth required)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Farmer Endpoints (FARMER role required)
- `POST /api/farmer/crop` - Add new crop
- `GET /api/farmer/crops` - Get my crops
- `PUT /api/farmer/crop/{id}` - Update crop
- `DELETE /api/farmer/crop/{id}` - Delete crop
- `GET /api/farmer/offers` - View offers on my crops
- `POST /api/farmer/check-eligibility` - Check scheme eligibility

### Buyer Endpoints (BUYER role required)
- `GET /api/buyer/crops` - View all available crops
- `GET /api/buyer/crops?location=Punjab` - Filter by location
- `POST /api/buyer/offer` - Place offer on crop
- `GET /api/buyer/offers` - View my offers

### Admin Endpoints (ADMIN role required)
- `POST /api/admin/scheme` - Add government scheme
- `GET /api/admin/schemes` - View all schemes
- `POST /api/admin/approve-farmer/{farmerId}` - Approve farmer
- `GET /api/admin/farmers` - View all farmers

## 🎯 Quick Test Workflow

1. **Start MySQL** (make sure it's running)
2. **Run the application** using one of the methods above
3. **Test Registration**:
   - Register an Admin user
   - Register a Farmer user  
   - Register a Buyer user
4. **Test Farmer Flow**:
   - Login as Farmer (save token)
   - Add a crop
   - View crops
   - Check scheme eligibility
5. **Test Buyer Flow**:
   - Login as Buyer (save token)
   - View available crops
   - Place an offer
6. **Test Admin Flow**:
   - Login as Admin (save token)
   - Add a government scheme
   - View all farmers
   - Approve a farmer

## ❗ Troubleshooting

### Error: "Could not connect to database"
**Solution**: 
1. Check if MySQL is running
2. Verify database credentials in `application.properties`
3. Make sure database `krishisetu` exists

### Error: "Port 8080 already in use"
**Solution**: Change the port in `application.properties`:
```properties
server.port=8081
```

### Error: "Access Denied for user 'root'"
**Solution**: Update the password in `application.properties` to match your MySQL root password

### Tables not created automatically
**Solution**: Make sure this line is in `application.properties`:
```properties
spring.jpa.hibernate.ddl-auto=update
```

## 📊 Database Will Auto-Create

When you run the application for the first time, Hibernate will automatically create all these tables:
- users
- farmer_details
- crops
- offers
- schemes
- scheme_criteria

You can verify by connecting to MySQL:
```sql
USE krishisetu;
SHOW TABLES;
```

## 🎉 What's Next?

After testing the backend:
1. I can create the React frontend with a beautiful UI
2. We can deploy this to a cloud platform
3. Add more features like:
   - Email notifications
   - Image upload for crops
   - Payment gateway integration
   - Weather API integration
   - Crop price forecasting

---

**Your backend is production-ready and waiting to be tested! 🚀**
