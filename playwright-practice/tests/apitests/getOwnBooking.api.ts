import { test, expect } from '../../fixtures/apiFixtures.js';

test('get own booking', async ({ request, booking }) => {
  const getResponse = await request.get(`/booking/${booking.bookingId}`);
  expect(getResponse.status()).toEqual(200);
  const bookingBody = await getResponse.json();
  expect(bookingBody).toEqual(booking.data);
});
