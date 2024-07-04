document.addEventListener("DOMContentLoaded", function () {
  const SHARED_LINK =
    "https://www.dropbox.com/scl/fo/omoewdhu9hvw8g2ikhg6r/AFqqUGy7_lxChL7G1xlq6TA?rlkey=ot8jtny9vohttjp3zbxc1vlib&st=1g9kqv1q&dl=0";

  async function fetchIconsList(sharedLink) {
    const response = await fetch(
      "https://api.dropboxapi.com/2/sharing/get_shared_link_metadata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: sharedLink,
        }),
      }
    );

    const metadata = await response.json();
    const folderPath = metadata.path_lower;

    const listResponse = await fetch(
      "https://api.dropboxapi.com/2/files/list_folder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: folderPath,
        }),
      }
    );

    const data = await listResponse.json();
    return data.entries.filter(
      (entry) => entry[".tag"] === "file" && entry.name.endsWith(".svg")
    );
  }

  async function fetchIcon(sharedLink, iconPath) {
    const response = await fetch(
      "https://content.dropboxapi.com/2/files/download",
      {
        method: "POST",
        headers: {
          "Dropbox-API-Arg": JSON.stringify({ path: iconPath }),
        },
      }
    );

    return response.text();
  }

  async function loadIcons() {
    const iconsList = await fetchIconsList(SHARED_LINK);
    const iconContainer = document.createElement("div");
    iconContainer.id = "icon-container";
    iconContainer.style.display = "none";

    for (const icon of iconsList) {
      const iconName = icon.name.replace(".svg", "");
      const svgContent = await fetchIcon(SHARED_LINK, icon.path_lower);
      const svgElement = document.createElement("div");
      svgElement.innerHTML = svgContent;
      svgElement.id = iconName;
      iconContainer.appendChild(svgElement);
    }

    document.body.appendChild(iconContainer);
  }

  loadIcons();
});
