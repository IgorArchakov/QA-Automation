import { test, expect } from '../../fixtures/apiFixtures.js';

test('delete booking', async ({ request, authToken }) => {
  //create my test booking
  const createResponse = await request.post('/booking', {
    data: {
      firstname: 'IhorTest',
      lastname: 'ArchakovTest',
      totalprice: 1012,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-12-13',
        checkout: '2018-12-15',
      },
      additionalneeds: 'Big Breakfast',
    },
  });
  expect(createResponse.status()).toEqual(200); //should be 201, but in docs 200;
  const bookingDetails = await createResponse.json();
  expect(bookingDetails).toHaveProperty('bookingid');
  const bookingId = bookingDetails.bookingid;
  const deletedResponse = await request.delete(`/booking/${bookingId}`, {
    headers: { Cookie: `token=${authToken}` },
  });

  expect(deletedResponse.status()).toEqual(201); //should be 200, but in docs 201;
  const getResponse = await request.get(`/booking/${bookingId}`);
  expect(getResponse.status()).toEqual(404);
});
