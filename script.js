const order = new Map();

function updateCartUI() {
  const cartBox = document.querySelector(".cart-items");
  const cartTitle = document.querySelector(".info");
  cartBox.innerHTML = ""; // Clear old items

  let totalItems = 0;
  let totalPrice = 0;

  order.forEach((value, key) => {
    if (value.quantity > 0) {
      totalItems += value.quantity;
      const itemTotal = value.quantity * value.price;
      totalPrice += itemTotal;

      const itemBox = document.createElement("div");
      itemBox.className = "cart-item";

      itemBox.innerHTML = `
        <div><strong>Order</strong>   : ${key}</div>
        <div><strong>Quantity</strong>: ${value.quantity}</div>
        <div><strong>Amount</strong>  : $${itemTotal.toFixed(2)}</div>
      `;

      cartBox.appendChild(itemBox);
    }
  });

  cartTitle.textContent = `Your Cart (${totalItems})`;

  if (totalItems > 0) {
    const totalBox = document.createElement("div");
    totalBox.className = "cart-total";
    totalBox.innerHTML = `<strong>Total:</strong> $${totalPrice.toFixed(2)}`;
    cartBox.appendChild(totalBox);
  }
}

const items = document.querySelectorAll(".item");
items.forEach(function (el) {
  const btn = el.querySelector(".btn");
  const mainbtn = el.querySelector(".main-btn");
  const plus = mainbtn.children[0];
  const count = mainbtn.querySelector(".count");
  const minus = mainbtn.children[2];

  let quantity = 0;
  let fadeTimer;

  mainbtn.style.opacity = 0;
  mainbtn.style.pointerEvents = "none";

  const name = el.querySelector(".item-content-2").textContent.trim();
  const priceText = el
    .querySelector(".item-content-3")
    .textContent.trim()
    .replace("$", "");
  const price = parseFloat(priceText);

  function updateFadeTimer() {
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(() => {
      mainbtn.style.opacity = 0;
      mainbtn.style.pointerEvents = "none";
      btn.style.opacity = 1;
      btn.style.pointerEvents = "auto";
    }, 2000);
  }

  btn.addEventListener("click", function () {
    if (order.has(name)) {
      quantity = order.get(name).quantity;
    } else {
      quantity = 1;
    }

    count.textContent = quantity;

    mainbtn.style.opacity = 1;
    mainbtn.style.pointerEvents = "auto";
    btn.style.opacity = 0;
    btn.style.pointerEvents = "none";

    order.set(name, { quantity, price });
    updateCartUI();
    updateFadeTimer();
  });

  plus.addEventListener("click", function () {
    quantity++;
    count.textContent = quantity;

    order.set(name, { quantity, price });
    updateCartUI();
    updateFadeTimer();
  });

  minus.addEventListener("click", function () {
    quantity--;

    if (quantity <= 0) {
      quantity = 0;
      count.textContent = quantity;

      mainbtn.style.opacity = 0;
      mainbtn.style.pointerEvents = "none";
      btn.style.opacity = 1;
      btn.style.pointerEvents = "auto";

      order.delete(name);
       updateCartUI();
      clearTimeout(fadeTimer);
    } else {
      count.textContent = quantity;
      order.set(name, { quantity, price });
      updateCartUI();
      updateFadeTimer();
    }
  });
});

