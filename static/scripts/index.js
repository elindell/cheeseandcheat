(function($) {
	
    $("document").ready(function() {
        var currentPanelIndex = 0
        , numberOfPanels = 11
        , staticLayerPanelWidth = 800
        , panelSwitchDuration = 2500
		, initialTransitionDuration = 2500
		, captions
		, captionP = $("#captionContainer p")
		, previousButton = $("#previousButton")
		, nextButton = $("#nextButton")
		, animating
        , layers
        , index
        , j
		, storyMode = false;
		
		$.extend($.easing, {
			easeOutBack: function(a,b,c,d,e,f) { 
				f = 1;
				return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c;
			}
		});
		
		layers = [
            {element: $("#layer1"), ratio: .75}
            , {element: $("#layer2"), ratio: 1}
            , {element: $("#layer3"), ratio: 1.5}
        ];
		
		captions = [
			"<p>They met at club Studio 4</p><p>and stole glances of one another across the dance floor.</p><p>Her effortless grace had him in a trance,</p><p>and she could look past his crimes against dance.</p><p>This, boys and girls, was the start of their romance.</p>"
			, "<p>She started at Michigan that fall</p><p>and it wasn't long before they started dating, not at all.</p><p>There were scary new experiences for both, however</p><p>Such as eating not-meat for him, and not-veggies for her.</p>"
			, "<p>Her carnivorous teeth she started to use</p><p>And more colorful items he started to choose</p><p>So began this pattern with the two</p><p>to push each other to things that are new</p>"
			, "<p>Soon their first real challenege would appear</p><p>Evan left for Germany to \"study\" (that is, to drink beer).</p><p>Although it is not what she may have chosen</p><p>They endured by skyping, he in lederhosen.</p>"
			, "<p>After years had passed (or perhaps just sixty days)</p><p>They were reunited where they had once parted ways.</p><p>There wasn't much time where alone they would wander</p><p>Because distance, they had found, makes the heart grow fonder.</p>"
			, "<p>And so continued their frequent adventures</p><p>with his memory of some a bit different from hers.</p><p>Kayla quickly learned from Evan how to drive a stick</p><p>Although some pedestrians had to move pretty quick.</p>"
			, "<p>She showed him a few things as well</p><p>Such as pitching a tent, which he thought went swell.</p><p>And after days of rain and a raccoon vandal,</p><p>There wasn't much this team thought they couldn't handle.</p>"
			, "<p>But she was jealous of his time in the mountains,</p><p>and in a place in which beer practically flowed from the fountains.</p><p>So this time Evan was the one life tried to dishearten,</p><p>as the girl of his dreams sat in a biergarten.</p>"
			, "<p>They were reunited and spent a summer in bliss.</p><p>It was these times they soon would miss.</p><p>He left for a job, and the distance tugged on his heartstrings</p><p>Enough was enough! He began his search for her ring.</p>"
			, "<p>So at the next holiday, Thanksgiving in fact,</p><p>confidence (as well as the ring) Evan had packed.</p><p>With her parents' blessing and ring in hand, his love for her he began to express.</p><p>While looking at the man of her dreams down on one knee, she said, \"Yes!\"</p>"
			, "<p>Now you know the story of Kayla and Evan,</p><p>the history of what some would call a match made in heaven.</p><p>The day of wedding bells they are now eagerly awaiting,</p><p>so please, come join them in celebrating!</p>"
		];
		
		captionP.html(captions[0]);
		
        for (index = 0; index < layers.length; index++) {
            layers[index].element.css({width: numberOfPanels * layers[index].ratio * staticLayerPanelWidth});
        }
		
		function beginStory(e) {
			e.preventDefault();
			
			$('#letUsTellYouOurStory').unbind('click');
			$('#letUsTellYouOurStory').remove();
				
			$("#homeElements").animate({left: -1200}, initialTransitionDuration, 'swing', function() {
				//NO TURNIN' BACK NOW
				$('#homeElements').remove();
			});
			
			$("#tree").animate({right: 930}, initialTransitionDuration);
			
			$("#theaterAndCaptionContainer").animate({left: 140}, initialTransitionDuration, 'swing', function() {
				$("#smallEK").fadeIn();
				nextButton.fadeIn();
				storyMode = true;
			});
		}
        
        function goToNextPanel(e) {
			e.preventDefault();
			if (animating) {
				return;
			}
			
            if (currentPanelIndex < numberOfPanels - 1) { 
                currentPanelIndex = currentPanelIndex + 1;
                scrollToPanel(currentPanelIndex, panelSwitchDuration);
            }
        }
        
        function goToPreviousPanel(e) {
			e.preventDefault();
			if (animating) {
				return;
			}
			
            if (currentPanelIndex > 0) {
                currentPanelIndex = currentPanelIndex - 1;
                scrollToPanel(currentPanelIndex, panelSwitchDuration);
            }
        }
 
        function scrollToPanel(panelIndex, animationDuration) {
            var index;
            
            if (panelIndex < 0 || panelIndex > numberOfPanels) {
                return;
            }
			
			animating = true;
			
			//Fade the last caption out and the next one in
			captionP.fadeOut(panelSwitchDuration/2, function() {
				captionP.html(captions[panelIndex]);
				captionP.fadeIn(animationDuration/2);
			});
			
			//Switch the layers
            for (index = 0; index < layers.length; index++) {
                layers[index].element.animate({left: getOffset(layers[index].ratio, panelIndex)}, animationDuration, 'easeOutBack', function () {
                	animating = false;
                });
			}
			
			if (panelIndex === 0) {
				previousButton.fadeOut(animationDuration/2, function() {
					nextButton.fadeIn(animationDuration/2);
				});
			} else if (panelIndex === numberOfPanels - 1) {
				nextButton.fadeOut(animationDuration/2, function() {
					previousButton.fadeIn(animationDuration/2);
				});
			} else {
				previousButton.fadeIn(animationDuration/2);
				nextButton.fadeIn(animationDuration/2);
			}
        }
        
        function getOffset(ratio, panelIndex) {
            //Account for the initial offset in aligning the panels, then just account for what
            //panel we're on in that layer
            return (staticLayerPanelWidth/2) * (1-ratio) - panelIndex * staticLayerPanelWidth * ratio;
        }
        
        nextButton.click(goToNextPanel);
        previousButton.click(goToPreviousPanel);
		$('#letUsTellYouOurStory').click(beginStory);
		
		$(window).keydown(function (e) {
		  var keyCode = e.keyCode || e.which,
		      arrow = {left: 37, up: 38, right: 39, down: 40 };

		  switch (keyCode) {
		    case arrow.left:
				if (storyMode) {
					goToPreviousPanel(e);
				}
		    break;
		    case arrow.right:
				if (storyMode) {
					goToNextPanel(e);
				}
		      	
		    break;
		  }
		});
		
    });
})($);