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

  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // if accountId is 0 or less throws InvalidPurchaseException
    this.#validateAccountId(accountId);
  }
}
