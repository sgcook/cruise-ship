const Port = require("../src/Port.js");

describe("Port", () => {
  it("new object can be instantiated", () => {
    const port = new Port("Madrid")

    expect(port).toBeInstanceOf(Object);
  });

  it("Port has a name property", () => {
    const port = new Port("Madrid");

    expect(port.name).toBe("Madrid");
  })
})