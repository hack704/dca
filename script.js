function openLocation(campus) {
    const locations = {
        krishnanagar: 'https://maps.app.goo.gl/5ZBpV78B5nqGtfhB8', 
        banthra: 'https://maps.app.goo.gl/KpYgzcPZZxaX1Kcm9' 
    };
    
    if (locations[campus]) {
        window.open(locations[campus], '_blank');
    }
}


