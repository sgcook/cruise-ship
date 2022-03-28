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
    const dover = new Port("Dover");
    const calais = new Port("Calais");

    const itinerary = new Itinerary([dover, calais]);
    
    expect(itinerary.ports).toEqual([dover, calais]);
  });
})