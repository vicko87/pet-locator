 curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MjcxNzgyMTkwOTU4MDQ5NGQ2MWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDI4NzY2OSwiZXhwIjoxNzM0MjkxMjY5fQ.hlEXDx9MqEBxlELoJq1n6AsdzaXnnA2wOD0PaFx8o3M' -H  'Content-Type: application/json' -d '{"name": "Antonete", "email": "antonete2@test.com","password": "123123123","password-repeat": "123123123"}' http://localhost:8080/users -v