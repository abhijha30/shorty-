async function shorten() {
  const input = document.getElementById("urlInput");
  const longUrl = input.value.trim();

  if (!longUrl) {
    alert("Please enter a URL");
    return;
  }

  try {
    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: longUrl })
    });

    if (!response.ok) {
      throw new Error("Failed to shorten URL");
    }

    const data = await response.json();
    const shortUrl = data.shortUrl;

    // Show short link
    const shortLink = document.getElementById("shortLink");
    shortLink.href = shortUrl;
    shortLink.innerText = shortUrl;

    // Generate QR for short URL
    const qrUrl =
      "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
      encodeURIComponent(shortUrl);

    const qrImage = document.getElementById("qrImage");
    qrImage.src = qrUrl;
    qrImage.alt = "Shorty QR Code";

    // Enable QR download
    const downloadBtn = document.getElementById("downloadQR");
    downloadBtn.href = qrUrl;

    // Show result section
    document.getElementById("result").classList.remove("hidden");

  } catch (error) {
    alert("Something went wrong. Please try again.");
    console.error(error);
  }
}
