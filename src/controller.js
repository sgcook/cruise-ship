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

      while(portsElement.firstChild) {
        portsElement.removeChild(portsElement.firstChild)
      }

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
      if(portElement) {
        shipElement.style.top = `${portElement.offsetTop + 32}px`;
        shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    
      }
    },

    setSail() {
      const ship = this.ship;
      
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort); 
      const nextPortIndex = currentPortIndex + 1;
      const nextPortElement = document.querySelector(`[data-port-index = "${nextPortIndex}"]`);
      
      if(!nextPortElement) {
        return this.renderMessage("End of the line!");
      }

      const currentPortName = ship.currentPort.name;
      this.renderMessage(`Now departing ${currentPortName}!`);

      const shipElement = document.querySelector("#ship");

      const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left || 0, 10);
        if(shipLeft === (nextPortElement.offsetLeft - 32)) {
          ship.setSail();
          ship.dock();
          
          const currentPort = ship.currentPort.name;
          this.renderMessage(`We are docking at ${currentPort}!`);
          this.listPorts();
          clearInterval(sailInterval);
        }
        shipElement.style.left = `${shipLeft + 1}px`;
        const viewport = document.querySelector("#viewport");
        viewport.scrollTo({
          top: 0,
          left: shipLeft - 20,
          behavior: "auto"
        });
        
        const messageElement = document.querySelector("#message");
        if (messageElement) {
          messageElement.style.left = `${viewport.scrollLeft}px`;
        }
      }, 20)
    },

    renderMessage(message) {
      const viewport = document.querySelector("#viewport");
      const messageElement = document.createElement("div");

      messageElement.id = "message";
      messageElement.innerHTML = message;
      viewport.appendChild(messageElement);

      setTimeout(() => {
        viewport.removeChild(messageElement);
      }, 2000)
    },

    listPorts() {
      const ship = this.ship;
      const listedCurrentPort = document.querySelector("#listedCurrentPort");
      const listedNextPort = document.querySelector("#listedNextPort");

      let currentPortName;
      let currentPortIndex;

      if(ship.currentPort) {
        currentPortName = ship.currentPort.name;
        currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      }

      const nextPortIndex = currentPortIndex + 1;

      const nextPortElement = document.querySelector(`[data-port-index = "${nextPortIndex}"]`);

      const nextPortName = !nextPortElement ? "no more ports!" : nextPortElement.dataset.portName;

      listedCurrentPort.innerHTML = `Current Port: ${!currentPortName ? "no port!" : currentPortName}`;
      listedNextPort.innerHTML = `Next Port: ${nextPortName}`;
    }
  }

  if(typeof module !== "undefined" && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
}());
