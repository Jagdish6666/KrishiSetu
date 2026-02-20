# KrishiSetu - Farmer Supply Chain Transparency Platform

## 📋 Project Overview

**KrishiSetu** is a comprehensive web application designed to solve critical problems in the Indian agricultural supply chain:
- Farmers lack knowledge of real market prices
- Middlemen exploitation
- Confusion about government scheme eligibility
- No transparency in crop selling process

## 🏗️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.2.1
- **Language**: Java 17
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA
- **Security**: JWT Authentication
- **Architecture**: REST API with layered architecture

### Frontend (To be created)
- **Framework**: React with Vite
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Routing**: React Router

## 📁 Backend Project Structure

```
demo/
├── src/main/java/com/krishisetu/
│   ├── controller/          # REST Controllers
│   │   ├── AuthController.java
│   │   ├── FarmerController.java
│   │   ├── BuyerController.java
│   │   └── AdminController.java
│   ├── service/             # Business Logic
│   │   ├── AuthService.java
│   │   ├── FarmerService.java
│   │   ├── BuyerService.java
│   │   └── AdminService.java
│   ├── repository/          # Data Access Layer
│   │   ├── UserRepository.java
│   │   ├── FarmerDetailRepository.java
│   │   ├── CropRepository.java
│   │   ├── OfferRepository.java
│   │   ├── SchemeRepository.java
│   │   └── SchemeCriteriaRepository.java
│   ├── model/               # Entity Models
│   │   ├── User.java
│   │   ├── FarmerDetail.java
│   │   ├── Crop.java
│   │   ├── Offer.java
│   │   ├── Scheme.java
│   │   └── SchemeCriteria.java
│   ├── dto/                 # Data Transfer Objects
│   │   ├── RegisterRequest.java
│   │   ├── LoginRequest.java
│   │   ├── AuthResponse.java
│   │   ├── CropRequest.java
│   │   ├── OfferRequest.java
│   │   ├── SchemeRequest.java
│   │   ├── EligibilityRequest.java
│   │   └── ApiResponse.java
│   ├── security/            # Security Configuration
│   │   ├── JwtUtil.java
│   │   ├── JwtAuthenticationFilter.java
│   │   ├── CustomUserDetailsService.java
│   │   └── SecurityConfig.java
│   ├── exception/           # Exception Handling
│   │   └── GlobalExceptionHandler.java
│   └── KrishiSetuApplication.java
└── src/main/resources/
    └── application.properties
```

## 🗄️ Database Schema

### Tables

**users**
- id (PK, AUTO_INCREMENT)
- name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password (VARCHAR)
- role (ENUM: FARMER, BUYER, ADMIN)
- approved (BOOLEAN)

**farmer_details**
- id (PK, AUTO_INCREMENT)
- user_id (FK to users)
- land_size (DOUBLE) - in acres
- annual_income (DOUBLE) - in INR
- state (VARCHAR)
- district (VARCHAR)

**crops**
- id (PK, AUTO_INCREMENT)
- farmer_id (FK to users)
- name (VARCHAR)
- quantity (DOUBLE)
- price (DOUBLE)
- location (VARCHAR)
- description (TEXT)
- available (BOOLEAN)
- created_at (TIMESTAMP)

**offers**
- id (PK, AUTO_INCREMENT)
- crop_id (FK to crops)
- buyer_id (FK to users)
- offer_price (DOUBLE)
- status (ENUM: PENDING, ACCEPTED, REJECTED)
- created_at (TIMESTAMP)

**schemes**
- id (PK, AUTO_INCREMENT)
- name (VARCHAR)
- description (TEXT)
- active (BOOLEAN)

**scheme_criteria**
- id (PK, AUTO_INCREMENT)
- scheme_id (FK to schemes)
- min_income (DOUBLE)
- max_income (DOUBLE)
- min_land_size (DOUBLE)
- max_land_size (DOUBLE)
- state (VARCHAR)
- crop_type (VARCHAR)

## 🔑 Key Features

### Module 1: Authentication
- ✅ User registration (Farmer, Buyer, Admin)
- ✅ JWT-based login
- ✅ Role-based access control

### Module 2: Farmer Features
- ✅ Add crops with details
- ✅ View own crops
- ✅ Update crop information
- ✅ Delete crops
- ✅ View buyer offers
- ✅ Check scheme eligibility

### Module 3: Buyer Features
- ✅ View all available crops
- ✅ Filter crops by location
- ✅ Place offers on crops
- ✅ View own offers

### Module 4: Admin Features
- ✅ Add government schemes
- ✅ Define eligibility criteria
- ✅ View all schemes
- ✅ Approve farmers
- ✅ View all farmers

### Module 5: Eligibility Engine
- ✅ Check scheme eligibility based on:
  - Annual income range
  - Land size
  - State
  - Crop type

## 🚀 How to Run the Backend

### Prerequisites
1. **Java 17** installed
2. **MySQL 8.0** installed and running
3. **Maven** (comes with mvnw wrapper)

### Step 1: Setup Database

1. Start MySQL server
2. Create database:
```sql
CREATE DATABASE krishisetu;
```

### Step 2: Configure Database

Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/krishisetu
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 3: Run the Application

```bash
# Navigate to project directory
cd c:\Users\asus\Downloads\KrishiSetu\demo

# Run the application
.\mvnw spring-boot:run
```

The server will start on `http://localhost:8080`

## 📡 API Endpoints

### Authentication Endpoints

**Register**
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "password": "password123",
  "role": "FARMER",
  "landSize": 5.5,
  "annualIncome": 200000,
  "state": "Punjab",
  "district": "Ludhiana"
}
```

**Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "ravi@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "email": "ravi@example.com",
    "name": "Ravi Kumar",
    "role": "FARMER"
  }
}
```

### Farmer Endpoints (Requires FARMER role)

**Add Crop**
```
POST /api/farmer/crop
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "Wheat",
  "quantity": 100,
  "price": 2500,
  "location": "Ludhiana, Punjab",
  "description": "Premium quality wheat"
}
```

**Get My Crops**
```
GET /api/farmer/crops
Authorization: Bearer <JWT_TOKEN>
```

**Update Crop**
```
PUT /api/farmer/crop/{id}
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "Wheat",
  "quantity": 120,
  "price": 2600,
  "location": "Ludhiana, Punjab",
  "description": "Premium quality wheat - Updated"
}
```

**Delete Crop**
```
DELETE /api/farmer/crop/{id}
Authorization: Bearer <JWT_TOKEN>
```

**Get Offers on My Crops**
```
GET /api/farmer/offers
Authorization: Bearer <JWT_TOKEN>
```

**Check Scheme Eligibility**
```
POST /api/farmer/check-eligibility
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "state": "Punjab",
  "landSize": 5.5,
  "annualIncome": 200000,
  "cropType": "Wheat"
}
```

### Buyer Endpoints (Requires BUYER role)

**Get All Crops**
```
GET /api/buyer/crops
Authorization: Bearer <JWT_TOKEN>
```

**Filter Crops by Location**
```
GET /api/buyer/crops?location=Punjab
Authorization: Bearer <JWT_TOKEN>
```

**Place Offer**
```
POST /api/buyer/offer
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "cropId": 1,
  "offerPrice": 2700
}
```

**Get My Offers**
```
GET /api/buyer/offers
Authorization: Bearer <JWT_TOKEN>
```

### Admin Endpoints (Requires ADMIN role)

**Add Scheme**
```
POST /api/admin/scheme
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "PM-KISAN",
  "description": "Financial assistance to farmers",
  "minIncome": 0,
  "maxIncome": 500000,
  "minLandSize": 0,
  "maxLandSize": 10,
  "state": null,
  "cropType": null
}
```

**Get All Schemes**
```
GET /api/admin/schemes
Authorization: Bearer <JWT_TOKEN>
```

**Approve Farmer**
```
POST /api/admin/approve-farmer/{farmerId}
Authorization: Bearer <JWT_TOKEN>
```

**Get All Farmers**
```
GET /api/admin/farmers
Authorization: Bearer <JWT_TOKEN>
```

## 🧪 Testing with Postman

### Setup
1. Download and install [Postman](https://www.postman.com/downloads/)
2. Import the KrishiSetu collection (instructions below)

### Test Flow

1. **Register Admin**
   - `POST /api/auth/register` with role "ADMIN"
   - Save the JWT token

2. **Register Farmer**
   - `POST /api/auth/register` with role "FARMER"
   - Include farmer details
   - Save the JWT token

3. **Register Buyer**
   - `POST /api/auth/register` with role "BUYER"
   - Save the JWT token

4. **Farmer adds crops**
   - Use Farmer's token
   - `POST /api/farmer/crop`

5. **Buyer views crops**
   - Use Buyer's token
   - `GET /api/buyer/crops`

6. **Buyer places offer**
   - Use Buyer's token
   - `POST /api/buyer/offer`

7. **Admin adds scheme**
   - Use Admin's token
   - `POST /api/admin/scheme`

8. **Farmer checks eligibility**
   - Use Farmer's token
   - `POST /api/farmer/check-eligibility`

## 🔐 Security Features

- **JWT Authentication**: Stateless token-based authentication
- **Password Encryption**: BCrypt password hashing
- **Role-based Access Control**: Endpoint protection by user role
- **CORS Configuration**: Configured for React frontend
- **Input Validation**: Request validation using Jakarta Validation

## 🛠️ Development Tips

### Hot Reload
The project uses Spring Boot DevTools (if added). Changes to Java files will trigger auto-restart.

### View SQL Queries
SQL queries are logged to console (set in application.properties):
```properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

### Debug Mode
Run with debug logging:
```properties
logging.level.com.krishisetu=DEBUG
```

## ❗ Common Issues & Solutions

### Issue 1: Database Connection Failed
**Solution**: Ensure MySQL is running and credentials in `application.properties` are correct.

### Issue 2: Port 8080 Already in Use
**Solution**: Change port in `application.properties`:
```properties
server.port=8081
```

### Issue 3: JWT Token Expired
**Solution**: Login again to get a new token. Default expiry is 24 hours.

### Issue 4: Compilation Errors
**Solution**: Clean and rebuild:
```bash
.\mvnw clean install
```

## 📦 Next Steps

1. ✅ Backend API is complete and tested
2. 🔄 Create React frontend (Next section)
3. 🔄 Add more features (notifications, chat, etc.)
4. 🔄 Deploy to production

## 📝 Notes

- All endpoints return standardized `ApiResponse` format
- Database tables are auto-created by Hibernate (`ddl-auto=update`)
- JWT secret should be changed in production
- CORS is configured for `localhost:5173` (Vite) and `localhost:3000` (Create React App)

---

**Built with ❤️ for Indian Farmers**
