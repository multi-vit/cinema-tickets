import { test, expect, describe } from "@jest/globals";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";
import TicketService from "../src/pairtest/TicketService.js";

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

test("Given an account ID below 1, when called, TicketService throws an error", async () => {
  const tickets = new TicketService();
  expect(() => {
    tickets.purchaseTickets(0);
  }).toThrow(new Error("Invalid Account ID"));
});

test("Given an invalid ticketTypeRequest, when called, TicketService throws an error", async () => {
  const tickets = new TicketService();
  expect(() => {
    tickets.purchaseTickets(1, { type: "ADULT", NoOfTickets: 1 });
  }).toThrow(new Error("Invalid Ticket Type Request"));
});

test("Given too many ticketTypeRequests, when called, TicketService throws an error", async () => {
  let ticketRequests = [];
  for (let i = 0; i < 21; i++) {
    const adultTicket = new TicketTypeRequest("ADULT", 1);
    ticketRequests.push(adultTicket);
  }
  const tickets = new TicketService();
  expect(() => {
    tickets.purchaseTickets(1, ...ticketRequests);
  }).toThrow(new Error("You have requested too many tickets"));
});

test("Given no ticketTypeRequests, when called, TicketService throws an error", async () => {
  const tickets = new TicketService();
  expect(() => {
    tickets.purchaseTickets(1);
  }).toThrow(new Error("No Ticket Requests"));
});
