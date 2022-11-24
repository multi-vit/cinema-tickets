import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";

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
    if (ticketTypeRequests.length > 20) {
      throw new InvalidPurchaseException(
        "You have requested too many tickets",
        "Ticket Type Request Error"
      );
    }
    if (ticketTypeRequests.length > 0) {
      if (!ticketTypeRequests.some((element) => element.type === "ADULT")) {
        throw new InvalidPurchaseException(
          "Cannot purchase tickets without an adult",
          "Ticket Type Request Error"
        );
      }
      for (let i = 0; i < ticketTypeRequests.length; i++) {
        if (!(ticketTypeRequests[i] instanceof TicketTypeRequest)) {
          throw new InvalidPurchaseException(
            "Invalid Ticket Type Request",
            "Ticket Type Request Error"
          );
        }
      }
    } else {
      throw new InvalidPurchaseException(
        "No Ticket Requests",
        "Ticket Type Request Error"
      );
    }
  }

  #purchaseTickets(accountId, ...ticketTypeRequests) {
    //Import TicketPaymentService
    // Calculate total to pay
    // Call TicketPaymentService with accountId and total to pay as arguments
  }

  #reserveSeats(accountId, ...ticketTypeRequests) {
    // Import SeatReservationService
    // Calculate seats to reserve
    // Call SeatReservationService with accountId and total seats to allocate (remember infants don't need a seat!)
  }

  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
    this.#validateAccountId(accountId);
    this.#validateTicketTypeRequests(ticketTypeRequests);
    //this.#purchaseTickets(accountId, ...ticketTypeRequests);
    //this.#reserveSeats(accountId, ...ticketTypeRequests);
  }
}
