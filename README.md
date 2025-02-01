# 🏢 Employee Management System

🚀 **Employee Management System** is a **Spring Boot & MongoDB-based** application with **JWT authentication** and **role-based access control**. It enables users to **register, log in, and manage employees securely** via a **RESTful API**.

The frontend is built using **HTML, CSS, and JavaScript**, providing an interactive user interface.

---

## 📌 **Table of Contents**
- [🌟 Features](#-features)
- [⚙ Technologies Used](#-technologies-used)
- [📁 Project Structure](#-project-structure)
- [🚀 Installation & Setup](#-installation--setup)
- [🛠 Configuration](#-configuration)
- [🔐 API Endpoints](#-api-endpoints)
- [🎨 Frontend UI](#-frontend-ui)
- [🤝 Contributing](#-contributing)
- [🛑 License](#-license)
- [💬 Contact](#-contact)

---

## 🌟 **Features**
✅ **User Authentication using JWT** (Login & Registration)  
✅ **Role-based access control** (Admin can create, update, delete employees)  
✅ **Secure REST API with token-based authentication**  
✅ **CRUD operations for Employee Management**  
✅ **MongoDB as the primary database**  
✅ **Frontend UI with Login, Register, and Employee Management**  

---

## ⚙ **Technologies Used**
- **Backend:** Spring Boot, Spring Security, Spring Data MongoDB  
- **Database:** MongoDB (NoSQL)  
- **Authentication:** JWT (JSON Web Token)  
- **Frontend:** HTML, CSS, JavaScript  
- **Dependency Management:** Maven  

---

## 📁 **Project Structure**
```
EmployeeManagement/
 ┣ src/
 ┃ ┣ main/
 ┃ ┃ ┣ java/
 ┃ ┃ ┃ ┗ com/
 ┃ ┃ ┃   ┗ BVintern/
 ┃ ┃ ┃       ┗ EmployeeManagement/
 ┃ ┃ ┃           ┣ config/                
 ┃ ┃ ┃           ┃ ┣ JwtAuthenticationFilter.java
 ┃ ┃ ┃           ┃ ┗ SecurityConfig.java
 ┃ ┃ ┃           ┣ controller/            
 ┃ ┃ ┃           ┃ ┣ AuthController.java
 ┃ ┃ ┃           ┃ ┗ EmployeeController.java
 ┃ ┃ ┃           ┣ entity/                
 ┃ ┃ ┃           ┃ ┣ Employee.java
 ┃ ┃ ┃           ┃ ┗ User.java
 ┃ ┃ ┃           ┣ repository/            
 ┃ ┃ ┃           ┃ ┣ EmployeeRepository.java
 ┃ ┃ ┃           ┃ ┗ UserRepository.java
 ┃ ┃ ┃           ┣ service/               
 ┃ ┃ ┃           ┃ ┣ EmployeeService.java
 ┃ ┃ ┃           ┃ ┗ JwtService.java
 ┃ ┃ ┃           ┗ EmployeeManagementApplication.java
 ┃ ┃ ┗ resources/
 ┃ ┃   ┣ static/                 
 ┃ ┃   ┃ ┣ index.html             
 ┃ ┃   ┃ ┣ script.js              
 ┃ ┃   ┃ ┗ styles.css             
 ┃ ┃   ┣ application.properties   
 ┃ ┃   ┗ templates/               
 ┃ ┗ test/
 ┃ ┃   ┗ java/com/BVintern/EmployeeManagement/
 ┃ ┃       ┗ EmployeeManagementApplicationTests.java
 ┣ .gitignore                  
 ┣ LICENSE                     
 ┣ mvnw                         
 ┣ mvnw.cmd                     
 ┣ pom.xml                      
 ┣ README.md                    
```

---

## 🚀 **Installation & Setup**

### **1️⃣ Prerequisites**
Ensure you have the following installed:
- **Java 17+**
- **MongoDB**
- **Maven**
- **Spring Boot**

### **2️⃣ Clone the Repository**
```bash
git clone https://github.com/imaadiiii/Employee-Management-System.git
cd Employee-Management-System
```

### **3️⃣ Setup MongoDB**
Ensure MongoDB is running locally or use **Mongo Atlas**.

#### Local MongoDB:
```bash
mongod --dbpath /data/db
```
OR

#### Use Mongo Atlas:
- Update `application.properties` with your **MongoDB URI**.

---

## 🛠 **Configuration**
Edit the `src/main/resources/application.properties` file with your **MongoDB URI and JWT Secret**:

```properties
# ---------------------------
# MongoDB Configuration
# ---------------------------
spring.data.mongodb.uri=mongodb://localhost:27017/employeedb
spring.data.mongodb.database=employeedb

# ---------------------------
# Server Port (optional)
# ---------------------------
server.port=8080

# ---------------------------
# JWT Configuration
# ---------------------------
app.jwt.secret=MySecretKey12345MySecretKey12345  # In production, use a stronger secret
app.jwt.expiration=3600000  # 1 Hour in milliseconds
```

---

### **4️⃣ Build & Run**
```bash
mvn clean install
mvn spring-boot:run
```
The server will start at `http://localhost:8080`.

---

## 🔐 **API Endpoints**
### **Authentication**
| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/api/auth/register` | `POST` | Register a new user |
| `/api/auth/login` | `POST` | Login and receive JWT token |

### **Employee Management (Protected)**
| Endpoint | Method | Description |
|-----------------|--------|-------------|
| `/api/employees` | `POST` | Create an employee (Admin only) |
| `/api/employees` | `GET` | Get all employees (Authenticated users) |
| `/api/employees/{id}` | `GET` | Get employee by ID |
| `/api/employees/{id}` | `PUT` | Update employee details (Admin only) |
| `/api/employees/{id}` | `DELETE` | Delete an employee (Admin only) |

**🛡 Authorization:**  
Send the JWT token in the header for protected routes:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🎨 **Frontend UI**
The frontend provides:
- **Login & Registration Pages**
- **Employee Management Dashboard (CRUD Operations)**
- **Token-based authentication for secure access**

### **Running the Frontend**
1. Open `index.html` in the browser.
2. The UI will interact with backend APIs.

---

## 🤝 **Contributing**
Want to contribute? Follow these steps:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Added new feature"
   ```
4. Push the changes:
   ```bash
   git push origin feature-branch
   ```
5. Open a **Pull Request**.

---

## 🛑 **License**
This project is licensed under the **MIT License**.

---

## 💬 **Contact**
For any queries, reach out:
- **GitHub:** [imaadiiii](https://github.com/imaadiiii)
- **Email:** [adityaraj006005@gmail.com](mailto:adityaraj006005@gmail.com)
```

---

## **How to Add README & License to GitHub**
```bash
# Create README and License files
echo "# Employee Management System" > README.md
echo "MIT License..." > LICENSE

# Add, commit, and push
git add README.md LICENSE
git commit -m "Added README and LICENSE"
git push origin main
```

