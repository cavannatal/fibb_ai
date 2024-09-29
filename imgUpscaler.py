import os
import struct

def read_image(file_path):
    with open(file_path, 'rb') as f:
        # Read file header
        header = f.read(54)
        
        # Extract image dimensions
        width = struct.unpack('<I', header[18:22])[0]
        height = struct.unpack('<I', header[22:26])[0]
        
        # Read pixel data
        pixels = []
        for _ in range(height):
            row = []
            for _ in range(width):
                b, g, r = struct.unpack('BBB', f.read(3))
                row.append((r, g, b))
            pixels.append(row)
    
    return pixels, width, height

def write_image(file_path, pixels, width, height):
    with open(file_path, 'wb') as f:
        # Write file header
        f.write(b'BM')
        f.write(struct.pack('<I', 54 + width * height * 3))
        f.write(b'\x00\x00\x00\x00')
        f.write(struct.pack('<I', 54))
        f.write(struct.pack('<I', 40))
        f.write(struct.pack('<I', width))
        f.write(struct.pack('<I', height))
        f.write(struct.pack('<H', 1))
        f.write(struct.pack('<H', 24))
        f.write(b'\x00' * 24)
        
        # Write pixel data
        for row in reversed(pixels):
            for r, g, b in row:
                f.write(struct.pack('BBB', b, g, r))

def upscale_image(input_path, output_path, scale_factor):
    pixels, width, height = read_image(input_path)
    
    new_width = int(width * scale_factor)
    new_height = int(height * scale_factor)
    
    new_pixels = []
    for y in range(new_height):
        row = []
        for x in range(new_width):
            orig_x = int(x / scale_factor)
            orig_y = int(y / scale_factor)
            row.append(pixels[orig_y][orig_x])
        new_pixels.append(row)
    
    write_image(output_path, new_pixels, new_width, new_height)

def process_directory(input_dir, output_dir, scale_factor):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    for filename in os.listdir(input_dir):
        if filename.lower().endswith('.bmp'):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, f"upscaled_{filename}")
            upscale_image(input_path, output_path, scale_factor)
            print(f"Upscaled: {filename}")

# Example usage
input_directory = "input_images"
output_directory = "output_images"
scale_factor = 2.0  # Double the size

process_directory(input_directory, output_directory, scale_factor)
