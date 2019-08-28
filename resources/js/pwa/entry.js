var deferredPrompt;
var enableNotificationsButtons = document.querySelectorAll('.enable-notifications');

if(!window.Promise){
    window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(function () {
            console.log('Service worker registered!');
        })
        .catch(function(err) {
            console.log(err);
        });
}

// untuk app-install-banner
window.addEventListener('beforeinstallprompt', function (event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false;
});


// Displaying Notifications
function displayConfirmNotification() {
    // Notifications from Within the Service Worker
    if('serviceWorker' in navigator) {
        // Understanding Notifications Options
        var options = {
            body: 'You successfully subscribed to our Notification service !',
            icon: '/src/images/icons/app-icon-96x96.png',
            image: '/src/images/sf-boat.jpg',
            dir: 'ltr',
            lang: 'en-US', // BCP 47
            vibrate: [100, 50, 200],
            badge: '/src/images/icons/app-icon-96x96.png',

            // Advanced Options
            tag: 'confirm-notification',
            renotify: true,

            // Adding Actions to Notifications
            actions: [
                { action: 'confirm', title: 'Okay', icon: '/src/images/icons/app-icon-96x96.png' },
                { action: 'cancel', title: 'Cancel', icon: '/src/images/icons/app-icon-96x96.png' }
            ]
        };
        navigator.serviceWorker.ready
            .then(function(swreg) {
                swreg.showNotification('Successfully subscribed (from SW)!!', options);
            });
    }
    // new Notification('Successfully subscribed!', options);
}

// From Notifications to Push Messages
function configurePushSub() {
    if(!('serviceWorker' in navigator)) {
        return;
    }

    var reg;
    navigator.serviceWorker.ready
        .then(function(swreg) {
            console.log('swreg', swreg);
            reg = swreg;
            return swreg.pushManager.getSubscription();
        })
        .then(function(sub) {
            console.log('sub', sub);
            
            if(sub === null) {

                // Create a new subscription
                // Creating a Push Subscription

                // Storing Subscriptions
                var vapidPublicKey = 'BG87_DHv7iOud0bCXyUTbq5dGyqVhrnlQAQGkJKzO7qOfWq1TPxJxExrz6QrDW_Xom5NZAGHdMri9mSfdh9FcGw';

                var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);

                return reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidPublicKey
                });
            } else {
                // We have a subscription
                console.log('We have a subscription');
                alert('We have a subscription');
            }
        })
        .then(function(newSub) {
            console.log('newSub', newSub);

            return fetch('https://vue-http-d71e9.firebaseio.com/subscriptions.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',                    
                },
                body: JSON.stringify(newSub)
            })
        })
        .then(function(res) {
            if(res.ok) {
                displayConfirmNotification();
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}

// Requesting Permissions
function askForNotificationPermission() {
    Notification.requestPermission(function(result) {
        console.log('User Choice', result);
        if(result !== 'granted') {
            console.log('No notification permission granted!');
        } else {
            configurePushSub();
            //displayConfirmNotification();
            console.log('Notification permission granted!');
        }
    });
}

if('Notification' in window && 'serviceWorker' in navigator) {
    // askForNotificationPermission()

    // di panggil dengan Button
    // for (var i = 0; i < enableNotificationsButtons.length; i++) {
    //     enableNotificationsButtons[i].style.display = 'inline-block';
    //     enableNotificationsButtons[i].addEventListener('click', askForNotificationPermission);
    // }

    console.log("'Notification' in window && 'serviceWorker' in navigator")
    // document.getElementById('header').addEventListener('click', askForNotificationPermission);
}

