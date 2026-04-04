# Snappthis - Design Challenge - Data ophalen uit database
In sprint 8 hebben we de opdracht gekregen om een website/webapplicatie te ontwikkelen voor een opdrachtgever, samen met meerdere 1e jaars FDND-studenten. Tijdens deze tweede sprint (sprint 9) heb ik mij gericht op het POST'en (uploaden) van foto's naar de [FDND Directus database - Snappthis](https://fdnd-agency.directus.app/items/snappthis_group?fields=name,snappmap.snappthis_snapmap_uuid.*) en het ophalen van de geuploade foto's. Ik heb gebruik gemaakt van NodeJS, Express, JSON en Liquid.

#### Wat is Snappthis?
Snappthis is een mobiele webapplicatie waarmee gebruikers foto's delen binnen
zogenoemde snappmaps. Een gebruiker wordt uitgenodigd in een groep; die groep kan
meerdere snappmaps bevatten. Een begeleider, bijvoorbeeld een docent, maakt een
snappmap aan en geeft deze een thema of opdracht. Deelnemers delen hierin zelfgemaakte
foto's, die dienen als inspiratie- en gespreksonderwerp vanuit de echte wereld.

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
Voor het verder ontwikkelen van de website/ webapplicatie heb ik mij deze tweede sprint (sprint 9) gericht op het POST'en (uploaden) van foto's naar de [FDND Directus database - Snappthis](https://fdnd-agency.directus.app/items/snappthis_group?fields=name,snappmap.snappthis_snapmap_uuid.*) en het ophalen van de geuploade foto's. Aan de hand van [ontwerpen van de opdrachtgever](https://www.figma.com/design/0sXvjvqboOmfDuFMUcRHJh/2025snappthisDesign?node-id=0-1&t=wNnupeKFPlzL0bBO-1) heb ik eerst een [User Story](https://github.com/SieuwkeSheta/the-web-is-for-everyone-interactive-functionality/issues/7) gemaakt om de 'User Generated Content' te onderzoeken. Daarna heb ik een [Wireflow/ Screenflow](https://github.com/SieuwkeSheta/the-web-is-for-everyone-interactive-functionality/issues/15) gemaakt met verschillende UI states, zoals een 'error state' en een 'succes state' voor als het POST'en (uploaden) van de foto wel of niet gelukt is. Vanuit de wireflow/ screnflow heb ik [Breakdown schetsen](https://github.com/SieuwkeSheta/the-web-is-for-everyone-interactive-functionality/issues/4) gemaakt om te onderzoeken welke code ik nodig zou hebben voor het maken van deze 'User Generated Content'. 

Link naar website: https://the-web-is-for-everyone-interactive-s6yl.onrender.com/groups

<img width="800" alt="all-devices-black(5)" src="https://github.com/user-attachments/assets/005e0c23-04a1-4ced-b77d-b9405477d4e0" />

> _Mockup van de Snappthis upload pagina_


## Gebruik
Als gebruiker wil je een foto kunnen maken en uploaden naar een Snappmap, zodat je over de foto kan praten met de groep. 

<img width="800" alt="image" src="https://github.com/user-attachments/assets/64acfa4f-bf84-48d0-8db6-953f4d3b2ff0" />

>_[Wireflow](https://www.figma.com/design/CWbf0ryEYaCeoeqj8jnGHe/Snappthis---Design-Challenge?node-id=268-2309&t=p6MXRPEoSPErgiiK-1) van het uploaden van een foto naar een Snappmap_

## Kenmerken
Ik heb gebruik gemaakt van HTML, CSS, JS, NodeJS, Express, JSON en Liquid. 

**POST**
<br> Voor het POST'en (uploaden) van een foto wordt er eerst een [formulier](https://github.com/SieuwkeSheta/the-web-is-for-everyone-interactive-functionality/blob/5aec946f6ddd5e0f4b94745c5b53ee84b5b5c387/views/capture-snapp.liquid#L15-L33) met data van de foto (met behulp van [Multer](https://www.npmjs.com/package/multer)) [doorgestuurd](https://github.com/SieuwkeSheta/the-web-is-for-everyone-interactive-functionality/blob/5aec946f6ddd5e0f4b94745c5b53ee84b5b5c387/server.js#L160-L177) naar de database, daarna wordt er in de server.js [gekeken](https://github.com/SieuwkeSheta/the-web-is-for-everyone-interactive-functionality/blob/5aec946f6ddd5e0f4b94745c5b53ee84b5b5c387/server.js#L179-L185) of er een 'ID' aan de foto is gekoppeld. Als dat zo is, dan [passen we de data](https://github.com/SieuwkeSheta/the-web-is-for-everyone-interactive-functionality/blob/5aec946f6ddd5e0f4b94745c5b53ee84b5b5c387/server.js#L189-L207) van de foto aan zodat we de foto makkelijker kunnen ophalen uit de database. Als dat allemaal gebeurd is, wordt de foto opgehaald uit de database en [laten zien op de pagina](https://github.com/SieuwkeSheta/the-web-is-for-everyone-interactive-functionality/blob/5aec946f6ddd5e0f4b94745c5b53ee84b5b5c387/views/one-snappmap.liquid#L43) met Liquid.

**Preview foto**
<br> Voor het laden van een preview foto, tijdens het POST'en (uploaden), heb ik gebruik gemaakt van (client side) [JS](https://github.com/SieuwkeSheta/the-web-is-for-everyone-interactive-functionality/blob/5aec946f6ddd5e0f4b94745c5b53ee84b5b5c387/public/scripts/client.js#L1-L33). Er wordt gekeken of het `<input`-element veranderd is, dus dat er een foto is toegevoegd, daarna wordt er van de opgehaalde foto met data een `<img>`-element gemaakt en die 'src' wordt toegevoegd aan het bestaande `<img>`-element zodat die overschreden wordt. 


<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framework of library gebruikt? -->

## Installatie
Volg deze stappen om de development omgeving in te richten om aan deze repository te kunnen werken:

Stap 1) installeer de [NodeJS ontwikkelomgeving](https://nodejs.org/en/download). Kies voor NodeJS 24.13.0 (LTS, long-term support), download het installatiebestand en doorloop het installatieproces.

Stap 2) Fork deze repository, *clone* deze op jouw computer en open het in VSCodium/ een code editor.

Stap 3) Open de Terminal in VSCodium, Voer in de terminal het commando `npm install uit` door het in te typen en op enter te drukken.

Stap 4) Om `multipart/form-data` (bestanden) te kunnen POST'en is het handig om [Multer](https://www.npmjs.com/package/multer) te installeren in de terminal. 

Stap 5) Na de installatie is de map `node_modules` aangemaakt, en gevuld met allerlei packages. Start de website door in de terminal het comando `npm start` uit te voeren. Als het goed is, komt hier een melding te staan over het opstarten van de server: Application started on http://localhost:8000 — Open deze URL in je browser


## Bronnen
- [Figma ontwerpen van de opdrachtgever](https://www.figma.com/design/0sXvjvqboOmfDuFMUcRHJh/2025snappthisDesign?node-id=0-1&t=FGaH92iMbFUM6n4w-1)
- [Mijn Figma ontwerpen](https://www.figma.com/design/CWbf0ryEYaCeoeqj8jnGHe/Snappthis---Sprint-8?node-id=0-1&t=TdQ73KwwxC3cZGt7-1)
- [FDND Directus Snappthis database](https://fdnd-agency.directus.app/items/snappthis_group?fields=name,snappmap.snappthis_snapmap_uuid.*)
- [Filter rules - @Directus](https://directus.io/docs/guides/connect/filter-rules)
- [Liquid Markup - @Modyo Docs](https://docs.modyo.com/en/platform/channels/liquid-markup.html)
- [Multer](https://www.npmjs.com/package/multer)

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
