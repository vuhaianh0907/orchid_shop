# 1. Login 
POST http://localhost:5000/api/accounts/auth
# 2. Register 
POST http://localhost:5000/api/accounts/
# 3. Logout 
POST http://localhost:5000/api/accounts/logout
# 4. Get user profile 
GET http://localhost:5000/api/accounts/profile
# 5. Update user profile 
PUT http://localhost:5000/api/accounts/profile
# 6. Create staff account 
POST http://localhost:5000/api/accounts/create-staff
# 7. Create manager account 
POST http://localhost:5000/api/accounts/create-manager
# 8. Deactivate account 
PUT http://localhost:5000/api/accounts/deactivate/:id 
# 9. Reactivate account 
PUT http://localhost:5000/api/accounts/reactivate/:id 
# 10. Create admin account
POST http://localhost:5000/api/accounts/new-admin
# 11. Create plant 
POST http://localhost:5000/api/plants
# 12. Get all plants 
GET http://localhost:5000/api/plants
# 13. Get plant by ID 
GET http://localhost:5000/api/plants/:id
# 14. Update plant by ID 
PUT http://localhost:5000/api/plants/:id
# 15. Remove plant by ID 
PUT http://localhost:5000/api/plants/:id
# 16. Get user plants 
GET http://localhost:5000/api/plants/seller/plants
# 17. Create new review 
POST http://localhost:5000/api/reviews/:plantId
# 18. Update review 
PUT http://localhost:5000/api/reviews/:id
# 19. Hide review 
PUT http://localhost:5000/api/reviews/:id/hide
# 20. Get plant reviews 
GET http://localhost:5000/api/reviews/:plantId
