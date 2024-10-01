import os
from PIL import Image

def wipe_metadata(image_path):
    try:
        # Open the image
        with Image.open(image_path) as img:
            # Create a new image without metadata
            data = list(img.getdata())
            image_without_exif = Image.new(img.mode, img.size)
            image_without_exif.putdata(data)

         # Save the image without metadata
        filename, extension = os.path.splitext(image_path)
        new_filename = f"{filename}_clean{extension}"
        image_without_exif.save(new_filename)
        print(f"Metadata wiped: {new_filename}")
    except Exception as e:
        print(f"Error processing {image_path}: {str(e)}")

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.gif')):
                image_path = os.path.join(root, file)
    wipe_metadata(image_path)

    if name == "main":
        import sys

    if len(sys.argv) != 2:
        print("Usage: python script.py <directory_path>")
        sys.exit(1)

    directory_path = sys.argv[1]
    if not os.path.isdir(directory_path):
        print("Error: The specified path is not a directory.")
        sys.exit(1)

    process_directory(directory_path)
    print("Metadata wiping process completed.")
