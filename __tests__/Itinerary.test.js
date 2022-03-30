const Port = require("../src/Port.js")
const Itinerary = require("../src/Itinerary.js");

describe("Itinerary", () => {
  it("new object can be instantiated", () => {
    const itinerary = new Itinerary("calais");

    expect(itinerary).toBeInstanceOf(Object);
  });

  it("Itinerary has ports property", () => {
    const itinerary = new Itinerary("calais");

    expect(itinerary.ports).toBe("calais");
  });

  it("can have ports", () => {
    const dover = jest.fn();
    const calais = jest.fn();

    const itinerary = new Itinerary([dover, calais]);
    
    expect(itinerary.ports).toEqual([dover, calais]);
  });
})