const Port = require("../src/Port.js");
const Ship = require("../src/Ship.js");

describe("Port", () => {
  it("new object can be instantiated", () => {
    const port = new Port("Madrid");

    expect(port).toBeInstanceOf(Object);
  });

  it("Port has a name property", () => {
    const port = new Port("Madrid");

    expect(port.name).toBe("Madrid");
  });

  it("can add a ship", () => {
    const port = new Port("Madrid");
    const ship = {};

    port.addShip(ship);

    expect(port.ships).toContain(ship);
  });

  it("can remove ship", () => {
    const port = new Port("Madrid");
    const titanic = {};
    const queenMary = {};

    port.addShip(titanic);
    port.addShip(queenMary);
    port.removeShip(queenMary);

    expect(port.ships).toEqual([titanic]);
  });
})