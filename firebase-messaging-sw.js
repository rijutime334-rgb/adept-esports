importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBpNT8aGjffomVfN6oXduP02WIad9hUxvs",
  authDomain: "adept-esports-896e4.firebaseapp.com",
  databaseURL: "https://adept-esports-896e4-default-rtdb.firebaseio.com",
  projectId: "adept-esports-896e4",
  storageBucket: "adept-esports-896e4.firebasestorage.app",
  messagingSenderId: "249538850118",
  appId: "1:249538850118:web:a39ffb58dbb994028a4947"
});

var messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  var title = (payload.notification && payload.notification.title) || 'ADEPT ESPORTS';
  var options = {
    body: (payload.notification && payload.notification.body) || '',
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968756.png',
    data: { url: (payload.data && payload.data.url) || '/' }
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].url === url && 'focus' in list[i]) return list[i].focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});