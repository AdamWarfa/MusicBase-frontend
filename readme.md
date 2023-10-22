# Musikoplysninger - Frontend

Dette er frontend-delen af projektet, der giver brugergrænsefladen til at søge og vise musikrelaterede oplysninger ved hjælp af HTML, CSS og JavaScript.

## Installation

Dette projekt er hostet på GitHub Pages, så du kan besøge det ved at gå til følgende webadresse:

[Link til GitHub Pages](https://adamwarfa.github.io/MusicBase-frontend/)

## Brug

Når du besøger webstedet, vil du blive mødt med en enkel brugergrænseflade. Her er nogle af de funktioner, du kan bruge:

1. **Søgning:** Du kan søge efter en kunstner (artist), et album eller en sang (track) ved at indtaste dit søgekriterium i søgefeltet og trykke på "Søg" knappen.

2. **Visning af resultater:** Efter at have udført en søgning, vil du se lister med alle kunstnere, albums eller sange, der matcher dit søgekriterium.

3. **Visning af albums:** Du kan også vælge at se alle albums udgivet af en bestemt kunstner ved at søge på kunstneren.

4. **Visning af sange:** Hvis du søger på et album , vil du se en liste med alle sange på det valgte album.

## Kodeopbygning

Dette projekt er opbygget med fokus på god kodestruktur og principper som separation of concerns, loose coupling og high cohesion. Her er en oversigt over kodestrukturen:

- **HTML:** Den primære HTML-fil for brugergrænsefladen.

- **CSS:** stylesheet til at style brugergrænsefladen.

- **JavaScript:** Koden er opdelt i moduler for at adskille adgang til backenden, datahåndtering i frontend og visning af data. Disse moduler kan omfatte:

  - `search.js`: Ansvarlig for at håndtere brugerens søgning og kontakte backenden for at hente data.

  - `main.js`: Håndterer opbevaring og manipulation af data i frontend.

  - `rest-services.js`: Ansvarlig for at vores rest-api og kontakten til backend.

## Backend

Repository til backenden findes [her](https://github.com/yousradiab/MusicBase-backend).

den hostede backend kan findes på [azure](https://musicbasebe.azurewebsites.net/).

Dette er en grundlæggende oversigt over projektets struktur.
