// Date Picker

const input_date = document.getElementById("input_date")
if (input_date) flatpickr("#input_date", {
  minDate: "today",
  allowInput: true,
  disableMobile: true
});


// Duration Picker 

const input_duration = document.getElementById("input_duration")
if (input_duration) flatpickr("#input_duration", {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  time_24hr: true,
  minTime: "00:15",
  maxTime: "10:00",
  allowInput: true,
  disableMobile: true
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


// Search Address

const input_address = document.getElementById('input_address');
const suggestions_address = document.getElementById('suggestions_address');

if (input_address) input_address.addEventListener('input', debounce(searchAddress, 300))

async function searchAddress() {
  suggestions_address.innerHTML = '';

  if (input_address.value.length < 3) {
    return;
  }

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input_address.value)}&format=json&addressdetails=1&limit=5&accept-language=en`);
    if (!response.ok) {
      throw new Error(`HTTP error - status: ${response.status}`);
    }
    const addresses = await response.json();

    if (addresses.length === 0) {
      const no_result_item = document.createElement('li');
      no_result_item.textContent = 'No results';
      suggestions_address.appendChild(no_result_item);
    } else {
      addresses.forEach(address => {
        const full_address = Object.entries(address.address).filter(([key, value]) =>
          value && !['ISO3166-2-lvl4', 'ISO3166-2-lvl6', 'country_code', 'postcode'].includes(key)
        ).map(([key, value]) => value).join("-")

        const list_item = document.createElement('li');
        list_item.textContent = full_address
        list_item.onclick = () => selectAdress(full_address);
        suggestions_address.appendChild(list_item);
      });
    }
  } catch (error) {
    console.error('Data retrieval error:', error);
  }

  function selectAdress(address) {
    input_address.value = address;
    suggestions_address.innerHTML = '';
  }

  document.addEventListener('click', function (event) {
    const is_clicked_inside = input_address.contains(event.target) || suggestions_address.contains(event.target);

    if (!is_clicked_inside) {
      suggestions_address.innerHTML = '';
    }
  })
}


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


// Swiper Tour

const swiper_tour = document.getElementById("swiper_tour")
if (swiper_tour) new Swiper("#swiper_tour", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});


//  Notifications

const notifications = document.querySelectorAll(".notification")
notifications.forEach(notif => {
  setTimeout(() => {
    notif.remove()
  }, 6000)
})


// Leaflet Map Tours

const leafletLikeIcon = L.divIcon({
  className: 'custom-svg-marker',
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 55" width="35" height="55">
      <!-- Pin background (outer) -->
      <path d="M17.5 0C11.83 0 7 5.23 7 11.67 7 21.5 17.5 35 17.5 35s10.5-13.5 10.5-23.33C28 5.23 23.17 0 17.5 0z" 
            fill="#00204a;" stroke="white" stroke-width="2"/>
      <!-- Circle in the middle (inner part) -->
      <circle cx="17.5" cy="12" r="5.5" fill="white"/> <!-- Moved 'cy' to 12 -->
    </svg>
  `,
  iconSize: [35, 55],
  iconAnchor: [17.5, 55],
  popupAnchor: [0, -55]
});


const map_tours = document.querySelector("#map_tours")
if (map_tours) {
  const coordinates = JSON.parse(map_tours.dataset.coordinates)
  const ids = JSON.parse(map_tours.dataset.ids)
  const titles = JSON.parse(map_tours.dataset.titles)

  let map = L.map('map_tours', { zoomControl: false }).setView(
    [0, 0],
    2
  );

  L.control.zoom({
    position: 'bottomright'
  }).addTo(map);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 2
  }).addTo(map);

  const markers = L.markerClusterGroup();

  coordinates.forEach(function (c, index) {
    var marker = L.marker(c, { icon: leafletLikeIcon });
    marker.bindPopup(`<a href="/tour/view-tour/${ids[index]}">${titles[index]}</a>`).openPopup();
    markers.addLayer(marker);
  });

  map.addLayer(markers);
}


// Leaflet - Map Tour

const map_tour = document.querySelector("#map_tour")
if (map_tour) {
  const coordinates = JSON.parse(map_tour.dataset.coordinates)
  const address = map_tour.dataset.address
  let map = L.map('map_tour').setView(coordinates, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  const marker = L.marker(coordinates, { icon: leafletLikeIcon }).addTo(map);

  marker.bindPopup(`<b>${address}</b>`).openPopup();
}


// Map - Scroll To Bottom
const btn_scroll = document.getElementById("btn_scroll")
if (btn_scroll) {
  btn_scroll.addEventListener("click", function () {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  });
}


// Modal - Share Tour

const modal_qrcode = document.getElementById('modal_qrcode');
const btn_modal_open = document.getElementById('btn_modal_open');
const btn_modal_close = document.getElementById('btn_modal_close');
const btn_download_qrcode = document.getElementById('btn_download_qrcode');
const canvas_qrcode = document.getElementById('canvas_qrcode');

if (modal_qrcode && btn_modal_open && btn_modal_close && canvas_qrcode && btn_download_qrcode) {
  const ctx = canvas_qrcode.getContext('2d');
  const qrCodeImageUrl = canvas_qrcode.dataset.qrcode;
  btn_modal_open.addEventListener('click', () => {
    modal_qrcode.showModal();
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      ctx.clearRect(0, 0, canvas_qrcode.width, canvas_qrcode.height);
      ctx.drawImage(img, 0, 0, canvas_qrcode.width, canvas_qrcode.height);
    };
    img.src = qrCodeImageUrl;
  });

  btn_modal_close.addEventListener('click', () => {
    modal_qrcode.close();
  });

  modal_qrcode.addEventListener('click', (event) => {
    if (event.target == modal_qrcode) {
      modal_qrcode.close();
    }
  });

  btn_download_qrcode.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas_qrcode.toDataURL('image/png');
    link.download = 'qrcode.png';
    link.click();
  });
}