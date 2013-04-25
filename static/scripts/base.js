(function($) {
	
    $("document").ready(function() {
        var currentPanelIndex = 0
        , numberOfPanels = 11
        , staticLayerPanelWidth = 800
        , panelSwitchDuration = 3000
		, captions
		, captionP = $("#captionContainer p")
		, animating
        , layers
        , index
        , j;
		
		$.easing = {
			linear: function( p ) {
				return p;
			},
			swing: function( p ) {
				//return 0.5 - Math.cos( p*Math.PI ) / 2;
				var easeIn = function(p) {
					return p * p * (3*p - 2);
				};
				return p < 0.5 ?
							easeIn( p * 2 ) / 2 :
							1 - easeIn( p * -2 + 2 ) / 2;
			}
		};
		
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
        
        function goToNextPanel(e) {
			e.preventDefault();
			if (animating) {
				return;
			}
			animating = true; 
            if (currentPanelIndex < numberOfPanels - 1) {
                currentPanelIndex = currentPanelIndex + 1;
                scrollToPanel(currentPanelIndex);
            }
        }
        
        function goToPreviousPanel(e) {
			e.preventDefault();
			if (animating) {
				return;
			}
			animating = true;
            if (currentPanelIndex > 0) {
                currentPanelIndex = currentPanelIndex - 1;
                scrollToPanel(currentPanelIndex);
            }
        }
 
        function scrollToPanel(panelIndex) {
            var index
            , offsets = [];
            
            if (panelIndex < 0 || panelIndex > numberOfPanels) {
                return;
            }
            
            //Shouldn't take much time to calculate the offset, but I calculate the offsets
            //in batch so I can run the animations as close together as possible.
            for (index = 0; index < layers.length; index++) {
                offsets.push(getOffset(layers[index].ratio, panelIndex));
            }
            
			captionP.fadeOut(panelSwitchDuration/2, function() {
				captionP.text(captions[panelIndex]);
				captionP.fadeIn(panelSwitchDuration/2);
			});
			
            for (index = 0; index < layers.length; index++) {
                layers[index].element.animate({left: offsets[index]}, panelSwitchDuration, 'swing', function () {
                	animating = false;
                });
			}
        }
        
        function getOffset(ratio, panelIndex) {
            //Account for the initial offset in aligning the panels, then just account for what
            //panel in that layer we're on
            return (staticLayerPanelWidth/2) * (1-ratio) - panelIndex * staticLayerPanelWidth * ratio;
        }
        
        scrollToPanel(0);
        
        $('#nextButton').click(goToNextPanel);
        $('#previousButton').click(goToPreviousPanel);
    });
})($);