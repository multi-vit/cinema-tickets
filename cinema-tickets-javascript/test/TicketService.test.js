import { test, expect, describe } from "@jest/globals";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";
import TicketService from "../src/pairtest/TicketService.js";

describe("Account ID Validation in TicketService", () => {
  test("Given an account ID that is not a number, when called, TicketService throws an error", async () => {
    const tickets = new TicketService();
    expect(() => {
      tickets.purchaseTickets("bob");
    }).toThrowError("Account ID must be an integer");
  });
  test("Given an account ID below 1, when called, TicketService throws an error", async () => {
    const tickets = new TicketService();
    expect(() => {
      tickets.purchaseTickets(0);
    }).toThrowError("Invalid Account ID");
  });
});
describe("Check ticketTypeRequest in TicketService", () => {
  test("Given an invalid ticketTypeRequest, when called, TicketService throws an error", async () => {
    const tickets = new TicketService();
    expect(() => {
      tickets.purchaseTickets(1, { type: "ADULT", noOfTickets: 1 });
    }).toThrowError("Invalid Ticket Type Request");
  });
});

describe("Check number of ticket requests in TicketService", () => {
  test("Given too many ticketTypeRequests, when called, TicketService throws an error", async () => {
    let ticketRequests = [];
    for (let i = 0; i < 21; i++) {
      const adultTicket = new TicketTypeRequest("ADULT", 1);
      ticketRequests.push(adultTicket);
    }
    const tickets = new TicketService();
    expect(() => {
      tickets.purchaseTickets(1, ...ticketRequests);
    }).toThrowError("You have requested too many tickets");
  });

  test("Given no ticketTypeRequests, when called, TicketService throws an error", async () => {
    const tickets = new TicketService();
    expect(() => {
      tickets.purchaseTickets(1);
    }).toThrowError("No Ticket Requests");
  });
});

describe("Check request includes an adult ticket in TicketService", () => {
  test("Given ticketTypeRequests that don't include ADULT, when called, TicketService throws an error", async () => {
    const childTicket = new TicketTypeRequest("CHILD", 1);
    const tickets = new TicketService();
    expect(() => {
      tickets.purchaseTickets(1, childTicket);
    }).toThrowError("Cannot purchase tickets without an adult");
  });
});

describe("Check call to TicketPaymentService", () => {
  test("Given a valid account ID and ticketTypeRequest of 1 Adult, when called, TicketPaymentService returns correct total", async () => {
    const adultTicket = new TicketTypeRequest("ADULT", 1);
    const tickets = new TicketService();
    const response = tickets.purchaseTickets(1, adultTicket);
    expect(response.payment).toBe(20);
  });
  test("Given a valid account ID and ticketTypeRequest of 1 Adult and 1 Child, when called, TicketPaymentService returns correct total", async () => {
    const adultTicket = new TicketTypeRequest("ADULT", 1);
    const childTicket = new TicketTypeRequest("CHILD", 1);
    const tickets = new TicketService();
    const response = tickets.purchaseTickets(1, adultTicket, childTicket);
    expect(response.payment).toBe(30);
  });
  test("Given a valid account ID and ticketTypeRequest of 2 Adults and 1 Infant, when called, TicketPaymentService returns correct total", async () => {
    const adultTicket = new TicketTypeRequest("ADULT", 2);
    const infantTicket = new TicketTypeRequest("INFANT", 1);
    const tickets = new TicketService();
    const response = tickets.purchaseTickets(1, adultTicket, infantTicket);
    expect(response.payment).toBe(40);
  });
  test("Given a valid account ID and ticketTypeRequest of random number of Adults and Children, when called, TicketPaymentService returns correct total", async () => {
    let randomNumberforAdult = Math.floor(Math.random() * 10 + 1);
    let randomNumberforChild = Math.floor(Math.random() * 10 + 1);
    const adultTicket = new TicketTypeRequest("ADULT", randomNumberforAdult);
    const infantTicket = new TicketTypeRequest("CHILD", randomNumberforChild);
    const tickets = new TicketService();
    const response = tickets.purchaseTickets(1, adultTicket, infantTicket);
    expect(response.payment).toBe(
      20 * randomNumberforAdult + 10 * randomNumberforChild
    );
  });
});

describe("Check call to SeatReservationService", () => {
  test("Given a valid account ID and ticketTypeRequest of 1 Adult, when called, TicketPaymentService returns correct total", async () => {
    const adultTicket = new TicketTypeRequest("ADULT", 1);
    const tickets = new TicketService();
    const response = tickets.purchaseTickets(1, adultTicket);
    expect(response.seats).toBe(1);
  });
  test("Given a valid account ID and ticketTypeRequest of 2 Adult and 1 Child, when called, TicketPaymentService returns correct total", async () => {
    const adultTicket = new TicketTypeRequest("ADULT", 2);
    const childTicket = new TicketTypeRequest("CHILD", 1);
    const tickets = new TicketService();
    const response = tickets.purchaseTickets(1, adultTicket, childTicket);
    expect(response.seats).toBe(3);
  });
  test("Given a valid account ID and ticketTypeRequest of 2 Adults and 1 Infant, when called, TicketPaymentService returns correct total", async () => {
    const adultTicket = new TicketTypeRequest("ADULT", 2);
    const infantTicket = new TicketTypeRequest("INFANT", 1);
    const tickets = new TicketService();
    const response = tickets.purchaseTickets(1, adultTicket, infantTicket);
    expect(response.seats).toBe(2);
  });
  test("Given a valid account ID and ticketTypeRequest of random number of Adults and Children, when called, TicketPaymentService returns correct total", async () => {
    let randomNumberforAdult = Math.floor(Math.random() * 10 + 1);
    let randomNumberforChild = Math.floor(Math.random() * 10 + 1);
    const adultTicket = new TicketTypeRequest("ADULT", randomNumberforAdult);
    const infantTicket = new TicketTypeRequest("CHILD", randomNumberforChild);
    const tickets = new TicketService();
    const response = tickets.purchaseTickets(1, adultTicket, infantTicket);
    expect(response.seats).toBe(randomNumberforAdult + randomNumberforChild);
  });
});
