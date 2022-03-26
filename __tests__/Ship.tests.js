const Ship = require("../src/Ship.js");
const Port = require("../src/Port.js");

describe("Ship", () =>  {
  it("has a starting port", () => {
    const port = new Port("Dover");
    const ship = new Ship(port);

    expect(ship.currentPort).toBe(port);
  });
  
  it("can setSail", () => {
    const port = new Port("Dover");
    const ship = new Ship(port);

    ship.setSail();

    expect(ship.startingPort).toBeFalsy();
  });

  it("can dock at a different port", () => {
    const dover = new Port("Dover");
    const ship = new Ship(dover);

    const calais = new Port("Calais");
    ship.dock(calais);

    expect(ship.currentPort).toBe(calais);
  })
});