const Ship = require("../src/Ship.js");

describe("Ship", () =>  {
  it("has a starting port", () => {
    const ship = new Ship("Dover");

    expect(ship.startingPort).toBe("Dover");
  });
  
  it("can setSail", () => {
    const ship = new Ship("Dover");

    ship.setSail();

    expect(ship.startingPort).toBeFalsy();
  });
});