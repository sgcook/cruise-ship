class Port {
  constructor(name) {
    this.name = name;
    this.ships = [];
  }
  
  addShip(ship) {
    this.ships.push(ship);
  }

  removeShip(ship) {
    this.ships = this.ships.filter(item => item !== ship);
  }
}

module.exports = Port;