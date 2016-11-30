var ui = function () {

    return {
		
		init:function()
		{
			ui.mouseAnalyzer(0);
			ui.svgModal.init();
			new PDFObject({ url: "assets/img/sample.pdf" }).embed("pdf");
			$("#right-side").click(function(e) {
				e.preventDefault();
				$("#wrapper").toggleClass("toggled-right");
				
				$("#wrapper").removeClass("toggled-left outline glossary");
			});
			$("#bottom-toggle").click(function(e) {
				e.preventDefault();
				$("#wrapper").toggleClass("toggled-bottom");
			});
			$("#top-toggle").click(function(e) {
				e.preventDefault();
				$("#wrapper").toggleClass("toggled-top");
			});
			$('.left-menu .side-menu-nav').slimscroll({
				railVisible: true,
				railColor: '#fff',
				height: '100%',
				color: '#fff',
				wheelStep: 5
			});
			$("#course-outline .hasChildren span").click(function(e) {
				$(this).parent().parent().toggleClass("expand");
			});
			$("#content-overlay").click(function(e) {
				e.preventDefault();
				if($("#wrapper").hasClass("toggled-left"))
				{
					ui.navOptions();
				}
			});
			if(typeof playerInstance == "undefined")
			{
				jwplayer.key="NWa+NruTBASm39QxfCBvuv1UblvSsMtD+mrZiJgnxNI=";
				playerInstance = jwplayer('previewVideoPlayer');
				playerInstance.setup({
					file: 'assets/uploads/fields.mp4',
					aspectratio: "16:9",
					height: 260,
					repeat: false,
					skin: {"name": "bekle"},
					stagevideo: false,
					stretching: "uniform",
					width: "100%"
				});
			}
		},
		
		nav:function ()
		{
			wrapperClass:''
		},
		
		mouseAnalyzer:function (n)
		{
			switch(n){
				case 0:
					$('body').mouseleave(function() {
						//console.log('out');
						ui.nav.wrapperClass = $('#wrapper').attr('class');
						$('#wrapper').removeAttr('class');
						ui.mouseAnalyzer(1);
					});
					ui.mouseAnalyzer(1);
				break;
				case 1:
					$('body').mouseover(function() {
						//console.log('over');
						$('#wrapper').addClass(ui.nav.wrapperClass);
						ui.nav.wrapperClass = '';
						$('body').unbind('mouseover');
					});
				break;
			}
		},
		
		navOptions:function ()
		{
			$("#wrapper").toggleClass("toggled-left");
		},
		
		navHome:function ()
		{
			if($("#wrapper").hasClass("glossary") || $("#wrapper").hasClass("material") || $("#wrapper").hasClass("outline"))
			{
				$("#wrapper").toggleClass("options");
			}
			else
			{
				$("#wrapper").toggleClass("toggled-left").toggleClass("options");
			}
			$("#wrapper").removeClass("toggled-right glossary material outline");
		},
		
		navCourseOutline:function ()
		{
			if($("#wrapper").hasClass("glossary") || $("#wrapper").hasClass("material") || $("#wrapper").hasClass("options"))
			{
				$("#wrapper").toggleClass("outline");
			}
			else
			{
				$("#wrapper").toggleClass("toggled-left").toggleClass("outline");
			}
			$("#wrapper").removeClass("toggled-right glossary material options");
		},
		
		navGlossary:function ()
		{
			if($("#wrapper").hasClass("outline") || $("#wrapper").hasClass("material") || $("#wrapper").hasClass("options"))
			{
				$("#wrapper").toggleClass("glossary");
			}
			else
			{
				$("#wrapper").toggleClass("toggled-left").toggleClass("glossary");
			}
			$("#wrapper").removeClass("toggled-right outline material options");
		},
		
		navCourseMaterial:function ()
		{
			if($("#wrapper").hasClass("outline") || $("#wrapper").hasClass("glossary") || $("#wrapper").hasClass("options"))
			{
				$("#wrapper").toggleClass("material");
			}
			else
			{
				$("#wrapper").toggleClass("toggled-left").toggleClass("material");
			}
			$("#wrapper").removeClass("toggled-right outline glossary options");
		},
	
		svgModal: {
			
			coverLayer:'',
			duration:0,
			epsilon:0,
			aniObject:'',
			init: function (modalTrigger)
			{
				//var modalTriggerBts = $('a[data-type="cd-modal-trigger"]'),
				ui.svgModal.coverLayer = $('.cd-cover-layer');
				
				ui.svgModal.duration = 600;
				ui.svgModal.epsilon = (1000 / 60 / ui.svgModal.duration) / 4;
				ui.svgModal.aniObject = ui.svgModal.bezier(.63,.35,.48,.92, ui.svgModal.epsilon);
				
				$('a[data-type="cd-modal-trigger"]').each(function(){
					//ui.svgModal.init($(this));
					
					var modalTriggerId =  $(this).attr('id'),
						modal = $('.cd-modal[data-modal="'+ modalTriggerId +'"]'),
						svgCoverLayer = modal.children('.cd-svg-bg'),
						paths = svgCoverLayer.find('path'),
						pathsArray = [];
					
					//store Snap objects
					pathsArray[0] = Snap('#'+paths.eq(0).attr('id')),
					pathsArray[1] = Snap('#'+paths.eq(1).attr('id')),
					pathsArray[2] = Snap('#'+paths.eq(2).attr('id'));

					//store path 'd' attribute values	
					var pathSteps = [];
					pathSteps[0] = svgCoverLayer.data('step1');
					pathSteps[1] = svgCoverLayer.data('step2');
					pathSteps[2] = svgCoverLayer.data('step3');
					pathSteps[3] = svgCoverLayer.data('step4');
					pathSteps[4] = svgCoverLayer.data('step5');
					pathSteps[5] = svgCoverLayer.data('step6');
					
					//open modal window
					$(this).on('click', function(event){
						event.preventDefault();
						modal.addClass('modal-is-visible');
						ui.svgModal.coverLayer.addClass('modal-is-visible');
						ui.svgModal.animateModal(pathsArray, pathSteps, ui.svgModal.duration, 'open');
					});

					//close modal window
					modal.on('click', '.modal-close', function(event){
						event.preventDefault();
						modal.removeClass('modal-is-visible');
						ui.svgModal.coverLayer.removeClass('modal-is-visible');
						ui.svgModal.animateModal(pathsArray, pathSteps, ui.svgModal.duration, 'close');
					});
				
				});
			},

			animateModal: function (paths, pathSteps, duration, animationType)
			{
				var path1 = ( animationType == 'open' ) ? pathSteps[1] : pathSteps[0],
					path2 = ( animationType == 'open' ) ? pathSteps[3] : pathSteps[2],
					path3 = ( animationType == 'open' ) ? pathSteps[5] : pathSteps[4];
				paths[0].animate({'d': path1}, duration, ui.svgModal.aniObject);
				paths[1].animate({'d': path2}, duration, ui.svgModal.aniObject);
				paths[2].animate({'d': path3}, duration, ui.svgModal.aniObject);
			},

			bezier: function (x1, y1, x2, y2, epsilon)
			{
				var curveX = function(t){
					var v = 1 - t;
					return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
				};

				var curveY = function(t){
					var v = 1 - t;
					return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
				};

				var derivativeCurveX = function(t){
					var v = 1 - t;
					return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
				};

				return function(t){

					var x = t, t0, t1, t2, x2, d2, i;

					// First try a few iterations of Newton's method -- normally very fast.
					for (t2 = x, i = 0; i < 8; i++){
						x2 = curveX(t2) - x;
						if (Math.abs(x2) < epsilon) return curveY(t2);
						d2 = derivativeCurveX(t2);
						if (Math.abs(d2) < 1e-6) break;
						t2 = t2 - x2 / d2;
					}

					t0 = 0, t1 = 1, t2 = x;

					if (t2 < t0) return curveY(t0);
					if (t2 > t1) return curveY(t1);

					// Fallback to the bisection method for reliability.
					while (t0 < t1){
						x2 = curveX(t2);
						if (Math.abs(x2 - x) < epsilon) return curveY(t2);
						if (x > x2) t0 = t2;
						else t1 = t2;
						t2 = (t1 - t0) * .5 + t0;
					}

					// Failure
					return curveY(t2);
				};
			}
		
		}
		
	}
}();