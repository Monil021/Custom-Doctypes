frappe.ui.form.on('Customer Request Form', {   
    onload: function(frm) {
        frm.toggle_display('gst_details_section', false);
        frm.toggle_display('msme_no', false);
        frm.toggle_display('type_microsmallmedium', false); 
        if (frm.doc.gst_no) {
            frm.toggle_display('gst_details_section', true);
        }
    },
    pan: function(frm){
        if(frm.doc.pan){
            setTimeout(function(){
            var panRegex = /^([A-Z]{5}[0-9]{4}[A-Z])$/;
            if (!panRegex.test(frm.doc.pan)) {
                // PAN format is incorrect
                frappe.msgprint(__("PAN number format is incorrect. Please enter a valid PAN number."));}},2000)
            }},
    pin_code: function(frm){
        if(frm.doc.pin_code){
            setTimeout(function(){
                var pinRegex = /^[1-9][0-9]{5}$/;
                if(!pinRegex.test(frm.doc.pin_code)){
                    frappe.msgprint(__("Pin Code format is incorrect. Please enter a valid Pin Code."));}},2000)
                    }},
    mobile_no_landline_no: function(frm){
        if(frm.doc.mobile_no_landline_no){
            setTimeout(function(){
                var mobileRegex = /^\d{10}$/;
                if(!mobileRegex.test(frm.doc.mobile_no_landline_no)){
                    frappe.msgprint(__("Please Enter 10 Digit Mobile Number"));}},2000)
                    }},
    alternate_mobile_no: function(frm){
        if(frm.doc.alternate_mobile_no){
            setTimeout(function(){
                var mobileRegex1 = /^\d{10}$/;
                if(!mobileRegex1.test(frm.doc.alternate_mobile_no)){
                    frappe.msgprint(__("Please Enter 10 Digit Mobile Number"));}},2000)
                    }},
    // mail: function(frm){
    //     if(frm.doc.mail){
    //         setTimeout(function(){
    //             var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //             if(!emailRegex .test(frm.doc.mail)){
    //                 frappe.msgprint(__("Please Enter Valid Mail ID"));}},7000)
    //                 }},                                     
    gst_no: function(frm) {
        if(!frm.doc.gst_no || !frm.doc.statefrm){
            frm.toggle_display('gst_details_section', false);
        }                                               
        if (frm.doc.gst_no && frm.doc.statefrm) {
            var gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z][0-9A-Z][A-Z0-9]$/;
            
            if (gstRegex.test(frm.doc.gst_no)) {
                var gstStateCode = frm.doc.gst_no.substring(0, 2); // Extract state code from GST number
                // var selectedStateCode = frm.doc.statefrm; // Extract state code from selected state
                //frappe.msgprint('Entered here!!!!!!!');
                // Define a mapping of states to their respective GST numbers
                var stateToGSTMapping = {
                    'Andhra Pradesh': '37',
                    'Arunachal Pradesh': '12',
                    'Assam': '18',
                    'Bihar': '10',
                    'Chhattisgarh': '22',
                    'Goa': '30',
                    'Gujarat': '24',
                    'Haryana': '06',
                    'Himachal Pradesh': '02',
                    'Jharkhand': '20',
                    'Karnataka': '29',
                    'Kerala': '32',
                    'Madhya Pradesh': '23',
                    'Maharashtra': '27',
                    'Manipur': '14',
                    'Meghalaya': '17',
                    'Mizoram': '15',
                    'Nagaland': '13',
                    'Odisha': '21',
                    'Punjab': '03',
                    'Rajasthan': '08',
                    'Sikkim': '11',
                    'Tamil Nadu': '33',
                    'Telangana': '36',
                    'Tripura': '16',
                    'Uttar Pradesh': '09',
                    'Uttarakhand': '05',
                    'West Bengal': '19',
                    'Andaman and Nicobar Islands': '35',
                    'Chandigarh': '04',
                    'Dadra and Nagar Haveli':'26',
                    'Delhi': '07',
                    'Lakshadweep': '31',
                    'Puducherry': '34'
                };
                // Check if the entered GST number matches the GST number for the selected state
                if (stateToGSTMapping[frm.doc.statefrm] !== gstStateCode) {
                    frappe.throw('GST number does not match with selected state. Please correct it.')
                } else {
                    frappe.show_alert('GST Number is Valid and Matches with State Code!');
                    frm.toggle_display('gst_details_section', true);
                    frm.set_value('gst_number', frm.doc.gst_no);
                    frm.refresh_field('gst_number');
                }
            }
            else {
                setTimeout(function() {
                    frappe.msgprint('Invalid GST number format. Please enter a valid GST number.');
                }, 2000);
            }
        }
    },
    yes_or_no: function(frm) {
        if (frm.doc.yes_or_no == 'Yes') {
            frm.set_df_property('msme_no', 'reqd', 1);
            frm.set_df_property('type_microsmallmedium', 'reqd', 1);
            frm.toggle_display('msme_no', true);
            frm.toggle_display('type_microsmallmedium', true);
        } else {
            frm.set_df_property('msme_no', 'reqd', 0);
            frm.set_df_property('type_microsmallmedium', 'reqd', 0);
            frm.toggle_display('msme_no', false);
            frm.toggle_display('type_microsmallmedium', false);
        }
        frm.refresh_field('msme_no');
        frm.refresh_field('type_microsmallmedium');
        frm.refresh_field('gst_no');
    },
    statefrm: function(frm) {
        // Trigger validation on state change if GST number is already entered
        if (frm.doc.gst_no && frm.doc.statefrm){
            frm.trigger('gst_no');
        }
    }
    });
  
    // validateGSTNumber: function(state, gst_no, stateCodes) {
    //     // Check if the selected state matches the state code in the GST number
    //     if (!stateCodes[state]) {
    //         throw new Error(`Invalid state code ${state} in GST number.`);
    //     }
    
    //     const gstStateCode = gst_no.substring(0, 2);
        
    //     if (gstStateCode !== state) {
    //         throw new Error(`GST number does not belong to ${stateCodes[state]}.`);
    //     } else {
    //         console.log(`GST number belongs to ${stateCodes[state]}.`);
    //     }
    // }
    
    // gst_no: function(frm) {
    //     if (frm.doc.gst_no) {
    //         //Regular expression to match GST number format (assuming Indian GST format)
    //         var gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z][0-9A-Z][A-Z0-9]$/;
    //         if (gstRegex.test(frm.doc.gst_no)) {
    //             // Set the GST number field value
    //             frm.set_value('gst_number', frm.doc.gst_no);
    //             frm.refresh_field('gst_number');
    //             // Show the GST details section
    //             frm.toggle_display('gst_details_section', true);
    //             validateGSTNumber(frm.doc.state, frm.doc.gst_no);
    //             console.log("It's a valid GST Number!!!!!!!")
    //          }
    //         //  else {
    //         //     // If GST number format is incorrect
    //         //     frappe.msgprint('Invalid GST number format. Please enter a valid GST number.');
    //         //     frm.set_value('gst_no', ''); // Clear the incorrect value
    //         //     frm.set_value('gst_number', ''); // Clear corresponding GST number field
    //         //     frm.refresh_fields(['gst_no', 'gst_number']);
    //         //     frm.toggle_display('gst_details_section', false);
    //         // }
    //         else {
    //             // If GST number format is incorrect
    //             setTimeout(function() {
    //                 frappe.msgprint('Invalid GST number format. Please enter a valid GST number.');
    //                 frm.set_value('gst_no', ''); // Clear the incorrect value
    //                 frm.set_value('gst_number', ''); // Clear corresponding GST number field
    //                 frm.refresh_fields(['gst_no', 'gst_number']);
    //                 frm.toggle_display('gst_details_section', false);
    //             }, 1000);
    //         }
    //     } else {
    //         frm.refresh_field('gst_no');
    //         frm.refresh_field('gst_number');
    //         frm.toggle_display('gst_details_section', false);
    //     }
    // },
    //code
