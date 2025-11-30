# Variant Constraints Configuratie

Dit bestand beschrijft hoe je afhankelijkheden en beperkingen kunt instellen voor verschillende raam-, deur- en glastypen.

## Bestandsstructuur

Het bestand `variant-constraints.json` bevat de configuratie in JSON formaat met de volgende structuur:

```json
{
  "ramen": {
    "variant_naam": {
      "minBreedte": 300,
      "maxBreedte": null,
      "minHoogte": null,
      "maxHoogte": 2200,
      "opmerking": "Beschrijving van de beperkingen"
    }
  },
  "deuren": { ... },
  "glas": { ... }
}
```

## Velden

- **minBreedte**: Minimale breedte in millimeters (null = geen beperking)
- **maxBreedte**: Maximale breedte in millimeters (null = geen beperking)
- **minHoogte**: Minimale hoogte in millimeters (null = geen beperking)
- **maxHoogte**: Maximale hoogte in millimeters (null = geen beperking)
- **opmerking**: Optionele beschrijving van de beperkingen

## Voorbeelden

### Draaikiep raam
```json
"draaikiep": {
  "minBreedte": 300,
  "maxBreedte": null,
  "minHoogte": null,
  "maxHoogte": 2200,
  "opmerking": "Draaikiep raam heeft minimale breedte van 300mm en maximale hoogte van 2200mm"
}
```

### Raam zonder beperkingen
```json
"draairaam_buiten": {
  "minBreedte": null,
  "maxBreedte": null,
  "minHoogte": null,
  "maxHoogte": null,
  "opmerking": "Geen specifieke afmetingsbeperkingen"
}
```

## Uitbreiden

Om nieuwe beperkingen toe te voegen:

1. Open `variant-constraints.json`
2. Zoek de juiste categorie (ramen, deuren, of glas)
3. Voeg een nieuwe variant toe of pas een bestaande aan
4. Stel de gewenste waarden in (null voor geen beperking)

## Gebruik in code

Dit bestand kan worden ingeladen in JavaScript met:

```javascript
fetch('variant-constraints.json')
  .then(response => response.json())
  .then(constraints => {
    // Gebruik constraints hier
    const draaikiepConstraints = constraints.ramen.draaikiep;
    // Valideer afmetingen
  });
```

## Toekomstige uitbreidingen

Dit bestand kan later worden uitgebreid met:
- Gewichtsbeperkingen
- Materiaalspecificaties
- Prijsinformatie
- Levertijden
- Technische specificaties
- Installatievereisten

