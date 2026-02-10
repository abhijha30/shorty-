async function shorten() {
  const url = document.getElementById("urlInput").value;

  if (!url) {
    alert("Please enter a URL");
    return;
  }

  const res = await fetch("/api/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  const data = await res.json();

  document.getElementById("result").innerHTML =
    `<a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
}
