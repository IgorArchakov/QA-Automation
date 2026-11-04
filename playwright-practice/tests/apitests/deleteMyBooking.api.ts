import { test, expect } from '../../fixtures/apiFixtures.js';
import { createBooking } from '../../api/booking.js';

test('delete booking', async ({ request, authToken }) => {
  //create my test booking
  const booking = await createBooking(request);
  const deleteResponse = await request.delete(`/booking/${booking.bookingId}`, {
    headers: { Cookie: `token=${authToken}` },
  });
  expect(deleteResponse.status()).toEqual(201); //should be 200, but in docs 201;
  const getResponse = await request.get(`/booking/${booking.bookingId}`);
  expect(getResponse.status()).toEqual(404);
});
