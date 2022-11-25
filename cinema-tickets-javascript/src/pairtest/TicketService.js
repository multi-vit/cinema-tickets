import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

const TICKETPRICES = {
  ADULT: 20,
  CHILD: 10,
  INFANT: 0,
};
export default class TicketService {
  #validateAccountId(accountId) {
    if (accountId < 1) {
      throw new InvalidPurchaseException(
        "Invalid Account ID",
        "Account ID Error"
      );
    }
  }

  #validateTicketTypeRequests(ticketTypeRequests) {
    // Ensure there aren't more than 20 tickets requested
    if (ticketTypeRequests.length > 20) {
      throw new InvalidPurchaseException(
        "You have requested too many tickets",
        "Ticket Type Request Error"
      );
    }
    // If there are ticket requests
    if (ticketTypeRequests.length > 0) {
      // Check all tickets are valid TicketTypeRequests
      for (let i = 0; i < ticketTypeRequests.length; i++) {
        if (!(ticketTypeRequests[i] instanceof TicketTypeRequest)) {
          throw new InvalidPurchaseException(
            "Invalid Ticket Type Request",
            "Ticket Type Request Error"
          );
        }
      }
      // Check an Adult ticket is always present
      if (
        !ticketTypeRequests.some(function (element) {
          return element.getTicketType() === "ADULT";
        })
      ) {
        throw new InvalidPurchaseException(
          "Cannot purchase tickets without an adult",
          "Ticket Type Request Error"
        );
      }
    }
    // Throw an error if there are no ticket requests
    else {
      throw new InvalidPurchaseException(
        "No Ticket Requests",
        "Ticket Type Request Error"
      );
    }
  }

  #purchaseTickets(accountId, ticketTypeRequests) {
    // Calculate total to pay
    let paymentTotal = 0;
    for (let i = 0; i < ticketTypeRequests.length; i++) {
      const currentTicketRequest = ticketTypeRequests[i];
      const currentTicketType = currentTicketRequest.getTicketType();
      const currentNoOfTickets = currentTicketRequest.getNoOfTickets();
      paymentTotal += TICKETPRICES[currentTicketType] * currentNoOfTickets;
    }
    // Call TicketPaymentService with accountId and total to pay as arguments
    const paymentService = new TicketPaymentService();
    const payment = paymentService.makePayment(accountId, paymentTotal);
    return paymentTotal;
  }

  #reserveSeats(accountId, ticketTypeRequests) {
    // Calculate seats to reserve (remember infants don't need a seat!)
    let totalSeats = 0;
    for (let i = 0; i < ticketTypeRequests.length; i++) {
      const currentTicketRequest = ticketTypeRequests[i];
      if (currentTicketRequest.getTicketType() === "INFANT") {
        continue;
      } else {
        totalSeats += currentTicketRequest.getNoOfTickets();
      }
    }
    // Call SeatReservationService with accountId and total seats to allocate
    const seatsService = new SeatReservationService();
    const seats = seatsService.reserveSeat(accountId, totalSeats);
    return totalSeats;
  }

  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.#validateAccountId(accountId);
    this.#validateTicketTypeRequests(ticketTypeRequests);
    // Build and return a response for testing purposes - this may not be included in a real life implementation
    const payment = this.#purchaseTickets(accountId, ticketTypeRequests);
    const seats = this.#reserveSeats(accountId, ticketTypeRequests);
    const response = { payment: payment, seats: seats };
    return response;
  }
}
