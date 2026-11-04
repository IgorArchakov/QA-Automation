import { test as base, expect } from '@playwright/test';
import { type Booking, createBooking } from '../api/booking.js';

//types listing for worker-scope fixture (for many tests)
type ApiWorkerFixtures = {
  authToken: string;
};
//types listing for test-scope fixture
type ApiTestFixtures = {
  booking: Booking;
};

//fixtures
export const test = base.extend<ApiTestFixtures, ApiWorkerFixtures>({
  // test fixture = name: function
  booking: async ({ request, authToken }, use) => {
    const booking = await createBooking(request);
    await use(booking);
    const deleteResponse = await request.delete(
      `/booking/${booking.bookingId}`,
      {
        headers: { Cookie: `token=${authToken}` },
      },
    );
    expect(deleteResponse.status()).toEqual(201);
  },
  // worker fixture = name: array function, scope in the end
  authToken: [
    async ({ playwright }, use) => {
      // 1. create own request context
      const apiContext = await playwright.request.newContext();
      // 2. worker scope: one POST /auth per worker, only if a test requests authToken
      const response = await apiContext.post('/auth', {
        data: {
          username: 'admin',
          password: 'password123',
        },
      });
      // 3. /auth returns 200 even for bad credentials, so check the token itself
      expect(response.status()).toEqual(200);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('token');
      // 4. take the token out of the body
      const token = responseBody.token;
      // 5. hand it over: await use(...)
      await use(token);
      // 6. cleanup: dispose the context
      await apiContext.dispose();
    },
    { scope: 'worker' },
  ],
});
export { expect };
