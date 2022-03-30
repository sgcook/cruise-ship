const Port = require("../src/Port.js");
const Ship = require("../src/Ship.js");

describe("Port", () => {
  describe("with ports and ships", () => {
    let port;
    let ship;
    let titanic;
    let queenMary;

    beforeEach(() => {
      port = new Port("Madrid");
      ship = {};
      titanic = {};
      queenMary = {};
    })
    it("new object can be instantiated", () => {
      expect(port).toBeInstanceOf(Object);
    });
  
    it("Port has a name property", () => {
      expect(port.name).toBe("Madrid");
    });
  
    it("can add a ship", () => {  
      port.addShip(ship);
  
      expect(port.ships).toContain(ship);
    });
  
    it("can remove ship", () => {
      port.addShip(titanic);
      port.addShip(queenMary);
      port.removeShip(queenMary);
  
      expect(port.ships).toEqual([titanic]);
    });
  });
})