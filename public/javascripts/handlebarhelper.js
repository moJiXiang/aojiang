
    
    Handlebars.registerHelper("FormatDate", function(date) {
        //return phoneNumber = phoneNumber.toString();
        var y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate();
        return y + '/' + m + '/' + d;
    });

