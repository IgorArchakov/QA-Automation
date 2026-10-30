import { test, expect } from '@playwright/test';

test('get all bookings', async ({ request }) => {
  const response = await request.get(`/booking`);
  const headers = response.headers();
  expect(response.status()).toEqual(200);
  expect(headers['content-type']).toContain('application/json');
  const bookings = await response.json();
  expect(Array.isArray(bookings)).toBeTruthy();
  expect(bookings.length).toBeGreaterThan(0);
  const firstBooking = bookings[0];
  expect(typeof firstBooking.bookingid).toBe('number');
});
