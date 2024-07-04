async function loadIcons() {
  const repo = "your-username/your-repository"; // Replace with your GitHub username and repository name
  const cdnBaseUrl = `https://${repo}.github.io/icons/`;

  try {
      const response = await fetch(`${cdnBaseUrl}icons.json`);
      if (!response.ok) {
          throw new Error(`Failed to fetch icons.json: ${response.statusText}`);
      }

      const files = await response.json();

      console.log("Files fetched from GitHub Pages:", files); // Debug log

      for (const fileName of files) {
          if (fileName.endsWith(".svg")) {
              const iconName = `icon-${fileName.replace(".svg", "").toLowerCase()}`;
              const svgUrl = `${cdnBaseUrl}${fileName}`;
              const svgContent = await fetch(svgUrl).then(res => res.text());

              const iconDiv = document.createElement("div");
              iconDiv.id = iconName;
              iconDiv.style.display = "none"; // Hide the div initially
              iconDiv.innerHTML = svgContent;

              // Find the corresponding div by id and add the SVG content
              const targetElement = document.getElementById(iconName);
              if (targetElement) {
                  targetElement.innerHTML = svgContent;
                  targetElement.style.display = "block"; // Show the div after adding content
              } else {
                  console.warn(`Element with id '${iconName}' not found.`);
              }
          }
      }
  } catch (error) {
      console.error("Error loading icons:", error);
  }
}

// Call loadIcons() function when the page loads
document.addEventListener("DOMContentLoaded", loadIcons);
