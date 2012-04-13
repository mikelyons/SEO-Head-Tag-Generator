$(function() {

			/*Form Field Value Swap*/
			swapValues = [];
			$(".swap_value").each(function(i){
				swapValues[i] = $(this).val();
				$(this).focus(function(){
					if ($(this).val() == swapValues[i]) {
						$(this).val("");
					}
				}).blur(function(){
					if ($.trim($(this).val()) == "") {
						$(this).val(swapValues[i]);
					}
				});
			});

			/*Characters Remaining Countdown*/
			var countdown = {
				init: function() {
					countdown.remaining = countdown.max - $(countdown.obj).val().length;
					if (countdown.remaining > countdown.max) {
						$(countdown.obj).val($(countdown.obj).val().substring(0,countdown.max));
					}
					$(countdown.obj).siblings(".remaining").html(countdown.remaining);
				},
				max: null,
				remaining: null,
				obj: null
			};
			$(".countdown").each(function() {
				$(this).focus(function() {
					var c = $(this).attr("class");
					countdown.max = parseInt(c.match(/limit_[0-9]{1,}_/)[0].match(/[0-9]{1,}/)[0]);
					countdown.obj = this;
					iCount = setInterval(countdown.init,1000);
				}).blur(function() {
					countdown.init();
					clearInterval(iCount);
				});
			});

			/*The RSS Feed Reader*/
			$.ajax({
				type: "GET",
				url: "feed.xml",
				dataType: "xml",
				success: function(rss) {
					strRSS = "<h4>" + $("/rss/channel/title",rss).text() + "</h4>";
					$("/rss/channel/item/title:lt(5)",rss).each(function(i) {
						strRSS += "<p><strong><a href='";
						strRSS += $("/rss/channel/item/link:eq(" + i + ")",rss).text();
						strRSS += "'>";
						strRSS += $(this).text();
						strRSS += "</a></strong><br />";
						strRSS += ($("/rss/channel/item/description:eq(" + i + ")",rss).text()).substring(0,200) + "...</p>";
					});
					$("#feed_me").html(strRSS);
				}
			});
			});

			function checkit() {
				// In textstring I gather the data that are finally written to the textarea.
				var textstring1 = '';
				var textstring2 = '';
				var textstring3 = '<meta name="author" content="eCommerce Positioning" />\n' + '<meta name="MSSmartTagsPreventParsing" content="true" />\n';
				var textstring4 = '';
				var textstring5 = '<meta name="robots" content="index, follow" />\n';
				var textstring6 = '';
				var textstring7 = '<meta name="revisit-after" content="7 days" />\n';
				// First of all, have all the text boxes been filled in?
				// This part is treated in the normal page.
				// I put all boxes and their values in textstring
				for (i=0;i<1;i++) {
					var box = document.forms['example'].elements[i];
					if (!box.value) {
						alert('You haven\'t filled in ' + box.name + '!');
						box.focus()
					return;
					}
					textstring1 += '<' + box.id + '>' + box.value + '</' + box.id + '>\n';
				}
				for (i=1;i<3;i++) {
					var box = document.forms['example'].elements[i];
					if (!box.value) {
						alert('You haven\'t filled in ' + box.name + '!');
						box.focus()
					return;
					}
					textstring2+= '<meta name="' + box.id + '" content="' + box.value + '" />\n';
				}
				for (i=3;i<4;i++) {
					var box = document.forms['example'].elements[i];
					if (!box.value) {
						alert('You haven\'t filled in ' + box.name + '!');
						box.focus()
					return;
					}
					textstring4 += '<meta name="' + box.id + '" content="' + box.value + '" />\n';
				}
				for (i=4;i<5;i++) {
					var box = document.forms['example'].elements[i];
					if (!box.value) {
						alert('You haven\'t filled in ' + box.name + '!');
						box.focus()
					return;
					}
					textstring6 += '<meta name="' + box.id + '" content="' + box.value + '" />\n';
				}
				// Write textstring to the textarea.
				document.forms['example'].output.value = textstring1 + textstring2 + textstring3 + textstring4 + textstring5 + textstring6 + textstring7;
			
			}

