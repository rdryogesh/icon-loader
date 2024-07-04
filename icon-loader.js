(async function loadIcons() {
  const repo = 'rdryogesh/icon-loader';
  const path = 'icons';
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
  const cdnBaseUrl = `https://cdn.jsdelivr.net/gh/${repo}/${path}/`;

  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error(`GitHub API returned an error: ${response.statusText}`);
      }

      const files = await response.json();

      console.log('Files fetched from GitHub:', files); // Debug log

      for (const file of files) {
          const fileName = file.name;
          if (fileName.endsWith('.svg')) {
              const iconName = `icon-${fileName.replace('.svg', '').toLowerCase()}`;
              const svgUrl = `${cdnBaseUrl}${fileName}`;
              const svgContent = await fetch(svgUrl).then(res => res.text());

              // Find the corresponding div by id and add the SVG content
              const targetElement = document.getElementById(iconName);
              if (targetElement) {
                  targetElement.innerHTML = svgContent;
                  targetElement.style.display = 'block'; // Show the div after adding content
              } else {
                  console.warn(`Element with id '${iconName}' not found.`);
              }
          }
      }
  } catch (error) {
      console.error('Error loading icons:', error);
  }
})();
