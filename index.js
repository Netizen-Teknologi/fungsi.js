/**
 * Catatan:
 * Pastikan untuk memahami setiap fungsi sebelum digunakan dan dokumentasikan penggunaan khusus atau
 * pertimbangan khusus yang perlu diperhatikan.
 */
 


   /**
 * Mengembalikan tanggal dalam format yang telah diformat.
 * @param {Date} date - Objek tanggal yang akan diformat.
 * @returns {string} Tanggal yang diformat (misalnya, "12 Desember 2023").
 */
function getFormattedDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
}

/**
 * Mengganti status keterlihatan elemen DOM antara terlihat dan tidak terlihat.
 * @param {HTMLElement} element - Elemen DOM yang akan diubah keterlihatannya.
 */
function toggleVisibility(element) {
  element.style.display = element.style.display === 'none' ? 'block' : 'none';
}

/**
 * Mengambil data dari API menggunakan Fetch API.
 * @param {string} url - URL API yang akan diambil.
 * @param {Object} options - Opsi konfigurasi untuk permintaan Fetch.
 * @returns {Promise} Promise yang dihasilkan oleh permintaan Fetch.
 */
function fetchData(url, options) {
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching data:', error.message);
    });
}

/**
 * Memeriksa apakah alamat email memiliki format yang valid.
 * @param {string} email - Alamat email yang akan diperiksa.
 * @returns {boolean} True jika format email valid, false sebaliknya.
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Menghasilkan angka acak dalam rentang tertentu.
 * @param {number} min - Nilai minimum rentang.
 * @param {number} max - Nilai maksimum rentang.
 * @returns {number} Angka acak dalam rentang yang ditentukan.
 */
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getCurrentDateTimeUTC = () => {
  const currentDateTime = new Date(); // Mendapatkan tanggal dan waktu saat ini
  const currentDateTimeUTC = currentDateTime.toISOString(); // Mengonversi ke format UTC

  return currentDateTimeUTC;
};

const checkUTC = async () => {
      
     const response = await fetch(`https://worldtimeapi.org/api/timezone/Etc/UTC`,
           {
           method: 'GET',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
           },
       })

       const res = await response.json();


       if ( res['error'] ) {
           return {
             status: '400',
             message: 'error UTC',
           }
       } else {
         const resUTC = res;
         const tz = getCurrentDateTimeUTC();

         if ( resUTC['utc_datetime'] ) {
           const UTCFormate = resUTC.utc_datetime.substring(0,19).replace('T',' ');
           const TZFormate = tz.substring(0,19).replace('T',' ');
 
           const plusUTC = addMinute(UTCFormate, 1);
           const minusUTC = minusMinute(UTCFormate, 1);
 
           if ( TZFormate >= minusUTC && TZFormate <= plusUTC ) {
               console.log('no alert is ok')
               return {
                 status: '200',
                 message: 'UTC Benar',
               }
           } else {
             return {
               status: '201',
               message: 'Pastikan pengaturan wajtu sudah benar!',
             }
           }
         } else {
           return res;
         }
       }
   }
