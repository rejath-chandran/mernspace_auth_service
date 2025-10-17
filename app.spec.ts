import app from './src/app'; // Adjust the path as necessary
import request from 'supertest';
describe('Auth Service', () => {
  it('should return 200 on health check', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
