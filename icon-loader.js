(async function loadIcons() {
  const repo = 'rdryogesh/icons';
  const path = 'icons';
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
  const cdnBaseUrl = `https://cdn.jsdelivr.net/gh/${repo}/${path}/`;

  try {
      const response = await fetch(apiUrl);
      const files = await response.json();

      for (const file of files) {
          const fileName = file.name;
          const iconName = `icon-${fileName.replace('.svg', '').toLowerCase()}`;
          const svgUrl = `${cdnBaseUrl}${fileName}`;
          const svgResponse = await fetch(svgUrl);
          const svgContent = await svgResponse.text();

          const iconDiv = document.createElement('div');
          iconDiv.id = iconName;
          iconDiv.style.display = 'none';
          iconDiv.innerHTML = svgContent;

          document.body.appendChild(iconDiv);
      }
  } catch (error) {
      console.error('Error loading icons:', error);
  }
})();
