import sys
from rembg import remove
from PIL import Image

try:
    input_path = 'profile.jpeg'
    output_path = 'profile.png'

    print(f"Loading {input_path}...")
    input_image = Image.open(input_path)

    print("Removing background... this may take a moment.")
    output_image = remove(input_image)

    output_image.save(output_path)
    print(f"Success! Saved as {output_path}")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
