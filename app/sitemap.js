export default function sitemap() {
  const nu = new Date()
  return [
    {
      url: "https://dehondenwandelaar.be",
      lastModified: nu,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://dehondenwandelaar.be/prijzen",
      lastModified: nu,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ]
}
