import { test, expect } from '../../fixtures/apiFixtures.js';
import { createBooking } from '../../api/booking.js';

// known bug: API drops decimals in totalprice (236.5 → 236). Remove test.fail when it turns red.
test.fail(
  'create booking with decimal totalPrice',
  async ({ request, authToken }) => {
    const booking = await createBooking(request, { totalprice: 236.5 });
    const getResponse = await request.get(`/booking/${booking.bookingId}`);
    expect(getResponse.status()).toEqual(200);

    await request.delete(`/booking/${booking.bookingId}`, {
      headers: { Cookie: `token=${authToken}` },
    });
    expect(await getResponse.json()).toHaveProperty(
      'totalprice',
      booking.data.totalprice,
    );
  },
);
