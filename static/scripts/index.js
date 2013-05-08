(function($) {
	
    $("document").ready(function() {
        var currentPanelIndex = 0
        , numberOfPanels = 11
        , staticLayerPanelWidth = 800
        , panelSwitchDuration = 3000
		, initialTransitionDuration = 2500
		, captions
		, captionP = $("#captionContainer p")
		, previousButton = $("#previousButton")
		, nextButton = $("#nextButton")
		, animating
        , layers
        , index
        , j;
		
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
			"Caption one"
			, "Caption two"
			, "Caption three"
			, "Caption four"
			, "Caption five"
			, "Caption six"
			, "Caption seven"
			, "Caption eight"
			, "Caption nine"
			, "Caption ten"
		];
		
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
				captionP.text(captions[panelIndex]);
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
            //panel in that layer we're on
            return (staticLayerPanelWidth/2) * (1-ratio) - panelIndex * staticLayerPanelWidth * ratio;
        }
        
        nextButton.click(goToNextPanel);
        previousButton.click(goToPreviousPanel);
		$('#letUsTellYouOurStory').click(beginStory);
    });
})($);