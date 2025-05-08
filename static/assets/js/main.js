
//  Notifications

const notifications = document.querySelectorAll(".notification")
notifications.forEach(notif => {
  setTimeout(() => {
    notif.remove()
  }, 6000)
})


// Date Picker

const input_date = document.getElementById("input_date")
if (input_date) flatpickr("#input_date", {
  minDate: "today",
  allowInput: true,
  disableMobile: true
});


// Swiper Soon

const swiper_soon = document.getElementById("swiper_soon")
if (swiper_soon) new Swiper("#swiper_soon", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});


// Search City

let debounceTimer;

function debounce(func, delay) {
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  }
}

const input_city = document.getElementById('input_city');
const suggestions_city = document.getElementById('suggestions_city');

if (input_city) input_city.addEventListener('input', debounce(searchCity, 300))


async function searchCity() {
  suggestions_city.innerHTML = '';

  if (input_city.value.length < 3) {
    return;
  }

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input_city.value)}&format=json&addressdetails=1&limit=5&accept-language=en`);
    if (!response.ok) {
      throw new Error(`HTTP error - status: ${response.status}`);
    }
    const cities = await response.json();

    if (cities.length === 0) {
      const no_result_item = document.createElement('li');
      no_result_item.textContent = 'No results';
      suggestions_city.appendChild(no_result_item);
    } else {
      cities.forEach(city => {
        const cityName = city.address.city || city.address.town || city.address.village
        if (cityName) {
          const list_item = document.createElement('li');
          list_item.textContent = `${cityName}${city.address.state ? ' - ' + city.address.state : ''}`;
          list_item.onclick = () => selectCity(`${cityName}${city.address.state ? ' - ' + city.address.state : ''}`);
          suggestions_city.appendChild(list_item);
        }

      });
    }
  } catch (error) {
    console.error('Data retrieval error:', error);
  }

  function selectCity(city) {
    input_city.value = city;
    suggestions_city.innerHTML = '';
  }

  document.addEventListener('click', function (event) {
    const is_clicked_inside = input_city.contains(event.target) || suggestions_city.contains(event.target);

    if (!is_clicked_inside) {
      suggestions_city.innerHTML = '';
    }
  })
}