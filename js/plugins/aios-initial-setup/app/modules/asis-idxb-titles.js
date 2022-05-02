/* Auto-populate IDX Broker Titles*/

jQuery(document).ready( function() {	
	if ( jQuery("#IDX-pageInfoGet").length ) {

		var pageInfo = JSON.parse( jQuery("#IDX-pageInfoGet").text() );
		
		if ( window.location.href.search("/idx/search/address") > -1 ) {
			jQuery(".breadcrumb_last").text("Address Search");
			jQuery("title").text("Address Search" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Address Search");
		}
		
		else if ( window.location.href.search("/idx/search/advanced") > -1 ) {
			jQuery(".breadcrumb_last").text("Advanced Search");
			jQuery("title").text("Advanced Search" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Advanced Search");
		}
		
		else if ( window.location.href.search("/idx/search/basic") > -1 ) {
			jQuery(".breadcrumb_last").text("Basic Search");
			jQuery("title").text("Basic Search" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Basic Search");
		}
		
		else if ( window.location.href.search("/idx/search/emailupdatesignup") > -1 ) {
			jQuery(".breadcrumb_last").text("Email Update Signup");
			jQuery("title").text("Email Update Signup" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Email Update Signup");
		}
		
		else if ( window.location.href.search("/idx/search/listingid") > -1 ) {
			jQuery(".breadcrumb_last").text("Listing ID Search");
			jQuery("title").text("Listing ID Search" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Listing ID Search");
		}
		
		else if ( window.location.href.search("/idx/map/mapsearch") > -1 || pageInfo.savedName == "map-search" ) {
			jQuery(".breadcrumb_last").text("Map Search");
			jQuery("title").text("Map Search" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Map Search");
		}
		
		else if ( window.location.href.search("/idx/featured") > -1 ) {
			jQuery(".breadcrumb_last").text("Featured Properties");
			jQuery("title").text("Featured Properties" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Featured Properties");
		}
		
		else if ( window.location.href.search("/idx/featuredopenhouse") > -1 ) {
			jQuery(".breadcrumb_last").text("Featured Open Houses");
			jQuery("title").text("Featured Open Houses" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Featured Open Houses");
		}
		
		else if ( window.location.href.search("/idx/results/listings") > -1 ) {
			jQuery(".breadcrumb_last").text("Search Results");
			jQuery("title").text("Search Results" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Search Results");
		}
		
		else if ( window.location.href.search("/idx/featuredvirtualtour") > -1 ) {
			jQuery(".breadcrumb_last").text("Featured Virtual Tour");
			jQuery("title").text("Featured Virtual Tour" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Featured Virtual Tour");
		}
		
		else if ( window.location.href.search("/idx/supplemental") > -1 ) {
			jQuery(".breadcrumb_last").text("Supplemental Properties");
			jQuery("title").text("Supplemental Properties" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Supplemental Properties");
		}
		
		else if ( window.location.href.search("/idx/details/listing") > -1 ) {
			var title = jQuery("title").text();
			jQuery(".breadcrumb_last").text(title);
			jQuery("title").text(title + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text(title);
		}
		
		else if ( window.location.href.search("/idx/linkshowcase") > -1 ) {
			jQuery(".breadcrumb_last").text("Supplemental Properties");
			jQuery("title").text("Supplemental Properties" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Supplemental Properties");
		}
		
		else if ( window.location.href.search("/idx/mortgage") > -1 ) {
			jQuery(".breadcrumb_last").text("Mortgage Calculator");
			jQuery("title").text("Mortgage Calculator" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Mortgage Calculator");
		}
		
		else if ( window.location.href.search("/idx/photogallery") > -1 ) {
			jQuery(".breadcrumb_last").text("Photo Gallery");
			jQuery("title").text("Photo Gallery" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Photo Gallery");
		}
		
		else if ( window.location.href.search("/idx/contact") > -1 ) {
			jQuery(".breadcrumb_last").text("Contact");
			jQuery("title").text("Contact" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Contact");
			jQuery("#IDX-contactHeader").hide();
		}
		
		else if ( window.location.href.search("/idx/moreinfo") > -1 ) {
			var title = jQuery("#IDX-moreinfoHeader").text();
			jQuery(".breadcrumb_last").text("Request More Information");
			jQuery("title").text(title + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Request More Information");
		}
		
		else if ( window.location.href.search("/idx/scheduleshowing") > -1 ) {
			var title = jQuery("#IDX-scheduleshowingHeader").text();
			jQuery(".breadcrumb_last").text("Schedule a Showing");
			jQuery("title").text(title + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Schedule a Showing");
		}
		
		else if ( window.location.href.search("/idx/myaccount") > -1 ) {
			jQuery(".breadcrumb_last").text("My Account");
			jQuery("title").text("My Account" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("My Account");
		}
		
		else if ( window.location.href.search("/idx/userlogin") > -1 ) {
			jQuery(".breadcrumb_last").text("User Login");
			jQuery("title").text("User Login" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("User Login");
		}
		
		else if ( window.location.href.search("/idx/usersignup") > -1 ) {
			jQuery(".breadcrumb_last").text("User Signup");
			jQuery("title").text("User Signup" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("User Signup");
		}
		
		else if ( window.location.href.search("/idx/searchbycity") > -1 ) {
			jQuery(".breadcrumb_last").text("Search By City");
			jQuery("title").text("Search By City" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Search By City");
		}
		
		else if ( window.location.href.search("/idx/sitemap") > -1 ) {
			jQuery(".breadcrumb_last").text("Sitemap");
			jQuery("title").text("Sitemap" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Sitemap");
		}
		
		else if ( window.location.href.search("/idx/roster") > -1 ) {
			jQuery(".breadcrumb_last").text("Roster");
			jQuery("title").text("Roster" + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery("h1.entry-title").text("Roster");
		}
		
		else if ( jQuery("#IDX-pageCategory").length && window.location.href.search("/i/") > -1 ) {
			var title = jQuery("title").text();
			jQuery("title").text(title + " " + asis_idx_fixes_yoast_title_separator + " " + asis_idx_fixes_yoast_title_sitename);
			jQuery(".breadcrumb_last").text(title);
			jQuery("h1.entry-title").text(title);
		}
		
		else {
			if ( window.location.href.search("/idx/") > -1 ) {
				var title = jQuery("title").text();
				jQuery(".breadcrumb_last").text(title);
				jQuery("h1.entry-title").text(title);
			}
		}
		
	}
});