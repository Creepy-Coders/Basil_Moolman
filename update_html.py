import os
import glob

html_files = glob.glob('public/*.html')

for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Add favicon
    if '<link rel="icon"' not in content:
        content = content.replace('</head>', '    <link rel="icon" href="favicon.png" type="image/png">\n</head>')
    
    # Update navbar logo
    if '<img src="images/logo-small.png" alt="Logo" class="nav-logo">' not in content:
        content = content.replace('<a href="index.html" class="logo">Basil Moolman</a>', 
                                  '<a href="index.html" class="logo"><img src="images/logo-small.png" alt="Logo" class="nav-logo">Basil Moolman</a>')

    # Update footer logo
    if '<img src="images/logo-small.png" alt="Logo" class="footer-logo">' not in content:
        content = content.replace('<h4 class="logo" style="font-size: 1.2rem;">Basil Moolman</h4>', 
                                  '<h4 class="logo" style="font-size: 1.2rem;"><img src="images/logo-small.png" alt="Logo" class="footer-logo">Basil Moolman</h4>')

    with open(filepath, 'w') as f:
        f.write(content)

print("Updated HTML files.")
