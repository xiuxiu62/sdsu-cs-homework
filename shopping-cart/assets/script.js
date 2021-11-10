class Cart {
  total;
  items;
  elems;

  constructor(items) {
    total = 0;
    this.items = items;
    this.elems = {
      total: document.querySelector("#total-price"),
    };
  }

  update_total(instruction, amount) {
    try {
      switch (instruction) {
        case "ADD":
          this.total += amount;
          break;
        case "SUB":
          if (this.total - amount < 0) {
            throw new Error("Total cannot be less than 0");
          }
          this.quantity -= amount;
          break;
        default:
          throw new Error(`"${instruction}" is not a valid instruction`);
      }

      this.update_quantity_inner_html(this.quantity);
    } catch (e) {
      console.error(e);
    }
  }
}

class Item {
  quantity;
  elems;

  constructor(id) {
    this.quantity = 0;
    const parent = document.querySelector(`#${id}`);
    const price = parent.querySelector(".product-info");

    this.elems = {
      quantity: parent.querySelector(".total-quantity"),
      price: price,
      add_button: parent.querySelector("#quantity-up"),
      sub_button: parent.querySelector("#quantity-down"),
    };

    this.elems.add_button.addEventListener("click", (_) =>
      this.update_quantity("ADD")
    );

    this.elems.sub_button.addEventListener("click", (_) =>
      this.update_quantity("SUB")
    );
  }

  update_quantity(instruction) {
    try {
      switch (instruction) {
        case "ADD":
          this.quantity++;
          break;
        case "SUB":
          if (this.quantity > 0) {
            this.quantity--;
          }
          break;
        default:
          throw new Error(`"${instruction}" is not a valid instruction`);
      }

      this.update_quantity_inner_html(this.quantity);
    } catch (e) {
      console.error(e);
    }
  }

  update_quantity_inner_html(value) {
    this.elems.quantity.innerHTML = `Quantity: ${value}`;
  }
}

const limestone_context = new Item("limestone");
