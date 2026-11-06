import { expect, type APIRequestContext } from '@playwright/test';

export type BookingData = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
};

export type OverrideBookingData = Partial<BookingData>;

export type Booking = {
  bookingId: number;
  data: BookingData;
};

export async function createBooking(
  request: APIRequestContext,
  overrides?: OverrideBookingData,
): Promise<Booking> {
  const bookingData: BookingData = {
    firstname: `IhorTest${Date.now()}`,
    lastname: 'ArchakovTest1',
    totalprice: 231, // price use only number without decimals, decimals cut on booking create - need API improvement
    depositpaid: true,
    bookingdates: {
      checkin: '2020-09-24',
      checkout: '2020-09-25',
    },
    additionalneeds: 'Test Additional Need',
    ...overrides,
  };

  const createResponse = await request.post('/booking', {
    data: bookingData,
  });
  expect(createResponse.status()).toEqual(200);
  const bookingBody = await createResponse.json();
  expect(bookingBody).toHaveProperty('bookingid');
  const bookingId = bookingBody.bookingid;
  const booking = {
    bookingId,
    data: bookingData,
  };
  return booking;
}
