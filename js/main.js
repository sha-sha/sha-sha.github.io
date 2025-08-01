function init() {
  document.getElementById('contact-form').reset();

  const trackingLinks = [
    { id: 'email-link', event: 'email_click', label: 'Email Link' },
    { id: 'whatsapp-link', event: 'whatsapp_click', label: 'WhatsApp Link' },
    { id: 'waze-link', event: 'waze_click', label: 'Waze Link' },
    { id: 'phone-link', event: 'phone_click', label: 'Phone Link' }
  ];

  trackingLinks.forEach(link => {
    document.getElementById(link.id).addEventListener('click', function () {
      gtag('event', link.event, {
        'event_category': 'engagement',
        'event_label': link.label,
        'value': 1
      });
    });
  });
}

init();
