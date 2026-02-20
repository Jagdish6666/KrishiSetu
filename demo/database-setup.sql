-- KrishiSetu Database Setup Script
-- Run this script after the application creates the tables

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS krishisetu;
USE krishisetu;

-- Note: Tables will be auto-created by Hibernate on first run
-- This script is for adding sample government schemes for testing

-- Wait for application to create tables, then run the queries below

-- Sample Government Schemes
-- (You can also add these via the Admin API endpoints)

/*
-- PM-KISAN Scheme
INSERT INTO schemes (name, description, active) VALUES 
('PM-KISAN', 'Pradhan Mantri Kisan Samman Nidhi - ₹6000 per year to small farmers', true);

SET @pm_kisan_id = LAST_INSERT_ID();

INSERT INTO scheme_criteria (scheme_id, min_income, max_income, min_land_size, max_land_size, state, crop_type) VALUES 
(@pm_kisan_id, 0, 500000, 0, 5, NULL, NULL);

-- Kisan Credit Card Scheme
INSERT INTO schemes (name, description, active) VALUES 
('Kisan Credit Card', 'Easy credit access for farmers', true);

SET @kcc_id = LAST_INSERT_ID();

INSERT INTO scheme_criteria (scheme_id, min_income, max_income, min_land_size, max_land_size, state, crop_type) VALUES 
(@kcc_id, 0, 1000000, 1, NULL, NULL, NULL);

-- Pradhan Mantri Fasal Bima Yojana
INSERT INTO schemes (name, description, active) VALUES 
('PM Fasal Bima Yojana', 'Crop Insurance Scheme', true);

SET @pmfby_id = LAST_INSERT_ID();

INSERT INTO scheme_criteria (scheme_id, min_income, max_income, min_land_size, max_land_size, state, crop_type) VALUES 
(@pmfby_id, NULL, NULL, 0.5, NULL, NULL, NULL);

-- State-specific scheme (Punjab)
INSERT INTO schemes (name, description, active) VALUES 
('Punjab Kisan Vikas Scheme', 'Special scheme for Punjab farmers', true);

SET @punjab_id = LAST_INSERT_ID();

INSERT INTO scheme_criteria (scheme_id, min_income, max_income, min_land_size, max_land_size, state, crop_type) VALUES 
(@punjab_id, 0, 300000, 0, 10, 'Punjab', NULL);

-- Wheat-specific scheme
INSERT INTO schemes (name, description, active) VALUES 
('Wheat Procurement Scheme', 'MSP guarantee for wheat farmers', true);

SET @wheat_id = LAST_INSERT_ID();

INSERT INTO scheme_criteria (scheme_id, min_income, max_income, min_land_size, max_land_size, state, crop_type) VALUES 
(@wheat_id, NULL, NULL, 2, NULL, NULL, 'Wheat');
*/

-- To view all tables
-- SHOW TABLES;

-- To view scheme data
-- SELECT * FROM schemes;
-- SELECT * FROM scheme_criteria;

-- To view users
-- SELECT id, name, email, role, approved FROM users;

-- To view crops
-- SELECT c.id, u.name as farmer_name, c.name as crop_name, c.quantity, c.price, c.location, c.available 
-- FROM crops c 
-- JOIN users u ON c.farmer_id = u.id;

-- To view offers
-- SELECT o.id, c.name as crop_name, u.name as buyer_name, o.offer_price, o.status 
-- FROM offers o 
-- JOIN crops c ON o.crop_id = c.id 
-- JOIN users u ON o.buyer_id = u.id;
