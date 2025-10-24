--- LeaseLink
CREATE TABLE IF NOT EXISTS users (
 id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 clerk_id TEXT UNIQUE NOT NULL,             
 full_name VARCHAR(100) NOT NULL,
 email VARCHAR(150) UNIQUE NOT NULL,
 created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS properties (
 id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 address_line1 TEXT NOT NULL,
 address_line2 TEXT,
 city TEXT NOT NULL,
 postcode TEXT NOT NULL,
 country TEXT DEFAULT 'United Kingdom',
 description TEXT,
 created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS roles (
 id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 landlord_id INT REFERENCES users(id) ON DELETE SET NULL,
 tenant_id INT REFERENCES users(id) ON DELETE SET NULL,
 property_id INT REFERENCES properties(id) ON DELETE SET NULL,
 created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS feedback (
 id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 role_id INT REFERENCES roles(id) ON DELETE SET NULL,
 comment TEXT NOT NULL,
 voting INT DEFAULT 0 CHECK (voting >= 0 AND voting <= 5),
 created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS repairs (
 id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 role_id INT REFERENCES roles(id) ON DELETE SET NULL,       
 property_id INT REFERENCES properties(id) ON DELETE CASCADE,
 description TEXT NOT NULL,
 img_url TEXT,                                              
 status VARCHAR(20) DEFAULT 'PENDING',                      
 created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS comments (
 id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 repair_id INT REFERENCES repairs(id) ON DELETE CASCADE,
 user_id INT REFERENCES users(id) ON DELETE SET NULL,
 comment TEXT NOT NULL,
 created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS tenancy_requests (
 id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 tenant_id INT REFERENCES users(id) ON DELETE SET NULL,
 property_id INT REFERENCES properties(id) ON DELETE SET NULL,
 status VARCHAR(20) DEFAULT 'PENDING',  
 created_at TIMESTAMP DEFAULT NOW()
);




SELECT properties.*
FROM properties
JOIN roles ON roles.property_id = properties.id
WHERE roles.landlord_id = $1;




SELECT users.full_name, users.email
FROM users
JOIN roles ON roles.tenant_id = users.id
WHERE roles.landlord_id = $1;




SELECT tenancy_requests.*, users.full_name AS tenant_name
FROM tenancy_requests
JOIN users ON users.id = tenancy_requests.tenant_id
WHERE tenancy_requests.property_id = $1;




SELECT repairs.*
FROM repairs
WHERE repairs.property_id = $1;




SELECT repairs.*
FROM repairs
JOIN roles ON roles.id = repairs.role_id
WHERE roles.landlord_id = $1;




SELECT comments.comment, users.full_name, comments.created_at
FROM comments
JOIN users ON users.id = comments.user_id
WHERE comments.repair_id = $1
ORDER BY comments.created_at ASC;




SELECT feedback.comment, feedback.voting, users.full_name AS tenant_name
FROM feedback
JOIN roles ON roles.id = feedback.role_id
JOIN users ON users.id = roles.tenant_id
WHERE roles.landlord_id = $1;




SELECT
 repairs.description,
 landlords.full_name AS landlord_name,
 tenants.full_name AS tenant_name,
 properties.address_line1
FROM repairs
JOIN roles ON roles.id = repairs.role_id
JOIN users AS landlords ON landlords.id = roles.landlord_id
JOIN users AS tenants ON tenants.id = roles.tenant_id
JOIN properties ON properties.id = roles.property_id
WHERE repairs.id = $1;


SELECT
 properties.id,
 properties.address_line1,
 properties.city,
 properties.postcode,
 properties.country,
 properties.description
FROM properties
LEFT JOIN roles
 ON roles.property_id = properties.id
WHERE roles.landlord_id = $1;




SELECT
 users.id,
 users.full_name,
 users.email
FROM users
LEFT JOIN roles
 ON roles.tenant_id = users.id
WHERE roles.landlord_id = $1;




SELECT
 tenancy_requests.id,
 tenancy_requests.status,
 tenancy_requests.created_at,
 users.full_name AS tenant_name
FROM tenancy_requests
LEFT JOIN users
 ON users.id = tenancy_requests.tenant_id
WHERE tenancy_requests.property_id = $1;




SELECT
 repairs.id,
 repairs.description,
 repairs.status,
 repairs.img_url,
 repairs.created_at
FROM repairs
LEFT JOIN properties
 ON properties.id = repairs.property_id
WHERE repairs.property_id = $1;




SELECT
 repairs.id,
 repairs.description,
 repairs.status,
 repairs.created_at
FROM repairs
LEFT JOIN roles
 ON roles.id = repairs.role_id
WHERE roles.landlord_id = $1;




SELECT
 comments.comment,
 users.full_name,
 comments.created_at
FROM comments
LEFT JOIN users
 ON users.id = comments.user_id
WHERE comments.repair_id = $1
ORDER BY comments.created_at ASC;




SELECT
 feedback.comment,
 feedback.voting,
 users.full_name AS tenant_name
FROM feedback
LEFT JOIN roles
 ON roles.id = feedback.role_id
LEFT JOIN users
 ON users.id = roles.tenant_id
WHERE roles.landlord_id = $1;




SELECT
 repairs.id,
 repairs.description,
 landlords.full_name AS landlord_name,
 tenants.full_name AS tenant_name,
 properties.address_line1,
 properties.city,
 properties.postcode
FROM repairs
LEFT JOIN roles
 ON roles.id = repairs.role_id
LEFT JOIN users AS landlords
 ON landlords.id = roles.landlord_id
LEFT JOIN users AS tenants
 ON tenants.id = roles.tenant_id
LEFT JOIN properties
 ON properties.id = roles.property_id
WHERE repairs.id = $1;