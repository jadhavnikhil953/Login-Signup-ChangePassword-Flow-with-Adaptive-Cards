import { Component, OnInit } from '@angular/core';
import * as AdaptiveCards from "adaptivecards";

@Component({
  selector: 'app-adaptivecards',
  templateUrl: './adaptivecards.component.html',
  styleUrls: ['./adaptivecards.component.css']
})
export class AdaptivecardsComponent implements OnInit {

  constructor() {
    // Author a card
// In practice you'll probably get this from a service
// see http://adaptivecards.io/samples/ for inspiration
const adaptiveCardJSON = {
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.6",
  "fallbackText": "This card requires CaptionSource to be viewed. Ask your platform to update to Adaptive Cards v1.6 for this and more!",
  "body": [
    {
      "type": "Media",
      "poster": "https://adaptivecards.io/content/poster-video.png",
      "sources": [
        {
          "mimeType": "video/mp4",
          "url": "https://adaptivecardsblob.blob.core.windows.net/assets/AdaptiveCardsOverviewVideo.mp4"
        }
      ],
      "captionSources": [
        {
          "mimeType": "vtt",
          "label": "English (vtt)",
          "url": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/5ac07e8adb8d7dcd7480973321e57d279d1f7d2c/assets/ProductVideoSubtitles.vtt"
        },
        {
          "mimeType": "srt",
          "label": "English (srt)",
          "url": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/da2eb4ad4de60d14b37decc062d3952da9dbb790/assets/ProductVideoSubtitles.srt"
        }
      ]
    }
  ]
}


// Create an AdaptiveCard instance
var adaptiveCard = new AdaptiveCards.AdaptiveCard();

// Set its hostConfig property unless you want to use the default Host Config
// Host Config defines the style and behavior of a card
adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
  fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
  // More host config options
});

// Set the adaptive card's event handlers. onExecuteAction is invoked
// whenever an action is clicked in the card
// adaptiveCard.onExecuteAction = function(action) { alert("Ow!"); }

// For markdown support you need a third-party library
// E.g., to use markdown-it, include in your HTML page:
//     <script type="text/javascript" src="https://unpkg.com/markdown-it/dist/markdown-it.js"></script>
// And add this code to replace the default markdown handler:
//     AdaptiveCards.AdaptiveCard.onProcessMarkdown = function (text, result) {
//         result.outputHtml = markdownit().render(text);
//         result.didProcess = true;
//     };

// Parse the card payload
adaptiveCard.parse(adaptiveCardJSON);

var adaptiveCardContainer = document.getElementById("adaptivecards1")!;
// Render the card to an HTML element:
adaptiveCard.render(adaptiveCardContainer);



   }

   ngOnInit() {
    this.renderAdaptiveCard();
  }

  renderAdaptiveCard() {
    const adaptiveCardJSON = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.6",
      "fallbackText": "This card requires CaptionSource to be viewed. Ask your platform to update to Adaptive Cards v1.6 for this and more!",
      "body": [
        {
          "type": "Media",
          "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8BSJJU-1ncOAFZ1SLRwh317au_szWg0P3iw&usqp=CAU",
          "sources": [
            {
              "mimeType": "video/mp4",
              "url": "https://www.youtube.com/watch?v=JEyO3oJfVWg&t=6153s"
            }
          ],
          "captionSources": [
            {
              "mimeType": "vtt",
              "label": "English (vtt)",
              "url": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/5ac07e8adb8d7dcd7480973321e57d279d1f7d2c/assets/ProductVideoSubtitles.vtt"
            },
            {
              "mimeType": "srt",
              "label": "English (srt)",
              "url": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/da2eb4ad4de60d14b37decc062d3952da9dbb790/assets/ProductVideoSubtitles.srt"
            }
          ]
        }
      ]
    };

    const adaptiveCardContainer = document.getElementById('adaptiveCardContainer')!;
    var adaptiveCard = new AdaptiveCards.AdaptiveCard();
    adaptiveCard.parse(adaptiveCardJSON);
    adaptiveCard.render(adaptiveCardContainer)
  }



}
