-- Seed data for Founders Space Gateway
-- Created: 2025-07-21

-- Insert Countries
INSERT INTO countries (name, code) VALUES
('Afghanistan', 'AF'),
('Albania', 'AL'),
('Algeria', 'DZ'),
('Andorra', 'AD'),
('Angola', 'AO'),
('Antigua and Barbuda', 'AG'),
('Argentina', 'AR'),
('Armenia', 'AM'),
('Australia', 'AU'),
('Austria', 'AT'),
('Azerbaijan', 'AZ'),
('Bahamas', 'BS'),
('Bahrain', 'BH'),
('Bangladesh', 'BD'),
('Barbados', 'BB'),
('Belarus', 'BY'),
('Belgium', 'BE'),
('Belize', 'BZ'),
('Benin', 'BJ'),
('Bhutan', 'BT'),
('Bolivia', 'BO'),
('Bosnia and Herzegovina', 'BA'),
('Botswana', 'BW'),
('Brazil', 'BR'),
('Brunei', 'BN'),
('Bulgaria', 'BG'),
('Burkina Faso', 'BF'),
('Burundi', 'BI'),
('Cabo Verde', 'CV'),
('Cambodia', 'KH'),
('Cameroon', 'CM'),
('Canada', 'CA'),
('Central African Republic', 'CF'),
('Chad', 'TD'),
('Chile', 'CL'),
('China', 'CN'),
('Colombia', 'CO'),
('Comoros', 'KM'),
('Congo', 'CG'),
('Costa Rica', 'CR'),
('Croatia', 'HR'),
('Cuba', 'CU'),
('Cyprus', 'CY'),
('Czech Republic', 'CZ'),
('Denmark', 'DK'),
('Djibouti', 'DJ'),
('Dominica', 'DM'),
('Dominican Republic', 'DO'),
('Ecuador', 'EC'),
('Egypt', 'EG'),
('El Salvador', 'SV'),
('Equatorial Guinea', 'GQ'),
('Eritrea', 'ER'),
('Estonia', 'EE'),
('Eswatini', 'SZ'),
('Ethiopia', 'ET'),
('Fiji', 'FJ'),
('Finland', 'FI'),
('France', 'FR'),
('Gabon', 'GA'),
('Gambia', 'GM'),
('Georgia', 'GE'),
('Germany', 'DE'),
('Ghana', 'GH'),
('Greece', 'GR'),
('Grenada', 'GD'),
('Guatemala', 'GT'),
('Guinea', 'GN'),
('Guinea-Bissau', 'GW'),
('Guyana', 'GY'),
('Haiti', 'HT'),
('Honduras', 'HN'),
('Hungary', 'HU'),
('Iceland', 'IS'),
('India', 'IN'),
('Indonesia', 'ID'),
('Iran', 'IR'),
('Iraq', 'IQ'),
('Ireland', 'IE'),
('Israel', 'IL'),
('Italy', 'IT'),
('Jamaica', 'JM'),
('Japan', 'JP'),
('Jordan', 'JO'),
('Kazakhstan', 'KZ'),
('Kenya', 'KE'),
('Kiribati', 'KI'),
('Kuwait', 'KW'),
('Kyrgyzstan', 'KG'),
('Laos', 'LA'),
('Latvia', 'LV'),
('Lebanon', 'LB'),
('Lesotho', 'LS'),
('Liberia', 'LR'),
('Libya', 'LY'),
('Liechtenstein', 'LI'),
('Lithuania', 'LT'),
('Luxembourg', 'LU'),
('Madagascar', 'MG'),
('Malawi', 'MW'),
('Malaysia', 'MY'),
('Maldives', 'MV'),
('Mali', 'ML'),
('Malta', 'MT'),
('Marshall Islands', 'MH'),
('Mauritania', 'MR'),
('Mauritius', 'MU'),
('Mexico', 'MX'),
('Micronesia', 'FM'),
('Moldova', 'MD'),
('Monaco', 'MC'),
('Mongolia', 'MN'),
('Montenegro', 'ME'),
('Morocco', 'MA'),
('Mozambique', 'MZ'),
('Myanmar', 'MM'),
('Namibia', 'NA'),
('Nauru', 'NR'),
('Nepal', 'NP'),
('Netherlands', 'NL'),
('New Zealand', 'NZ'),
('Nicaragua', 'NI'),
('Niger', 'NE'),
('Nigeria', 'NG'),
('North Korea', 'KP'),
('North Macedonia', 'MK'),
('Norway', 'NO'),
('Oman', 'OM'),
('Pakistan', 'PK'),
('Palau', 'PW'),
('Panama', 'PA'),
('Papua New Guinea', 'PG'),
('Paraguay', 'PY'),
('Peru', 'PE'),
('Philippines', 'PH'),
('Poland', 'PL'),
('Portugal', 'PT'),
('Qatar', 'QA'),
('Romania', 'RO'),
('Russia', 'RU'),
('Rwanda', 'RW'),
('Saint Kitts and Nevis', 'KN'),
('Saint Lucia', 'LC'),
('Saint Vincent and the Grenadines', 'VC'),
('Samoa', 'WS'),
('San Marino', 'SM'),
('Sao Tome and Principe', 'ST'),
('Saudi Arabia', 'SA'),
('Senegal', 'SN'),
('Serbia', 'RS'),
('Seychelles', 'SC'),
('Sierra Leone', 'SL'),
('Singapore', 'SG'),
('Slovakia', 'SK'),
('Slovenia', 'SI'),
('Solomon Islands', 'SB'),
('Somalia', 'SO'),
('South Africa', 'ZA'),
('South Korea', 'KR'),
('South Sudan', 'SS'),
('Spain', 'ES'),
('Sri Lanka', 'LK'),
('Sudan', 'SD'),
('Suriname', 'SR'),
('Sweden', 'SE'),
('Switzerland', 'CH'),
('Syria', 'SY'),
('Taiwan', 'TW'),
('Tajikistan', 'TJ'),
('Tanzania', 'TZ'),
('Thailand', 'TH'),
('Timor-Leste', 'TL'),
('Togo', 'TG'),
('Tonga', 'TO'),
('Trinidad and Tobago', 'TT'),
('Tunisia', 'TN'),
('Turkey', 'TR'),
('Turkmenistan', 'TM'),
('Tuvalu', 'TV'),
('Uganda', 'UG'),
('Ukraine', 'UA'),
('United Arab Emirates', 'AE'),
('United Kingdom', 'GB'),
('United States', 'US'),
('Uruguay', 'UY'),
('Uzbekistan', 'UZ'),
('Vanuatu', 'VU'),
('Vatican City', 'VA'),
('Venezuela', 'VE'),
('Vietnam', 'VN'),
('Yemen', 'YE'),
('Zambia', 'ZM'),
('Zimbabwe', 'ZW')
ON CONFLICT (code) DO NOTHING;

-- Insert Features
INSERT INTO features (name, description) VALUES
('founder_community', 'Access to exclusive founder community'),
('mentorship', 'Mentorship from industry experts'),
('workshops', 'Access to exclusive workshops and events'),
('networking', 'Networking opportunities with other founders'),
('funding_access', 'Access to funding opportunities'),
('co_working', 'Access to co-working spaces'),
('legal_support', 'Legal and compliance support'),
('marketing_support', 'Marketing and PR support'),
('product_development', 'Product development resources'),
('investor_pitch', 'Investor pitch preparation'),
('market_research', 'Market research resources'),
('hr_support', 'HR and talent acquisition support')
ON CONFLICT (name) DO NOTHING;

-- Insert Tiers
INSERT INTO tiers (id, name, description, price, is_active) VALUES
('explorer', 'Explorer', 'For aspiring entrepreneurs just starting their journey', 0, true),
('ignite', 'Ignite', 'For early-stage startups looking to gain traction', 5000, true),
('forge', 'Forge', 'For growing startups ready to scale', 15000, true),
('vanguard', 'Vanguard', 'For established startups seeking market leadership', 30000, true),
('legacy', 'Legacy', 'For successful entrepreneurs giving back', 0, true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    is_active = EXCLUDED.is_active;

-- Map Features to Tiers
-- Explorer Tier Features
INSERT INTO tier_features (tier_id, feature_id)
SELECT 'explorer', id FROM features WHERE name IN ('founder_community', 'workshops')
ON CONFLICT (tier_id, feature_id) DO NOTHING;

-- Ignite Tier Features
INSERT INTO tier_features (tier_id, feature_id)
SELECT 'ignite', id FROM features WHERE name IN (
    'founder_community', 'workshops', 'networking', 'mentoring'
)
ON CONFLICT (tier_id, feature_id) DO NOTHING;

-- Forge Tier Features
INSERT INTO tier_features (tier_id, feature_id)
SELECT 'forge', id FROM features WHERE name IN (
    'founder_community', 'workshops', 'networking', 'mentoring',
    'funding_access', 'co_working', 'legal_support'
)
ON CONFLICT (tier_id, feature_id) DO NOTHING;

-- Vanguard Tier Features
INSERT INTO tier_features (tier_id, feature_id)
SELECT 'vanguard', id FROM features WHERE name IN (
    'founder_community', 'workshops', 'networking', 'mentoring',
    'funding_access', 'co_working', 'legal_support',
    'marketing_support', 'product_development', 'investor_pitch'
)
ON CONFLICT (tier_id, feature_id) DO NOTHING;

-- Legacy Tier Features (all features)
INSERT INTO tier_features (tier_id, feature_id)
SELECT 'legacy', id FROM features
ON CONFLICT (tier_id, feature_id) DO NOTHING;

-- Insert sample admin user (password: admin123 - should be hashed in production)
INSERT INTO members (
    id, email, first_name, last_name, phone, country_id, 
    startup_stage, linkedin_profile, startup_website, 
    stripe_customer_id, current_tier_id, is_active
) VALUES (
    '11111111-1111-1111-1111-111111111111',
    'admin@founderspace.com',
    'Admin',
    'User',
    '+1234567890',
    (SELECT id FROM countries WHERE code = 'US'),
    'scaling',
    'https://linkedin.com/in/admin',
    'https://founderspace.com',
    'cus_admin_123',
    'legacy',
    true
)
ON CONFLICT (email) DO NOTHING;
