<!-- <script src="/wp-content/themes/sfl-worldwide/js/jquery-min.js"></script>  -->
<script>
    console.log("IN FILES")
    

var container = document.getElementsByClassName("item-to-move");

for (var i = 0; i < container.length; i++) {
  //For each element in the container array, add an onclick event.
  container[i].onclick = function(event) {
    this.classList.toggle('selected');
  }
}


// if (ship_from != '' && ship_to != '') {

//     setTimeout(() => {
//         jQuery("#Country-drop-default-us option:selected").text(ship_from);
//         jQuery("#Country-drop-to option:selected").text(ship_to);
//         // jQuery("#Country-drop-default-us option:contains(" + ship_from + ")").attr('selected', 'selected');
//         jQuery("#Country-drop-to option:contains(" + ship_to + ")").attr('selected', 'selected');
//         // jQuery('input:checkbox').click(function() {
//         //     jQuery('input:checkbox').not(type_document).prop('checked', true);
//         // });
//         jQuery("input[type='checkbox'][value='" + type_document + "']").prop("checked", true);
//         jQuery("input[type='checkbox'][value='" + type_document + "']").trigger('change');
//         jQuery("#ContactNameShip").val(name_ship);
//         jQuery("#PhoneNumberShip").val(phone_number);
//         jQuery("#emailShip").val(Email_Id);
//     });
// } else {

//     jQuery("#Country-drop-default-us").val();
//     jQuery("#Country-drop-to").val();
// }

</script>
<script>
var countryList = [];
var FromCity = [];
var ToCity = [];
var CheckBox = [];
var tracknum = '';
window.onmessage = function(e) {
    // debugger;
    if (e.origin === "https://www.sflworldwide.com")
        return false
    if (e.data === '') {
        localStorage.removeItem('currentLoginData');
    } else if (e.origin === "https://hub.sflworldwide.com") {
        localStorage.setItem("currentLoginData", e.data);
    }
}


jQuery(document).ready(function() {

    // let myAccount = JSON.parse(localStorage.getItem("currentLoginData"));
    // if (myAccount !== null && myAccount !== undefined && myAccount !== "") {
    //     document.getElementById("login").style.display = "none";
    //     document.getElementById("myaccount").style.display = "block";
    // } else {
    //     document.getElementById("login").style.display = "block";
    //     document.getElementById("myaccount").style.display = "none";
    // }

    var formData = {};

    let params = (new URL(document.location)).searchParams;
    let countries_from = params.get("countries-from");
    let countries_to = params.get("countries-to");
    //let countries_to = params.get("countries-from");


    let FullName = params.get("FullName");
    let Email = params.get("Email");
    let phone_number = params.get("phone_number");

    jQuery("#ContactName").val(FullName);
    jQuery("#PhoneNumber").val(phone_number);
    jQuery("#email").val(Email);
        var queryString = new Array();
        if (queryString.length == 0) {
            if (window.location.search.split('?').length > 1) {
                var params2 = window.location.search.split('?')[1].split('&');
                for (var i = 0; i < params2.length; i++) {
                    var key = params2[i].split('=')[0];
                    var value = decodeURIComponent(params2[i].split('=')[1]);
                    queryString[key] = value;
                }
            }
        }
        // if (queryString["package"] != null ) {
        //     var packageDetailsArr = queryString["package"].split(',');
            
        //     for(var i=0; i<packageDetailsArr.length; i++) {
        //             jQuery("input[name='PackageType[]']").each(function() {
        //             if(packageDetailsArr[i] == jQuery(this).val()){
        //                 jQuery(this).attr("checked","checked");
        //                 jQuery(this).attr("value",packageDetailsArr[i]);
        //                 jQuery(this).trigger('change');
        //             }
        //         })
        //     }
        // }

        // if(queryString["trackingnumber"] != null || queryString["trackingnumber"] != undefined) {
        //     tracknum = queryString["trackingnumber"];
        //     // jQuery("#track_shipment").val(tracknum);
        //     // document.getElementById("track_shipment_btn").click();
        //     TrackingNumberDetails();
        // }

        var from_country_home = queryString["fromcountry"];
        var to_country_home = queryString["tocountry"];
        

    jQuery.ajax({
        type: "GET",
        url: 'https://hubapi.sflworldwide.com/location/getCountryList',
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(msg) {
            console.log("IN data")
            countryList = msg.data;
            jQuery('#ToCountry').append(jQuery('<option>').val("-1").text("Select A Country"));
            jQuery('#FromCountry').append(jQuery('<option>').val("-1").text("Select A Country"));

            // ===================== FOR NEW LANDING =========================================
            jQuery('#fromCountry_home').append(jQuery('<option>').val("-1").text("Select A Country"));
            jQuery('#toCountry_home').append(jQuery('<option>').val("-1").text("Select A Country"));


            jQuery('#sf_from_country1').append(jQuery('<option>').val("-1").text("Select A Country"));
            jQuery('#sf_to_country1').append(jQuery('<option>').val("-1").text("Select A Country"));

            jQuery('#fromCountryUS').append(jQuery('<option>').val("-1").text("Select A Country"));
            jQuery('#toCountryDefault').append(jQuery('<option>').val("-1").text("Select A Country"));
            // ===================== FOR NEW LANDING =========================================
            // fromCountry_home
            for (var i = 0; i < countryList.length; i++) {
                jQuery('#ToCountry').append(jQuery('<option>').val(countryList[i].CountryID).text(
                    countryList[i].CountryName));
                    jQuery('#sf_to_country1').append(jQuery('<option>').val(countryList[i].CountryID).text(
                    countryList[i].CountryName));
                jQuery('#sf_from_country1').append(jQuery('<option>').val(countryList[i].CountryID).text(
                    countryList[i].CountryName));
                jQuery('#toCountry_home').append(jQuery('<option>').val(countryList[i].CountryID).text(
                    countryList[i].CountryName));
                jQuery('#FromCountry').append(jQuery('<option>').val(countryList[i].CountryID).text(
                    countryList[i].CountryName));
                jQuery('#fromCountry_home').append(jQuery('<option>').val(countryList[i].CountryID).text(
                    countryList[i].CountryName));
                jQuery('#blogFromCountry').append(jQuery('<option>').val(countryList[i].CountryID).text(
                    countryList[i].CountryName));
                jQuery('#fromCountryUS').append(jQuery('<option>').val(countryList[i].CountryID).text(
                    countryList[i].CountryName));
                jQuery('#toCountryDefault').append(jQuery('<option>').val(countryList[i].CountryID).text(
                    countryList[i].CountryName));
                jQuery('#blogToCountry').append(jQuery('<option>').val(countryList[i].CountryID).text(
                    countryList[i].CountryName));
                    
            }
            

            
            
                jQuery('#fromCountry_home').val(202);
            // }

            jQuery('#fromCountryUS').val(202);
            jQuery('#sf_from_country1').val(202);
            // jQuery('#toCountryDefault').val(-1);
            jQuery('#blogFromCountry').val(89);
            jQuery('#blogToCountry').val(202);
            console.log("In Data Values.....")
            var selectedToCountry_home = '';
            if (jQuery("body").hasClass("page-id-3860")) { // for SSHIPPING TO AUSTRALIA
                selectedToCountry_home = 12;
            } else if(jQuery("body").hasClass("page-id-3862")) {// for SSHIPPING TO CANADA
                selectedToCountry_home = 37;
            }else if(jQuery("body").hasClass("page-id-4110")) {// for SSHIPPING TO INDIA
                selectedToCountry_home = 89;
            }else if(jQuery("body").hasClass("page-id-3864")) {// for SSHIPPING TO NEPAL
                selectedToCountry_home = 137;
            }else if(jQuery("body").hasClass("page-id-3598")) {// for SSHIPPING TO PAKISTAN
                selectedToCountry_home = 150;
            }else if(jQuery("body").hasClass("page-id-3866")) {// for SSHIPPING TO UAE
                selectedToCountry_home = 200;
            }else if(jQuery("body").hasClass("page-id-3868")) {// for SSHIPPING TO UK
                selectedToCountry_home = 201;
            }else if(jQuery("body").hasClass("page-id-8338")){ // for Indonesia
                selectedToCountry_home = 90
            }else if(jQuery("body").hasClass("page-id-8052")){ // for Kenya
                selectedToCountry_home = 101
            }else if(jQuery("body").hasClass("page-id-8119")){ // for nigeria
                selectedToCountry_home = 144
            }else if(jQuery("body").hasClass("page-id-8220")){ // for South Africa
                selectedToCountry_home = 176
            }else if(jQuery("body").hasClass("page-id-7066")){ // for Mexico
                selectedToCountry_home = 126
            }
            else if(jQuery("body").hasClass("page-id-7153")){ // for china
                selectedToCountry_home = 43
            }

            console.log("toCountry_home = ",selectedToCountry_home)
            if (jQuery("body").hasClass("page-id-8959")) { // for SSHIPPING TO AUSTRALIA
                // selectedToCountry_home = 12;
                jQuery('#fromCountry_home').val(37);
                jQuery('#toCountry_home').val(89);
            }

            if(selectedToCountry_home !=""){
                jQuery('#toCountry_home').val(selectedToCountry_home);
            }
            

            //============ FROM COUNTRY ================================================
            let FromCountryID = countryList.find(x => x.CountryName == countries_from)
            
            if (FromCountryID != undefined && FromCountryID != null) {
                jQuery('#FromCountry').val(FromCountryID.CountryID);
            } else if(from_country_home != '' && from_country_home != undefined) {
                jQuery('#FromCountry').val(from_country_home);
            } 
             else {
                jQuery('#FromCountry').val(202);
            }

            //============ TO COUNTRY ================================================
            let ToCountryID = countryList.find(x => x.CountryName == countries_to)
            if (ToCountryID != undefined && ToCountryID != null) {
                jQuery('#ToCountry').val(ToCountryID.CountryID);
            } else if(to_country_home != '' && to_country_home !=undefined ) {
                jQuery('#ToCountry').val(to_country_home);
            } else {
                jQuery('#ToCountry').val(-1);
                jQuery("#ToZipCode").prop("disabled", true);
            }
            
            if (jQuery('#ToCountry').val() != -1) {
                jQuery("#ToCountry").trigger('change');
                jQuery("#FromCountry").trigger('change');
            }
            
            if(queryString["fullname"] != null && queryString["email"] != null) {
                var blogFromcntry = queryString["fromcountry"];
                var blogTocntry = queryString["tocountry"];
                var blogName = queryString["fullname"];
                var blogEmail = queryString["email"];
                var blogPhone = queryString["phone"];

                jQuery('#FromCountry').val(blogFromcntry);
                jQuery('#ToCountry').val(blogTocntry);
                jQuery("#ContactNameShip").val(blogName);
                jQuery("#PhoneNumberShip").val(blogPhone);
                jQuery("#emailShip").val(blogEmail);
            }

            // if(jQuery('#fromCountry_home').val() != -1) {
            //     jQuery("#fromCountry_home").trigger('change');
            //     jQuery("#toCountry_home").trigger('change');
            // }
        },
        error: function(error) {
            console.log("Error...", error);
        }
    });

    // for(var i = 1; i <= 25 ; i++){
    //     jQuery('#no_pack0').append(jQuery('<option>').val(i).text(i));
    // }
    // jQuery('#no_pack0').val(1);


});
</script>

<script>

// jQuery("#trackButton").click(function () {
//     tracknum = jQuery("#track_input").val();
//     TrackingNumberDetails();
// })

var getResult = [];

jQuery("#fromCountry_home").change(function() { //required code
    if(jQuery('#fromCountry_home').val() != '-1'){
        jQuery("#fromcountryError").hide();
    }
});

jQuery('body').on('click', function (e) { //required code
    setTimeout(() => {
        jQuery("#boxError").hide();
        jQuery("#tocountryError").hide();
        jQuery("#fromcountryError").hide();
    },5000);
});

// jQuery(document).bind('click', function(e){
//     // jQuery(this).fadeOut(300);
//     jQuery("#boxError").hide();
// });

jQuery("#toCountry_home").change(function() { //required code
    if(jQuery('#toCountry_home').val() != '-1'){
        jQuery("#tocountryError").hide();
    }
});

jQuery('#package_content').click(function(event) { //required code
    if(jQuery("#envelope").hasClass('selected') || 
       jQuery("#box").hasClass('selected') || 
       jQuery("#television").hasClass('selected') || 
       jQuery("#furniture").hasClass('selected') || 
       jQuery("#auto").hasClass('selected')){
           jQuery("#boxError").hide();
    }
});

//  ================ required code==============================
var selectedFromCountry_home = '';
var selectedToCountry_home = '';

jQuery("#startAQuote_home").click(function(event) {
    console.log("IN quote")
    debugger
    var packageArr = [];
    
    var foo = jQuery('#sf_service_list').val(); 

    if(jQuery('#sf_service_list').val()){
        for (let index = 0; index < foo.length; index++) {
            packageArr.push(foo[index])
            
        }
    }
    console.log("Values are = " ,packageArr);

    jQuery('#package_content').find('a').each(function() {
        if(jQuery(this).hasClass('selected')) {
            packageArr.push(jQuery(this).attr('value'));
        }
    });


    selectedFromCountry_home = jQuery('#fromCountry_home').val();
    selectedToCountry_home = jQuery('#toCountry_home').val();

    if(jQuery("#envelope").hasClass('selected') || jQuery("#box").hasClass('selected') || jQuery("#television").hasClass('selected') || jQuery("#furniture").hasClass('selected') || jQuery("#auto").hasClass('selected')){
        if(selectedFromCountry_home == undefined && selectedToCountry_home == undefined){
            selectedFromCountry_home = 202;
            
            if (jQuery("body").hasClass("page-id-3860")) { // for SSHIPPING TO AUSTRALIA
                selectedToCountry_home = 12;
            } else if(jQuery("body").hasClass("page-id-3862")) {// for SSHIPPING TO CANADA
                selectedToCountry_home = 37;
            }else if(jQuery("body").hasClass("page-id-4110")) {// for SSHIPPING TO INDIA
                selectedToCountry_home = 89;
            }else if(jQuery("body").hasClass("page-id-3864")) {// for SSHIPPING TO NEPAL
                selectedToCountry_home = 137;
            }else if(jQuery("body").hasClass("page-id-3598")) {// for SSHIPPING TO PAKISTAN
                selectedToCountry_home = 150;
            }else if(jQuery("body").hasClass("page-id-3866")) {// for SSHIPPING TO UAE
                selectedToCountry_home = 200;
            }else if(jQuery("body").hasClass("page-id-3868")) {// for SSHIPPING TO UK
                selectedToCountry_home = 201;
            }else if(jQuery("body").hasClass("page-id-8338")){ // for Indonesia
                selectedToCountry_home = 90
            }else if(jQuery("body").hasClass("page-id-8052")){ // for Kenya
                selectedToCountry_home = 101
            }else if(jQuery("body").hasClass("page-id-8119")){ // for nigeria
                selectedToCountry_home = 144
            }else if(jQuery("body").hasClass("page-id-8220")){ // for South Africa
                selectedToCountry_home = 176
            }else if(jQuery("body").hasClass("page-id-7066")){ // for Mexico
                selectedToCountry_home = 126
            }
            // var new_home_url = "https://ratesuat.sflworldwide.com/?package=" + encodeURIComponent(packageArr) + "&fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
            var new_home_url = "https://rates.sflworldwide.com/?package=" + encodeURIComponent(packageArr) + "&fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
            window.location.href = new_home_url;
        } else {
            if((jQuery('#fromCountry_home').val() == '-1') && (jQuery('#toCountry_home').val() == '-1')){
                jQuery("#fromcountryError").show();
                jQuery("#tocountryError").show();
            } else {
                if(jQuery('#fromCountry_home').val() == '-1'){
                    jQuery("#fromcountryError").show();
                } else if(jQuery('#toCountry_home').val() == '-1'){
                    jQuery("#tocountryError").show();
                }else {
                    // var new_home_url = "https://ratesuat.sflworldwide.com/?package=" + encodeURIComponent(packageArr) + "&fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
                    var new_home_url = "https://rates.sflworldwide.com/?package=" + encodeURIComponent(packageArr) + "&fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
                    window.location.href = new_home_url;
                } 
            }
        }
        
    }else if(jQuery('#sf_service_list').val()){

        if((jQuery('#fromCountry_home').val() == '-1') && (jQuery('#toCountry_home').val() == '-1')){
                jQuery("#fromcountryError").show();
                jQuery("#tocountryError").show();
        } else {
            if(jQuery('#fromCountry_home').val() == '-1'){
                jQuery("#fromcountryError").show();
            } else if(jQuery('#toCountry_home').val() == '-1'){
                jQuery("#tocountryError").show();
            }else {
                // var new_home_url = "https://ratesuat.sflworldwide.com/?package=" + encodeURIComponent(packageArr) + "&fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
                var new_home_url = "https://rates.sflworldwide.com/?package=" + encodeURIComponent(packageArr) + "&fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
                window.location.href = new_home_url;
            } 

        }
        

    }
    else {
        jQuery("#boxError").show().focus();
    }
})

jQuery("#startAQuote_home1").click(function(event) {
    console.log("IN2 quote")
    debugger
    var packageArr = [];
    
    var foo = jQuery('#sf_service_list1').val(); 

    if(jQuery('#sf_service_list1').val()){
        for (let index = 0; index < foo.length; index++) {
            packageArr.push(foo[index])
            
        }
    }
    console.log("Values are = " ,packageArr);

    jQuery('#package_content').find('a').each(function() {
        if(jQuery(this).hasClass('selected')) {
            packageArr.push(jQuery(this).attr('value'));
        }
    });


    selectedFromCountry_home = jQuery('#sf_from_country1').val();
    selectedToCountry_home = jQuery('#sf_to_country1').val();

    if(jQuery("#envelope").hasClass('selected') || jQuery("#box").hasClass('selected') || jQuery("#television").hasClass('selected') || jQuery("#furniture").hasClass('selected') || jQuery("#auto").hasClass('selected')){
        if(selectedFromCountry_home == undefined && selectedToCountry_home == undefined){
            selectedFromCountry_home = 202;
            
            if (jQuery("body").hasClass("page-id-3860")) { // for SSHIPPING TO AUSTRALIA
                selectedToCountry_home = 12;
            } else if(jQuery("body").hasClass("page-id-3862")) {// for SSHIPPING TO CANADA
                selectedToCountry_home = 37;
            }else if(jQuery("body").hasClass("page-id-4110")) {// for SSHIPPING TO INDIA
                selectedToCountry_home = 89;
            }else if(jQuery("body").hasClass("page-id-3864")) {// for SSHIPPING TO NEPAL
                selectedToCountry_home = 137;
            }else if(jQuery("body").hasClass("page-id-3598")) {// for SSHIPPING TO PAKISTAN
                selectedToCountry_home = 150;
            }else if(jQuery("body").hasClass("page-id-3866")) {// for SSHIPPING TO UAE
                selectedToCountry_home = 200;
            }else if(jQuery("body").hasClass("page-id-3868")) {// for SSHIPPING TO UK
                selectedToCountry_home = 201;
            }else if(jQuery("body").hasClass("page-id-8338")){ // for Indonesia
                selectedToCountry_home = 90
            }else if(jQuery("body").hasClass("page-id-8052")){ // for Kenya
                selectedToCountry_home = 101
            }else if(jQuery("body").hasClass("page-id-8119")){ // for nigeria
                selectedToCountry_home = 144
            }else if(jQuery("body").hasClass("page-id-8220")){ // for South Africa
                selectedToCountry_home = 176
            }else if(jQuery("body").hasClass("page-id-7066")){ // for Mexico
                selectedToCountry_home = 126
            }
            // var new_home_url = "https://ratesuat.sflworldwide.com/?package=" + encodeURIComponent(packageArr) + "&fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
            var new_home_url = "https://rates.sflworldwide.com/?package=" + encodeURIComponent(packageArr) + "&fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
            window.location.href = new_home_url;
        } else {
            if((jQuery('#sf_from_country1').val() == '-1') && (jQuery('#toCountry_home1').val() == '-1')){
                jQuery("#fromcountryError").show();
                jQuery("#tocountryError").show();
            } else {
                if(jQuery('#sf_from_country1').val() == '-1'){
                    jQuery("#fromcountryError").show();
                } else if(jQuery('#toCountry_home1').val() == '-1'){
                    jQuery("#tocountryError").show();
                }else {
                    // var new_home_url = "https://ratesuat.sflworldwide.com/?package=" + encodeURIComponent(packageArr) + "&fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
                    var new_home_url = "https://rates.sflworldwide.com/?package=" + encodeURIComponent(packageArr) + "&fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
                    window.location.href = new_home_url;
                } 
            }
        }
        
    }else if(jQuery('#sf_service_list1').val()){

        if((jQuery('#sf_from_country1').val() == '-1') && (jQuery('#toCountry_home1').val() == '-1')){
                jQuery("#fromcountryError").show();
                jQuery("#tocountryError").show();
        } else {
            if(jQuery('#sf_from_country1').val() == '-1'){
                jQuery("#fromcountryError").show();
            } else if(jQuery('#toCountry_home1').val() == '-1'){
                jQuery("#tocountryError").show();
            }else {
                // var new_home_url = "https://ratesuat.sflworldwide.com/?package=" + encodeURIComponent(packageArr) + "&fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
                var new_home_url = "https://rates.sflworldwide.com/?package=" + encodeURIComponent(packageArr) + "&fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
                window.location.href = new_home_url;
            } 

        }
        

    }
    else {
        jQuery("#boxError").show().focus();
    }
})

jQuery("#blogStartQuote").click(function(event) {debugger;
    event.preventDefault();
    selectedFromCountry_home = jQuery('#blogFromCountry').val();
    selectedToCountry_home = jQuery('#blogToCountry').val();

    if(jQuery('#blogFromCountry').val() == '-1'){
        jQuery("#fromcountryError").show();
    } else if(jQuery('#blogToCountry').val() == '-1'){
        jQuery("#tocountryError").show();
    }else {
        // var new_home_url = "https://ratesuat.sflworldwide.com/?fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
        var new_home_url = "https://rates.sflworldwide.com/?fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
        window.location.href = new_home_url;
    } 
})

jQuery("#defaultCountryButton").click(function(event) {
    event.preventDefault();
    selectedFromCountry_home = jQuery('#fromCountryUS').val();
    selectedToCountry_home = jQuery('#toCountryDefault').val();

    if(jQuery('#fromCountryUS').val() == '-1'){
        jQuery("#fromcountryError").show();
    } else if(jQuery('#toCountryDefault').val() == '-1'){
        jQuery("#tocountryError").show();
    }else {
        // var new_home_url = "https://ratesuat.sflworldwide.com/?fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
        var new_home_url = "https://rates.sflworldwide.com/?fromcountry=" +encodeURIComponent(selectedFromCountry_home) + "&tocountry=" +encodeURIComponent(selectedToCountry_home);
        window.location.href = new_home_url;
    } 
})

jQuery('#file_a_claim').click(function() {
    jQuery("form[name='file_a_claim']").validate({
        rules: {
            TrackingNumber: {
                required: true,
            },
            'menu-360': {
                required: true,
            },
            'menu-876': {
                required: true,
            },
            'file-33': {
                //required:true,
                accept: "image/jpg,image/jpeg,image/png,image/gif"
            },
            'file-34': {
                //required:true,
                accept: "image/jpg,image/jpeg,image/png,image/gif"
            },
            'file-35': {
                //required:true,
                accept: "image/jpg,image/jpeg,image/png,image/gif"
            }
        },
        messages: {

        }

    });
});

jQuery("form[name='file_a_claim']").submit(function(event) {
    event.preventDefault();
    var formData = new FormData(jQuery(this)[0]);
    if (jQuery("form[name='file_a_claim']").valid()) {
        jQuery.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: '<?php echo rawurldecode(esc_url(home_url('/'))); ?>wp-admin/admin-ajax.php?action=file_a_claim',
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            // dataType: 'json',
            success: function(msg) {
                console.log(msg);
            },
            error: function(error) {
                console.log(error);
            }

        });
    }
});


// jQuery("#menu-689").change(function() {
//     console.log("menu-689",jQuery(this));
// }
//     $(document.body).on('change',"#menu-689",function (e) {
//    //doStuff
//     var optVal= $("#menu-689 option:selected").val();
//     })

// jQuery("#menu-689").change(function() {
//        debugger;
//     });

// jQuery('#get-a-quote-short-form').click(function() {
//     jQuery("form[name='get-a-quote-short-form']").validate({
//         rules: {
//             'countries-to': {
//                 required: true,
//             },
//             FullName: {
//                 required: true,
//             },
//             Email: {
//                 required: true,
//             },
//             phone_number: {
//                 required: true,
//             }
//         },
//         messages: {

//         }

//     });
// });
</script>

<script>
/* Dots disabled*/

// =============== notes your where this code applying ========
jQuery("#menu-689").change(function() {
    if (jQuery(this).children("option:selected").val() == "Bank") {
        jQuery("#menu2").hide();
        jQuery("#menu1").show();
    } else {
        jQuery("#menu1").hide();
        jQuery("#menu2").show();
    }

});
jQuery("#cvvnumber").on("keypress", function(evt) {
    var keycode = evt.charCode || evt.keyCode;
    if (keycode == 46) {
        return false;
    }
});
/* char disabled*/
jQuery("#cvvnumber").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});
jQuery("#phone_number").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});


jQuery("#number-519").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((key >= 48 && key <= 90) || (key >= 96 && key <= 105) || key == 109 || key == 8) {
        return false;
    }
    return true;
});

/* Dots disabled*/
jQuery("#onlinephoneno").on("keypress", function(evt) {
    var keycode = evt.charCode || evt.keyCode;
    if (keycode == 46) {
        return false;
    }
});
/* char disabled*/
jQuery("#onlinephoneno").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});
jQuery("#PhoneNo").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});
jQuery("#phone_numbershortf").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});
/* Dots disabled*/
jQuery("#CardNumber").on("keypress", function(evt) {
    var keycode = evt.charCode || evt.keyCode;
    if (keycode == 46) {
        return false;
    }
});
/* char disabled*/
jQuery("#CardNumber").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});
/* Dots disabled*/
jQuery("#AccountNumber").on("keypress", function(evt) {
    var keycode = evt.charCode || evt.keyCode;
    if (keycode == 46) {
        return false;
    }
});
/* char disabled*/
jQuery("#AccountNumber").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});
/* Dots disabled*/
jQuery("#BillingZipCode").on("keypress", function(evt) {
    var keycode = evt.charCode || evt.keyCode;
    if (keycode == 46) {
        return false;
    }
});
/* char disabled*/
jQuery("#BillingZipCode").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});

jQuery("#CardNumber").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});

/* number disabled*/
jQuery("#NameonBankAccount").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var inputvalue = event.charCode;
    if (!((inputvalue > 64 && inputvalue < 91) || (inputvalue > 96 && inputvalue < 123) || (inputvalue == 0) ||
            (inputvalue == 32))) {
        event.preventDefault();
    }
});
jQuery("#FullName").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var inputvalue = event.charCode;
    if (!((inputvalue > 64 && inputvalue < 91) || (inputvalue > 96 && inputvalue < 123) || (inputvalue == 0) ||
            (inputvalue == 32))) {
        event.preventDefault();
    }
});
jQuery("#callback_name").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var inputvalue = event.charCode;
    if (!((inputvalue > 64 && inputvalue < 91) || (inputvalue > 96 && inputvalue < 123) || (inputvalue == 0) ||
            (inputvalue == 32))) {
        event.preventDefault();
    }
});
jQuery("#contact_name").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var inputvalue = event.charCode;
    if (!((inputvalue > 64 && inputvalue < 91) || (inputvalue > 96 && inputvalue < 123) || (inputvalue == 0) ||
            (inputvalue == 32))) {
        event.preventDefault();
    }
});
jQuery("#FullNameshortf").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var inputvalue = event.charCode;
    if (!((inputvalue > 64 && inputvalue < 91) || (inputvalue > 96 && inputvalue < 123) || (inputvalue == 0) ||
            (inputvalue == 32))) {
        event.preventDefault();
    }
});
jQuery("#City").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var inputvalue = event.charCode;
    if (!((inputvalue > 64 && inputvalue < 91) || (inputvalue > 96 && inputvalue < 123) || (inputvalue == 0) ||
            (inputvalue == 32))) {
        event.preventDefault();
    }
});

jQuery("#State").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var inputvalue = event.charCode;
    if (!((inputvalue > 64 && inputvalue < 91) || (inputvalue > 96 && inputvalue < 123) || (inputvalue == 0) ||
            (inputvalue == 32))) {
        event.preventDefault();
    }
});
jQuery("#text-951").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var inputvalue = event.charCode;
    if (!((inputvalue > 64 && inputvalue < 91) || (inputvalue > 96 && inputvalue < 123) || (inputvalue == 0) ||
            (inputvalue == 32))) {
        event.preventDefault();
    }
});
jQuery("#text-871").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var inputvalue = event.charCode;
    if (!((inputvalue > 64 && inputvalue < 91) || (inputvalue > 96 && inputvalue < 123) || (inputvalue == 0) ||
            (inputvalue == 32))) {
        event.preventDefault();
    }
});

/* number disabled*/
jQuery("#BankName").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var inputvalue = event.charCode;
    if (!((inputvalue > 64 && inputvalue < 91) || (inputvalue > 96 && inputvalue < 123) || (inputvalue == 0) ||
            (inputvalue == 32))) {
        event.preventDefault();
    }
});
jQuery("#ContactName").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var inputvalue = event.charCode;
    if (!((inputvalue > 64 && inputvalue < 91) || (inputvalue > 96 && inputvalue < 123) || (inputvalue == 0) ||
            (inputvalue == 32))) {
        event.preventDefault();
    }
});


/* char disabled for contact us*/
jQuery("#phone").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});
jQuery("#callback_number").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});
jQuery("#contact_number").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});
//CFT Contact number
jQuery("#CustomerContact").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});
jQuery("#CustomerUserName").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var inputvalue = event.charCode;
    if (!((inputvalue > 64 && inputvalue < 91) || (inputvalue > 96 && inputvalue < 123) || (inputvalue == 0) ||
            (inputvalue == 32))) {
        event.preventDefault();
    }
});



/* char disabled for request a callback*/
jQuery("#phonenumber").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});

jQuery("#PhoneNumber").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});

/* char disabled for request a callback*/
jQuery("#Weight").on("keypress", function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});
function showLoader() {
    jQuery("#y-loader").show();
}

function hideLoader() {
    jQuery("#y-loader").hide();
}

// jQuery(document).ready(function() {

</script>

<script>
// online-payment validation and NEW API call---------------------------------------



jQuery('#online-payment').click(function() {
    jQuery("form[name='online_payment']").validate({
        rules: {
            ContactName: {
                required: true,
            },
            PhoneNumber: {
                required: true,
                number: true,
            },
            Email: {
                required: true,
                email: true,
            },
            TrackingNumber: {
                required: true,
            },
            InvoiceAmount: {
                required: true,
            },
            'text-72': {
                required: true,
            },
            CardNumber: {
                required: true,
                maxlength: 16,
                minlength: 16,
                number: true,
            },
            BillingZipCode: {
                required: true,
            },
            CVVNumber: {
                required: true,
                maxlength: 3,
                minlength: 3,

            },
            NameonBankAccount: {
                required: true,
                // text:true,
                number: false,
            },
            BankName: {
                required: true,
                //text: true,
                number: false,
            },
            // AccountNumber:{
            //     required:true,
            //     maxlength: 15,
            //     minlength: 15,
            // },
            ABARoutingNumber: {
                required: true,
            }
        },
        messages: {

            CVVNumber: {
                required: "Please enter 3 digit CVV Number",
            },
            PhoneNumber: {
                required: "Contact must be 10 digits only",
            },
            CardNumber: {
                required: "Card Number should be 16 digits",
            }
        }

    });
});
jQuery("form[name='online_payment']").submit(function(event) {
    event.preventDefault();
    var formData = new FormData(jQuery(this)[0]);
    if (jQuery("form[name='online_payment']").valid()) {
        jQuery.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: '<?php echo rawurldecode(esc_url(home_url('/'))); ?>wp-admin/admin-ajax.php?action=onlinePayment',
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(msg) {
                console.log(msg);
            }
        });
    }
});

jQuery('#online-payment-bank').click(function() {
    jQuery("form[name='payment-bank']").validate({
        rules: {
            ContactName: {
                required: true,
            },
            PhoneNumber: {
                required: true,
                number: true,
            },
            Email: {
                required: true,
                email: true,
            },
            TrackingNumber: {
                required: true,
            },
            InvoiceAmount: {
                required: true,
            },
            'text-72': {
                required: true,
            },
            IAgreebank :{
                require:true,
            },
            
            NameonBankAccount: {
                required: true,
                // text:true,
                number: false,
            },
            BankName: {
                required: true,
                //text: true,
                number: false,
            },
            AccountNumber:{
                required:true,
                // maxlength: 15,
                // minlength: 15,
            },
            ABARoutingNumber: {
                required: true,
            },
            'IAgreebank[]':{
                // required:true,
                required: true,
                maxlength: 1
            },
        },
        messages: {
            'IAgreebank[]': {
                required: "Please select the term and condition",
                maxlength: "Please select the term and condition"
            }
        },
    });
});
jQuery("form[name='payment-bank']").submit(function(event) {
    // event.preventDefault();
    var formData = new FormData(jQuery(this)[0]);
    // alert(jQuery("form[name='payment-bank']").valid())
    if (jQuery("form[name='payment-bank']").valid()) {

        // var container = document.getElementById('IAgreeBankCheck');

        // var checkbox = container.getElementsByTagName('input');
        // console.log(checkbox)

        var check = 0;
                // for(var j=0; j < checkbox.length; j++) {
        // if (checkbox[0].checked === false) {
        // check = 1;
        // }
                // }
        // if(check === 0) {
            // document.getElementById("answer-for-pancakes").style.display = 'block';
            jQuery.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: '<?php echo rawurldecode(esc_url(home_url('/'))); ?>wp-admin/admin-ajax.php?action=onlinePayment',
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(msg) {
                console.log(msg);
            }
        });
        
        document.getElementById("bankInner").style.display = "none"
        document.getElementById("bankSuccess").style.display = "block"
        jQuery('html, body').animate({
            scrollTop: jQuery("#startAQuote_home").offset().top + 100
        }, 100);
        // }
        // jQuery.ajax({
        //     type: "POST",
        //     enctype: 'multipart/form-data',
        //     url: '<?php echo rawurldecode(esc_url(home_url('/'))); ?>wp-admin/admin-ajax.php?action=onlinePayment',
        //     data: formData,
        //     async: true,
        //     cache: false,
        //     contentType: false,
        //     processData: false,
        //     dataType: 'json',
        //     success: function(msg) {
        //         console.log(msg);
        //     }
        // });
    }
});

jQuery('#paymentTypeMobile').change(function() { //on change do stuff
        
            var tabID = document.getElementById("paymentTypeMobile").value;        
        jQuery(this).addClass('active').siblings().removeClass('active');
        jQuery('#tab-'+tabID).addClass('active').siblings().removeClass('active');

});

jQuery('#online-payment-credit-card').click(function() {
    // alert("IN")
    jQuery("form[name='payment-creditcard']").validate({
        rules: {
            ContactName: {
                required: true,
            },
            PhoneNumber: {
                required: true,
                number: true,
            },
            Email: {
                required: true,
                email: true,
            },
            TrackingNumber: {
                required: true,
            },
            InvoiceAmount: {
                required: true,
            },
            'text-72': {
                required: true,
            },
            'text-768':{
                required: true,
            },
            'menu-373':{
                required: true,
            },
            'menu-764':{
                required: true,  
            },
            'menu-25':{
                required : true,
            },
            CardNumber: {
                required: true,
                maxlength: 19,
                minlength: 19,
                // number: true,
                // message: "Please enter valid card number",
            },
            BillingZipCode: {
                required: true,
            },
            CVVNumber: {
                required: true,
                maxlength: 3,
                minlength: 3,

            },
            NameonBankAccount: {
                required: true,
                // text:true,
                number: false,
            },
            BankName: {
                required: true,
                //text: true,
                number: false,
            },
            // AccountNumber:{
            //     required:true,
            //     maxlength: 15,
            //     minlength: 15,
            // },
            ABARoutingNumber: {
                required: true,
            },
            // 'IAgreeCreditCardCheckBox[]':{
            //     required:true,
            // },
            'IAgreeCreditCard[]':{
                // required:true,
                required: true,
                maxlength: 1
            },
        },
        messages: {

            CVVNumber: {
                required: "Please enter 3 digit CVV Number",
            },
            PhoneNumber: {
                required: "Contact must be 10 digits only",
            },
            CardNumber: {
                required: "Card Number should be 16 digits",
                maxlength: jQuery.validator.format("Please enter a valid card number."),
                minlength: jQuery.validator.format("Please enter a valid card number"),
            },
            'IAgreeCreditCard[]': {
                required: "Please select the term and condition",
                maxlength: "Please select the term and condition"
            }
        }

    });
});



jQuery("form[name='payment-creditcard']").submit(function(event) {
    // alert("Hello")
    event.preventDefault();
    var formData = new FormData(jQuery(this)[0]);
    debugger
    if (jQuery("form[name='payment-creditcard']").valid()) {

        
        
        // var container = document.getElementById('IAgreeCreditCardCheckBox');

        // var checkbox = container.getElementsByTagName('input');
        // console.log(checkbox)

        var check = 0;
                // for(var j=0; j < checkbox.length; j++) {
        // if (checkbox[0].checked === false) {
        // check = 1;
        // }
        //         // }
        if(check === 0) {
            // document.getElementById("answer-for-pancakes").style.display = 'block';
            jQuery.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: '<?php echo rawurldecode(esc_url(home_url('/'))); ?>wp-admin/admin-ajax.php?action=onlinePayment',
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(msg) {
                console.log(msg);
            }
        });
        }
        document.getElementById("creditInner").style.display = "none"
        document.getElementById("creditSuccess").style.display = "block"
        jQuery('html, body').animate({
            scrollTop: jQuery("#startAQuote_home").offset().top + 100
        }, 100);

        

    }else{
        debugger
        return 0;
    }
});

// jQuery('#scroll-test').click(function() {
    
// });


//**********************************************///////////////////

// request_a_callback validation and API call New API---------------------------------------

jQuery('#call-back-submit').click(function() {
    jQuery("form[name='request_a_callback']").validate({
        rules: {
            Name: {
                required: true,
                minlength: 3,
            },
            Email: {
                required: true,
                email: true,
            },
            PhoneNumber: {
                required: true,
                number: true,
                maxlength: 10,
                minlength: 10,
            },
            'menu-267': {
                required: true,
            }

        },

        messages: {
            Name: {
                required: "Plesa enter your name",
            },
            Email: {
                required: "Please enter Email ID",
            },
            PhoneNumber: {
                required: "Mobile number should be 10 digits",
            },
            'menu-267': {
                required: "Please select TimeZone",
            },
        }
    });
});
jQuery("form[name='request_a_callback']").submit(function(event) {
    event.preventDefault();
    var formData = new FormData(jQuery(this)[0]);
    // console.log(jQuery(this)[0]);
    if (jQuery("form[name='request_a_callback']").valid()) {
        var note = [{
            "NoteID": null,
            "NoteType": null,
            "NoteTitle": null,
            "NoteText": jQuery('textarea[name="Comment"]').val(),
            "Status": "Active",
            "AttachmentID": null,
            "AttachmentType": null,
            "AttachmentName": null,
            "AttachmentStatus": null
        }];
        formData.append("NoteList", JSON.stringify(note));
        jQuery.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: '<?php echo rawurldecode(esc_url(home_url('/'))); ?>wp-admin/admin-ajax.php?action=request_a_callback',
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(msg) {
                console.log(msg);
            }
        });
    }
});





//Call New API ******************************//

jQuery('#contact_submit').click(function() {
    var checkValue = jQuery('input[name="radio-114"]:checked').val();
    if (checkValue == "Existing Customer") {

        jQuery("form[name='contact_form']").validate({

            rules: {
                Name: {
                    required: true,
                    minlength: 3,
                },
                Email: {
                    required: true,
                    email: true,
                },
                Phone: {
                    required: true,
                    number: true,
                },
                'textarea-714': {
                    required: true,
                },
                'text-784': {
                    required: true,
                }
            },
            messages: {
                Name: {
                    required: "Name cannot be less than 3 character",
                },
                Phone: {
                    required: "Contact number shuould be 10 digits only",
                },
                'text-784': {
                    required: "Please enter Tracking Number"
                }
            }
        });
    } else {

        jQuery("form[name='contact_form']").validate({

            rules: {
                Name: {
                    required: true,
                    minlength: 3,
                },
                Email: {
                    required: true,
                    email: true,
                },
                Phone: {
                    required: true,
                    number: true,
                },
                'textarea-714': {
                    required: true,
                }
            },
            messages: {
                Name: {
                    required: "Name cannot be less than 3 character",
                },
                Phone: {
                    required: "Contact number shuould be 10 digits only",
                }
            }
        });

    }
});
jQuery("form[name='contact_form']").submit(function(event) {
    event.preventDefault();
    var formData = new FormData(jQuery(this)[0]);
    if (jQuery("form[name='contact_form']").valid()) {


        console.log("FormData = ",formData)
        jQuery.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: '<?php echo rawurldecode(esc_url(home_url('/'))); ?>wp-admin/admin-ajax.php?action=contact_form',
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(msg) {
            console.log("IN data kamal today 1")
                if(msg == 0){
                    document.getElementById("contactSuccessOutput").style.display = "none"
                    document.getElementById("contactErrorOutput").style.display = "block"

                }else{
                    document.getElementById("contactSuccessOutput").style.display = "block"
                    document.getElementById("contactErrorOutput").style.display = "none"

                    // jQuery.ajax({
                    //     type: "POST",
                    //     enctype: 'multipart/form-data',
                    //     url: '<?php echo rawurldecode(esc_url(home_url('/'))); ?>wp-admin/admin-ajax.php?action=contact_formSubmit',
                    //     data: formData,
                    //     async: true,
                    //     cache: false,
                    //     contentType: false,
                    //     processData: false,
                    //     dataType: 'json',
                    //     success: function(msg) {

                    //         // if(msg == 0){

                    //         // }else{

                    //         // }

                    //         console.log(msg);
                    //     }
                    // });


                }

                console.log(msg);
            }
        });
    }
});





// var number =jQuery('#track_shipment').val();
// console.log('Tracking Number===============', number);




var trackinput = document.getElementById("track_shipment");
trackinput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("track_shipment_btn").click();
    }
});



var getResult = [];

</script>



<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<script type="text/javascript">
jQuery(document).ready(function() {
    jQuery('#myBtn').click(function() {
        jQuery('#myModal').modal({
            backdrop: 'static'
        });
    });
});

jQuery("#call-back-submit").submit(function(event) {
    //debugger
    if (jQuery("div").hasClass("wpcf7-mail-sent-ok")) {
        jQuery("#myModal").css("display", "none");
    }
});
</script>

<div id="myModal" class="modal fade get-quote-call-back">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h2 class="modal-title">Call Back Request</h2>
        </div>
        <?php echo do_shortcode('[contact-form-7 id="351" title="Request a Callback"]'); ?>
    </div>
</div>

<script type="text/javascript">
jQuery("#call-back-submit").click(function() {
    setTimeout(function() {
        //debugger
        if (jQuery("div").hasClass("wpcf7-mail-sent-ok")) {

            jQuery("#myModal").css("display", "none");
        }
    }, 3000);
});



jQuery("#ss-submit").click(function() {
    document.addEventListener( 'wpcf7mailsent', function( event ) {
        event.preventDefault();
        document.getElementById("ss-form").style.display = "none"
        document.getElementById("form-response").style.display = "block"
    }, false );
    
});



jQuery("#resend-form").click(function() {
    document.getElementById("ss-form").style.display = "block"
    document.getElementById("form-response").style.display = "none"
    
});


jQuery("#shippingSmallbusinessSub").click(function() {
    document.addEventListener( 'wpcf7mailsent', function( event ) {
        event.preventDefault();
        document.getElementById("shippingSmall-form-wrap").style.display = "none"
        document.getElementById("shipping-smallform-response").style.display = "block"
    }, false );
    
});



jQuery("#shipping-small-resend-form").click(function() {
    document.getElementById("shippingSmall-form-wrap").style.display = "block"
    document.getElementById("shipping-smallform-response").style.display = "none"
    
});


jQuery("#creditBTN").click(function() {
    document.getElementById("creditInner").style.display = "block"
    document.getElementById("creditSuccess").style.display = "none"
    
});

jQuery("#bankBTN").click(function() {

    jQuery.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: '<?php echo rawurldecode(esc_url(home_url('/'))); ?>wp-admin/admin-ajax.php?action=CheckEmail',
            data: "anshul.agarwal@cognisun.com",
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(msg) {
                console.log(msg);
            }
        });

    document.getElementById("bankInner").style.display = "block"
    document.getElementById("bankSuccess").style.display = "none"
    
});



jQuery("#cardType").css('display', 'none');
jQuery("#CardNumber").on('keyup', function() {
    if (this.value == "") {
        jQuery("#cardType").css('display', 'none');
    } else {
        if (this.value.length > 0) {
            var firstNumber = parseInt(this.value.charAt(0));
            var src = '';
            if (firstNumber == 3) {
                src = "/wp-content/themes/sfl-worldwide/images/american-express.png";
            } else if (firstNumber == 4) {
                src = "/wp-content/themes/sfl-worldwide/images/visa.png";
            } else if (firstNumber == 5) {
                src = "/wp-content/themes/sfl-worldwide/images/mastercard.png";
            } else if (firstNumber == 6) {
                src = "/wp-content/themes/sfl-worldwide/images/discover.png";
            }

            if (src != '') {
                jQuery("#cardType").css('display', 'block');
                jQuery("#cardType").attr("src", src);
            } else {
                jQuery("#cardType").css('display', 'none');
            }
        } else {
            jQuery("#cardType").css('display', 'none');
        }
    }
})
</script>