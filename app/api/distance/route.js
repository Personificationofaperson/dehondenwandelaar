export async function GET(request) {
    const origin = "De Wachterstraat 31 Dilsen-Stokkem" //maak ook een origin variabele aan voor de request
    const apiKey = process.env.GOOGLE_MAPS_API_KEY //server side only so fully safe
    const {searchParams} = new URL(request.url) //new maakt nieuw interpreteerbare URL. Via searchparams halen we enkel de parameters uit de string
    const googleURL = "https://routes.googleapis.com/directions/v2:computeRoutes"

    try {
    const destination = searchParams.get("destination") //haal key "destination" uit JS-object

    if (!destination) {
        console.warn("⚠️ Frontend Error: Gebruiker is de bestemming vergeten in te vullen.")
        return Response.json({error: "Bestemming is verplicht"}, {status:400});
    }

    const response = await fetch(googleURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "routes.distanceMeters,routes.duration"
        },
        body: JSON.stringify({
            "origin": {"address": origin},
            "destination": {"address": destination},
            "travelMode": "DRIVE",
            "routingPreference": "TRAFFIC_AWARE_OPTIMAL"
        })
    });

    if (!response.ok) {
        throw new Error(`Google Maps API is niet bereikbaar en gaf foutcode ${response.status}`);
    }

    const data = await response.json() //we wachten nog eens tot we de volledige data binnenkrijgen (eerst alleen headers) en zetten deze om naar JSON
    console.log("google response", JSON.stringify(data))
    const meters = data.routes?.[0]?.distanceMeters;

    if (!meters) {
        return Response.json({error: "Locatie niet gevonden"}, {status: 404});
    }

    const kilometers = Math.ceil(meters/1000);

    return Response.json({
        distanceValue: kilometers
    })

    } catch (error) {
        return Response.json({error: "Er is iets misgegaan bij het berekenen van de afstand"},
            {status: 500}
        );
    }
}