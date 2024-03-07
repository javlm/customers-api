const request = require('supertest');
const app = require('../index');

describe('User Management API', () => {
    it('should register a new user', async () => {
        const newUser = {
            username: 'test',
            email:'test@testing.com',
            birthday:'07/03/2024',
            phone:58647605, 
            password: 'test'
        };

        const response = await request(app)
            .post('/api/users/signup')
            .send(newUser);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('msg', 'User created successfully');
    });

    
    it('should login an existing user', async () => {
        const credentials = {
            username: 'test',
            password: 'test'
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(credentials);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});