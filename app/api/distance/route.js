// Berekent de rijafstand van Kimberly's vertrekpunt tot het adres van de klant.
// De API-sleutel blijft server-side, dus die is nooit zichtbaar in de browser.

const ORIGIN = "De Wachterstraat 31, 3650 Dilsen-Stokkem, België"
const GOOGLE_URL = "https://routes.googleapis.com/directions/v2:computeRoutes"

export async function GET(request) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  const { searchParams } = new URL(request.url)
  const destination = searchParams.get("destination")?.trim()

  if (!destination) {
    return Response.json({ error: "Bestemming is verplicht" }, { status: 400 })
  }

  if (!apiKey) {
    console.error("GOOGLE_MAPS_API_KEY ontbreekt in de omgevingsvariabelen.")
    return Response.json({ error: "Berekening tijdelijk niet mogelijk" }, { status: 500 })
  }

  try {
    const response = await fetch(GOOGLE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
      },
      body: JSON.stringify({
        origin: { address: ORIGIN },
        destination: { address: destination },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE_OPTIMAL",
        regionCode: "BE",
      }),
      // dezelfde bestemming hoeft geen tweede keer betaald opgevraagd te worden
      next: { revalidate: 60 * 60 * 24 },
    })

    if (!response.ok) {
      console.error("Google Routes API gaf status", response.status)
      return Response.json({ error: "Berekening mislukt" }, { status: 502 })
    }

    const data = await response.json()
    const meters = data.routes?.[0]?.distanceMeters

    if (!meters) {
      return Response.json({ error: "Locatie niet gevonden" }, { status: 404 })
    }

    return Response.json({ distanceValue: Math.ceil(meters / 1000) })
  } catch (error) {
    console.error("Afstandsberekening mislukt:", error)
    return Response.json({ error: "Er is iets misgegaan bij het berekenen" }, { status: 500 })
  }
}
