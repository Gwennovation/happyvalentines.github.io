document.addEventListener("DOMContentLoaded", () => {
    // Scroll-triggered card flip logic
    const cards = document.querySelectorAll('.card .inner');
    let lastFlippedCard = null;
  
    window.addEventListener('scroll', () => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
          card.style.transform = 'rotateY(180deg)';
          if (lastFlippedCard && lastFlippedCard !== card) {
            lastFlippedCard.style.transform = 'rotateY(360deg)';
          }
          lastFlippedCard = card;
        }
      });
    });
  
   // Handle "Yes" button click
  const yesButton = document.getElementById('yesButton');
  yesButton.addEventListener('click', () => {


    // Redirect to proposal_date.html
    window.location.href = 'proposal_date.html';
  });

  // Handle "No" button click
  const noButton = document.getElementById('noButton');
  noButton.addEventListener('click', () => {
    alert("Aww, that’s okay. Maybe next time! 💔");
  });
});

const currentDate = document.querySelector(".current-date");
  const daysTag = document.querySelector(".days");
  const prevNextIcons = document.querySelectorAll(".icons span");

  let date = new Date();
  let currYear = date.getFullYear();
  let currMonth = date.getMonth();

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
    let lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    // Add previous month's dates
    for (let i = firstDayOfMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateOfPrevMonth - i + 1}</li>`;
    }

    // Add current month's dates
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
          ? "active"
          : "";
      liTag += `<li class="${isToday}">${i}</li>`;
    }

    // Add next month's dates
    for (let i = lastDayOfMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

    // Make days clickable
    document.querySelectorAll(".days li:not(.inactive)").forEach(day => {
      day.addEventListener("click", () => {
        document.querySelector(".days li.active")?.classList.remove("active");
        day.classList.add("active");
      });
    });
  };

  renderCalendar();

  prevNextIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

      if (currMonth < 0 || currMonth > 11) {
        date = new Date(currYear, currMonth);
        currYear = date.getFullYear();
        currMonth = date.getMonth();
      } else {
        date = new Date();
      }
      renderCalendar();
    });
  });

  // Handle location selection
  document.querySelectorAll(".location-button").forEach(button => {
    button.addEventListener("click", () => {
      const selectedDate = document.querySelector(".days li.active")?.innerText;
      const selectedLocation = button.getAttribute("data-location");

      if (!selectedDate) {
        alert("Please select a date first.");
        return;
      }

      alert(`You chose:\nDate: ${selectedDate} ${months[currMonth]}, ${currYear}\nLocation: ${selectedLocation}`);
    });
  });


  