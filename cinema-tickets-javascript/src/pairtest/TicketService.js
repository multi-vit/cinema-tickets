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
    console.log(`ticket requests length is: ${ticketTypeRequests.length}`);
    if (ticketTypeRequests.length > 20) {
      throw new InvalidPurchaseException(
        "You have requested too many tickets",
        "Ticket Type Request Error"
      );
    }
    if (ticketTypeRequests.length > 0) {
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

  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // if accountId is 0 or less throws InvalidPurchaseException
    this.#validateAccountId(accountId);
    this.#validateTicketTypeRequests(ticketTypeRequests);
  }
}
