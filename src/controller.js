(function exportController() {
  function Controller(ship) {
    this.ship = ship;
    
    this.initialiseSea();
    
    document.querySelector("#sailButton").addEventListener("click", () => {
      this.setSail();
    });
  }

  Controller.prototype = {
    initialiseSea() {
      const backgrounds = [
        "./images/water0.png",
        "./images/water1.png"
      ]
      let backgroundIndex = 0;
      window.setInterval(() => {
        document.querySelector("#viewport").style.backgroundImage = `url('${backgrounds[backgroundIndex % backgrounds.length]}')`;
        backgroundIndex += 1;
      }, 1000)

    },

    renderPorts(ports) {
      const portsElement = document.querySelector("#ports");
      portsElement.style.width = "0px";

      ports.forEach((port, index) => {
        const newPortElement = document.createElement("div");
        newPortElement.className = "port";

        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;

        portsElement.appendChild(newPortElement);

        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
      });
    },

    renderShip() {
      const ship = this.ship;

      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(`[data-port-index = "${shipPortIndex}"]`);

      const shipElement = document.querySelector("#ship");
      shipElement.style.top = `${portElement.offsetTop + 32}px`;
      shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    },

    setSail() {
      const ship = this.ship;
      
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort); 
      const nextPortIndex = currentPortIndex + 1;
      const nextPortElement = document.querySelector(`[data-port-index = "${nextPortIndex}"]`);
      
      if(!nextPortElement) {
        return this.renderMessage("End of the line!");
      }

      const currentPortName = this.ship.currentPort.name;
      this.renderMessage(`Now departing ${currentPortName}!`);

      const shipElement = document.querySelector("#ship");
      
      const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);
        if(shipLeft === (nextPortElement.offsetLeft - 32)) {
          ship.setSail();
          ship.dock();
          
          const currentPort = ship.currentPort.name;
          this.renderMessage(`We are docking at ${currentPort}!`);
          clearInterval(sailInterval);
        }
        shipElement.style.left = `${shipLeft + 1}px`;
      }, 20)

    },

    renderMessage(message) {
      const viewport = document.querySelector("#viewport");
      const divMessage = document.createElement("div");
      divMessage.id = "message";
      divMessage.innerHTML = message;
      viewport.appendChild(divMessage);

      setTimeout(() => {
        viewport.removeChild(divMessage);
      }, 2000)
    },

    listPorts() {
      const ship = this.ship;
      const listedCurrentPort = document.querySelector("#listedCurrentPort");
      const listedNextPort = document.querySelector("#listedNextPort");

      const currentPortName = ship.currentPort.name;
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort); 
      const nextPortIndex = currentPortIndex + 1;
      const nextPortElement = document.querySelector(`[data-port-index = "${nextPortIndex}"]`);
      const nextPortName = nextPortElement.dataset.portName;

      listedCurrentPort.innerHTML += ` ${currentPortName}`;
      listedNextPort.innerHTML += ` ${nextPortName}`;
    }
  }

  if(typeof module !== "undefined" && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
}());
