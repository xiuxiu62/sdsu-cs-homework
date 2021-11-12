class Cookie {
  name;
  quantity;
  elems;
  middleware;
  debug;

  constructor(name, middleware, debug) {
    this.name = name;
    this.quantity = 0;
    this.middleware = middleware;
    this.debug = debug;

    switch (name) {
      case "Gingerbread":
        this.elems = this.get_elems("gb");
        break;
      case "Chocolate Chip":
        this.elems = this.get_elems("cc");
        break;
      case "Sugar Sprinkle":
        this.elems = this.get_elems("sugar");
        break;
      default:
        throw new Error("Invalid cookie name");
    }

    this.elems.add_button.addEventListener("click", this.increment_count);
    this.elems.sub_button.addEventListener("click", this.decrement_count);
  }

  get_elems = (short_name) => ({
    add_button: document.querySelector(`#add-${short_name}`),
    sub_button: document.querySelector(`#minus-${short_name}`),
    quantity: document.querySelector(`#qty-${short_name}`),
  });

  update_quantity(instruction) {
    try {
      switch (instruction) {
        case "ADD":
          this.quantity++;
          break;
        case "SUB":
          if (this.quantity <= 0) {
            throw new Error("Total cannot be less than 0");
          }

          this.quantity--;
          break;
        default:
          throw new Error(`"${instruction}" is not a valid instruction`);
      }

      this.render_quantity_elem();
      this.middleware(instruction);

      if (this.debug) {
        console.log(`${this.name} event: ${instruction} => ${this.quantity}`);
      }
    } catch (e) {
      console.error(e);
    }
  }

  increment_count = (_) => this.update_quantity("ADD");
  decrement_count = (_) => {
    if (this.quantity > 0) {
      this.update_quantity("SUB");
    }
  };

  render_quantity_elem() {
    this.elems.quantity.innerHTML = this.quantity;
  }
}

class Summary {
  quantity;
  cookies;
  elems;
  debug;

  constructor(debug = false) {
    this.quantity = 0;

    const middleware = (instruction) => this.update_quantity(instruction);
    this.cookies = {
      gingerbread: new Cookie("Gingerbread", middleware, debug),
      chocolate_chip: new Cookie("Chocolate Chip", middleware, debug),
      sugar: new Cookie("Sugar Sprinkle", middleware, debug),
    };

    this.elems = {
      quantity: document.querySelector("#qty-total"),
    };

    this.debug = debug;
  }

  update_quantity(instruction) {
    try {
      switch (instruction) {
        case "ADD":
          this.quantity++;
          break;
        case "SUB":
          if (this.quantity <= 0) {
            throw new Error("Total cannot be less than 0");
          }

          this.quantity--;
          break;
        default:
          throw new Error(`"${instruction}" is not a valid instruction`);
      }

      this.render_quantity_elem();

      if (this.debug) {
        console.log(`Summary event: ${instruction} => ${this.quantity}`);
      }
    } catch (e) {
      console.error(e);
    }
  }

  render_quantity_elem() {
    this.elems.quantity.innerHTML = this.quantity;
  }
}

const context = {
  name: "Justin Cremer",
  summary: new Summary(true),
};

// Update display name
document.getElementById("credit").textContent = `Created by ${context.name}`;
