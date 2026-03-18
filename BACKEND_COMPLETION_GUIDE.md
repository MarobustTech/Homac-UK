# Homac UK - Backend Connection & Completion Guide

## Overview
This document outlines all endpoints, database operations, and backend work needed to fully connect your Homac UK application to a production database.

---

## 🗄️ DATABASE SCHEMA

### Tables Required

#### 1. **users** (Student/Parent Accounts)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role ENUM('student', 'parent', 'admin') DEFAULT 'parent',
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  enrolledCourses TEXT[] DEFAULT '{}',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. **courses**
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  shortDescription VARCHAR(500),
  slug VARCHAR(255) UNIQUE NOT NULL,
  category ENUM('beginner', 'intermediate', 'advanced', '11plus') DEFAULT 'beginner',
  level VARCHAR(50),
  duration VARCHAR(100),
  price DECIMAL(10, 2),
  image VARCHAR(500),
  instructor VARCHAR(255),
  totalStudents INT DEFAULT 0,
  rating DECIMAL(3, 1) DEFAULT 4.5,
  features TEXT[] DEFAULT '{}',
  status ENUM('active', 'inactive', 'archived') DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modifiedBy VARCHAR(255) DEFAULT 'System'
);
```

#### 3. **course_modules**
```sql
CREATE TABLE course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  courseId UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  lessons INT,
  duration VARCHAR(100),
  orderIndex INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4. **enrollments**
```sql
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  courseId UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status ENUM('active', 'completed', 'paused', 'cancelled') DEFAULT 'active',
  progress INT DEFAULT 0,
  startDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completedDate TIMESTAMP,
  lastAccessedDate TIMESTAMP,
  notes TEXT
);
```

#### 5. **enquiries**
```sql
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  enquiryType VARCHAR(100),
  message TEXT NOT NULL,
  source VARCHAR(100) DEFAULT 'website',
  status ENUM('new', 'contacted', 'in_progress', 'converted', 'closed') DEFAULT 'new',
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  assignedTo VARCHAR(255),
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 6. **franchise_applications**
```sql
CREATE TABLE franchise_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  businessName VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  preferredArea VARCHAR(255),
  investmentAmount VARCHAR(100),
  experience TEXT,
  motivation TEXT,
  status ENUM('pending', 'reviewing', 'approved', 'rejected', 'withdrawn') DEFAULT 'pending',
  assignedTo VARCHAR(255),
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewDate TIMESTAMP
);
```

#### 7. **cms_pages**
```sql
CREATE TABLE cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  seoTitle VARCHAR(255),
  seoDescription VARCHAR(500),
  seoKeywords TEXT[] DEFAULT '{}',
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  lastModifiedBy VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  version INT DEFAULT 1
);
```

#### 8. **cms_sections**
```sql
CREATE TABLE cms_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pageId UUID NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE,
  sectionType ENUM('hero', 'text', 'features', 'cta', 'testimonials', 'gallery', 'faq', 'contact', 'custom'),
  title VARCHAR(255),
  content TEXT,
  data JSONB,
  orderIndex INT NOT NULL,
  visible BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 9. **testimonials**
```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100),
  content TEXT NOT NULL,
  rating INT DEFAULT 5,
  image VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 10. **audit_logs**
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action VARCHAR(255) NOT NULL,
  tableName VARCHAR(100) NOT NULL,
  recordId VARCHAR(255),
  userId VARCHAR(255),
  oldValues JSONB,
  newValues JSONB,
  ipAddress VARCHAR(45),
  userAgent TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 11. **media_assets**
```sql
CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  assetType ENUM('image', 'video', 'document', 'audio') DEFAULT 'image',
  url VARCHAR(500) NOT NULL,
  size BIGINT,
  mimeType VARCHAR(100),
  uploadedBy VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 12. **admin_users**
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  role ENUM('super_admin', 'admin', 'manager') DEFAULT 'manager',
  permissions TEXT[] DEFAULT '{}',
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  lastLogin TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📡 API ENDPOINTS

### **AUTHENTICATION ENDPOINTS**

#### User Auth
```
POST   /api/auth/register              - Register new student/parent account
POST   /api/auth/login                 - Login user account
POST   /api/auth/logout                - Logout user
POST   /api/auth/refresh-token         - Refresh authentication token
POST   /api/auth/forgot-password       - Request password reset
POST   /api/auth/reset-password        - Reset password with token
GET    /api/auth/me                    - Get current user profile
PUT    /api/auth/profile               - Update user profile
```

#### Admin Auth
```
POST   /api/admin/auth/login           - Admin login
POST   /api/admin/auth/logout          - Admin logout
GET    /api/admin/auth/verify          - Verify admin session
PUT    /api/admin/auth/change-password - Change admin password
```

---

### **COURSES ENDPOINTS**

```
GET    /api/courses                    - Get all courses (paginated)
GET    /api/courses/:id                - Get single course details
GET    /api/courses/:slug              - Get course by slug
POST   /api/courses                    - Create new course (admin)
PUT    /api/courses/:id                - Update course (admin)
DELETE /api/courses/:id                - Delete course (admin)
GET    /api/courses/:id/modules        - Get course modules
POST   /api/courses/:id/modules        - Add module to course (admin)
PUT    /api/courses/:id/modules/:modId - Update course module (admin)
DELETE /api/courses/:id/modules/:modId - Delete course module (admin)
```

---

### **ENROLLMENTS ENDPOINTS**

```
POST   /api/enrollments                - Enroll in course
GET    /api/enrollments                - Get user's enrollments
GET    /api/enrollments/:id            - Get enrollment details
PUT    /api/enrollments/:id            - Update enrollment progress
DELETE /api/enrollments/:id            - Cancel enrollment
GET    /api/enrollments/:id/progress   - Get enrollment progress
POST   /api/enrollments/:id/complete   - Mark enrollment as complete
```

---

### **ENQUIRIES ENDPOINTS**

```
POST   /api/enquiries                  - Create new enquiry (public)
GET    /api/enquiries                  - Get all enquiries (admin)
GET    /api/enquiries/:id              - Get single enquiry (admin)
PUT    /api/enquiries/:id              - Update enquiry (admin)
PUT    /api/enquiries/:id/status       - Update enquiry status (admin)
POST   /api/enquiries/:id/notes        - Add note to enquiry (admin)
DELETE /api/enquiries/:id              - Delete enquiry (admin)
GET    /api/enquiries/stats            - Get enquiry statistics (admin)
```

---

### **FRANCHISE ENDPOINTS**

```
POST   /api/franchise/apply            - Submit franchise application
GET    /api/franchise/applications     - Get all applications (admin)
GET    /api/franchise/:id              - Get application details (admin)
PUT    /api/franchise/:id              - Update application (admin)
PUT    /api/franchise/:id/status       - Update application status (admin)
POST   /api/franchise/:id/notes        - Add note to application (admin)
DELETE /api/franchise/:id              - Delete application (admin)
GET    /api/franchise/stats            - Get franchise statistics (admin)
```

---

### **USERS ENDPOINTS**

```
GET    /api/users                      - Get all users (admin)
GET    /api/users/:id                  - Get user details (admin)
PUT    /api/users/:id                  - Update user (admin)
DELETE /api/users/:id                  - Delete user (admin)
GET    /api/users/:id/enrollments      - Get user enrollments (admin)
POST   /api/users/:id/suspend          - Suspend user account (admin)
POST   /api/users/:id/activate         - Activate user account (admin)
GET    /api/users/stats                - Get user statistics (admin)
```

---

### **CMS PAGES ENDPOINTS**

```
GET    /api/cms/pages                  - Get all pages (admin)
GET    /api/cms/pages/:id              - Get page details (admin)
GET    /api/cms/pages/slug/:slug       - Get page by slug (public)
POST   /api/cms/pages                  - Create new page (admin)
PUT    /api/cms/pages/:id              - Update page (admin)
DELETE /api/cms/pages/:id              - Delete page (admin)
POST   /api/cms/pages/:id/sections     - Add section to page (admin)
PUT    /api/cms/pages/:id/sections/:sec - Update section (admin)
DELETE /api/cms/pages/:id/sections/:sec - Delete section (admin)
PUT    /api/cms/pages/:id/seo          - Update page SEO (admin)
PUT    /api/cms/pages/:id/publish      - Publish page (admin)
```

---

### **TESTIMONIALS ENDPOINTS**

```
GET    /api/testimonials               - Get all approved testimonials (public)
GET    /api/testimonials/featured      - Get featured testimonials (public)
POST   /api/testimonials               - Submit new testimonial (public)
GET    /api/testimonials/admin         - Get all testimonials (admin)
PUT    /api/testimonials/:id           - Update testimonial (admin)
PUT    /api/testimonials/:id/status    - Approve/reject testimonial (admin)
DELETE /api/testimonials/:id           - Delete testimonial (admin)
```

---

### **MEDIA ENDPOINTS**

```
GET    /api/media                      - Get all media assets (admin)
POST   /api/media/upload               - Upload media file (admin)
DELETE /api/media/:id                  - Delete media asset (admin)
GET    /api/media/:id                  - Get media asset details (admin)
```

---

### **ADMIN USERS ENDPOINTS**

```
GET    /api/admin/users                - Get all admin users (super admin)
POST   /api/admin/users                - Create admin user (super admin)
GET    /api/admin/users/:id            - Get admin user details (super admin)
PUT    /api/admin/users/:id            - Update admin user (super admin)
DELETE /api/admin/users/:id            - Delete admin user (super admin)
PUT    /api/admin/users/:id/role       - Update admin role (super admin)
```

---

### **ANALYTICS & STATS ENDPOINTS**

```
GET    /api/analytics/dashboard        - Get dashboard stats (admin)
GET    /api/analytics/enrollments      - Get enrollment analytics (admin)
GET    /api/analytics/revenue          - Get revenue analytics (admin)
GET    /api/analytics/courses          - Get course performance (admin)
GET    /api/analytics/users            - Get user statistics (admin)
GET    /api/analytics/enquiries        - Get enquiry statistics (admin)
GET    /api/analytics/franchise        - Get franchise statistics (admin)
```

---

### **AUDIT LOG ENDPOINTS**

```
GET    /api/audit/logs                 - Get audit logs (super admin)
GET    /api/audit/logs/user/:userId    - Get user activity logs (super admin)
GET    /api/audit/logs/table/:table    - Get table change logs (super admin)
```

---

### **SYSTEM ENDPOINTS**

```
GET    /api/health                     - Health check
GET    /api/health/database            - Database health check
GET    /api/settings                   - Get system settings (admin)
PUT    /api/settings                   - Update system settings (super admin)
```

---

## 🔐 AUTHENTICATION & AUTHORIZATION

### Auth Strategy
- **Method**: JWT (JSON Web Tokens)
- **Refresh Token**: Stored in HTTP-only cookies
- **Access Token**: Stored in memory (frontend)
- **Expiry**: 15 minutes (access), 7 days (refresh)

### Role-Based Access Control (RBAC)
```
User Roles:
  - student: Access own courses and profile
  - parent: Manage child accounts and enrollments
  - admin: Manage content, courses, users
  - super_admin: Full system access

Permissions Matrix:
  - View public content: All
  - Create enrollments: Authenticated users
  - Manage courses: admin, super_admin
  - Manage users: admin, super_admin
  - View analytics: admin, super_admin
  - Manage admins: super_admin only
```

---

## 🔄 MIGRATION STEPS FROM CURRENT STATE

### Step 1: Database Setup
- [ ] Choose database provider (Supabase, Neon, AWS RDS)
- [ ] Create all tables above
- [ ] Set up indexes on frequently queried columns
- [ ] Enable Row Level Security (RLS) if using Supabase
- [ ] Create backups schedule

### Step 2: Authentication Implementation
- [ ] Implement JWT authentication system
- [ ] Add password hashing (bcrypt)
- [ ] Create auth middleware
- [ ] Implement session management
- [ ] Add CSRF protection
- [ ] Set up refresh token rotation

### Step 3: API Routes Migration
- [ ] Convert existing API routes to database queries
- [ ] Update `/api/contact/submit` → Store enquiries in DB
- [ ] Update `/api/franchise/submit` → Store applications in DB
- [ ] Add query/create/update/delete for all entities
- [ ] Implement pagination and filtering
- [ ] Add rate limiting

### Step 4: Data Migration
- [ ] Transfer localStorage mock data to database
- [ ] Create admin accounts
- [ ] Import existing courses
- [ ] Import testimonials if any exist
- [ ] Validate data integrity

### Step 5: Frontend Updates
- [ ] Replace localStorage with API calls
- [ ] Update store files to use real endpoints
- [ ] Implement loading/error states
- [ ] Add authentication flow (login/signup/logout)
- [ ] Update form submissions to use new endpoints
- [ ] Add auth guards to protected routes

### Step 6: Admin Dashboard Connection
- [ ] Connect all admin panels to real API endpoints
- [ ] Implement real-time data updates
- [ ] Add error handling and validation
- [ ] Test all CRUD operations
- [ ] Implement audit logging

### Step 7: Testing & Validation
- [ ] Unit test all API endpoints
- [ ] Integration test database operations
- [ ] Test authentication flows
- [ ] Load test with multiple concurrent users
- [ ] Security testing (SQL injection, XSS, CSRF)
- [ ] Test error handling and edge cases

### Step 8: Deployment
- [ ] Set up CI/CD pipeline
- [ ] Configure environment variables
- [ ] Enable HTTPS and security headers
- [ ] Set up monitoring and logging
- [ ] Configure backups and recovery
- [ ] Deploy to production

---

## 📊 CURRENT IMPLEMENTATION STATUS

### ✅ Implemented (Frontend Ready)
- Contact form submission endpoint stub
- Franchise application endpoint stub
- Enquiries endpoint stub
- Health check endpoint
- Page layouts and components
- Admin dashboard UI
- Form validation

### ❌ Not Implemented (Needed)
- Real database connection
- User authentication system
- Course enrollment system
- User account management
- Admin user management
- CMS page editing
- File upload system
- Analytics calculations
- Audit logging
- Payment processing (if needed)
- Email notifications

---

## 📋 TODO CHECKLIST

### Database & Infrastructure
- [ ] Provision database (Supabase/Neon/AWS)
- [ ] Create database schema
- [ ] Set up migrations
- [ ] Configure backups
- [ ] Set up monitoring

### Authentication
- [ ] Implement JWT system
- [ ] Add password hashing
- [ ] Create auth middleware
- [ ] Build login/signup flows
- [ ] Add password recovery

### API Routes
- [ ] Implement all CRUD endpoints
- [ ] Add pagination/filtering
- [ ] Add validation
- [ ] Add error handling
- [ ] Add rate limiting

### Frontend Integration
- [ ] Update store files to use API
- [ ] Implement loading states
- [ ] Add error handling
- [ ] Add auth guards
- [ ] Test all features

### Admin Features
- [ ] Connect all admin panels to API
- [ ] Implement real-time updates
- [ ] Add user management
- [ ] Add analytics
- [ ] Add audit logs

### Security
- [ ] Enable HTTPS
- [ ] Add CORS headers
- [ ] Implement CSRF protection
- [ ] Add rate limiting
- [ ] Enable RLS (if Supabase)

### Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Load tests
- [ ] Security tests

### Deployment
- [ ] Set up CI/CD
- [ ] Configure env vars
- [ ] Enable monitoring
- [ ] Set up alerts
- [ ] Plan rollback strategy

---

## 🔧 RECOMMENDED TECH STACK

```
Database:
  ├─ Supabase (PostgreSQL + Auth + Real-time)
  ├─ Neon (PostgreSQL + Serverless)
  └─ PlanetScale (MySQL)

API:
  ├─ Node.js/Express
  ├─ Prisma (ORM)
  ├─ Zod (Validation)
  └─ jsonwebtoken (Auth)

Storage:
  ├─ Vercel Blob (File storage)
  ├─ AWS S3
  └─ Cloudinary

Email:
  ├─ Resend
  ├─ SendGrid
  └─ AWS SES

Monitoring:
  ├─ Sentry
  ├─ LogRocket
  └─ New Relic

Analytics:
  ├─ Mixpanel
  ├─ Amplitude
  └─ Google Analytics 4
```

---

## 📝 NEXT STEPS

1. **Choose Database Provider**
   - Supabase recommended for fastest implementation
   - Built-in auth, real-time, and RLS

2. **Set Up Database Schema**
   - Use provided SQL above
   - Create migrations

3. **Implement Authentication**
   - Start with login/signup flows
   - Add JWT and session management

4. **Migrate API Endpoints**
   - One feature at a time
   - Test thoroughly before moving to next

5. **Update Frontend**
   - Replace mock data with real API calls
   - Add loading and error states

6. **Test & Deploy**
   - Comprehensive testing
   - Gradual rollout

---

## 📞 Support Resources

- Supabase Docs: https://supabase.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Next.js API Routes: https://nextjs.org/docs/api-routes
- JWT Guide: https://tools.ietf.org/html/rfc7519

---

**Document Version**: 1.0  
**Last Updated**: January 2026  
**Status**: Ready for Implementation
