import { test, expect, describe } from "@jest/globals";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";

describe("Check TicketTypeRequest", () => {
  test("Given a type and number of tickets, when called, TicketTypeRequest creates an instance of a Ticket", async () => {
    const adultTicket = new TicketTypeRequest("ADULT", 1);
    /*   console.log(adultTicket);
      console.log(adultTicket.getNoOfTickets());
      console.log(adultTicket.getTicketType()); */
    expect(adultTicket.getNoOfTickets()).toBe(1);
    expect(adultTicket.getTicketType()).toBe("ADULT");
  });

  test("Given an invalid type of ticket, when called, TicketTypeRequest throws an error", async () => {
    expect(() => {
      new TicketTypeRequest("SENIOR", 1);
    }).toThrow(Error);
  });

  test("Given an argument for noOfTickets that is not a number, when called, TicketTypeRequest throws an error", async () => {
    expect(() => {
      new TicketTypeRequest("ADULT", "1");
    }).toThrow(Error);
  });
});
