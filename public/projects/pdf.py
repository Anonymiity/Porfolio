import pypdf
import os

def auto_split_long_pdf(input_pdf_path, output_pdf_path, target_page_height):
    """
    Automatically slices a single tall PDF page into multiple standard pages 
    until the bottom of the document is reached.
    
    :param input_pdf_path: Path to the input single-page PDF file
    :param output_pdf_path: Path where the output multi-page PDF will be saved
    :param target_page_height: The height you want for each extracted page (in points)
    """
    if not os.path.exists(input_pdf_path):
        print(f"Error: The file '{input_pdf_path}' was not found. Check the path.")
        return

    # Open the input PDF
    reader = pypdf.PdfReader(input_pdf_path)
    writer = pypdf.PdfWriter()
    
    # Get the single giant page and its dimensions
    original_page = reader.pages[0]
    media_box = original_page.mediabox
    
    original_width = media_box.width
    original_height = float(media_box.height)
    
    print(f"Original PDF dimensions: Width = {original_width} pts, Total Height = {original_height} pts")
    
    # Track position from top to bottom
    current_top = original_height
    page_count = 0
    
    # Loop automatically until we reach the bottom (0)
    while current_top > 0:
        page_count += 1
        
        # Calculate the bottom boundary for this current slice
        current_bottom = max(0.0, current_top - target_page_height)
        actual_slice_height = current_top - current_bottom
        
        # Create a clean canvas for the new page
        new_page = pypdf.PageObject.create_blank_page(width=original_width, height=actual_slice_height)
        new_page.merge_page(original_page)
        
        # Crop to the specific target area
        new_page.mediabox.left = 0
        new_page.mediabox.right = original_width
        new_page.mediabox.bottom = current_bottom
        new_page.mediabox.top = current_top
        
        # Add the page to our output document
        writer.add_page(new_page)
        
        # Move the top marker down for the next iteration
        current_top = current_bottom
        
        # Stop safety check to prevent infinite loops if height is misconfigured
        if page_count > 500: 
            print("Safety break: Processed over 500 pages. Check your target height unit.")
            break

    # Save the completed multi-page document
    with open(output_pdf_path, "wb") as output_file:
        writer.write(output_file)
        
    print(f"Done! Successfully generated {page_count} pages in: {output_pdf_path}")

# --- Set Your Configuration Here ---
# 1 inch = 72 points | 1 mm = 2.8346 points
# Example configurations for 'target_page_height':
# For Letter size height (11 inches): 11 * 72 = 792
# For A4 size height (297 mm): 297 * 2.8346 = 842

PAGE_HEIGHT_IN_POINTS = 842  # Change this to your exact required single-page height

# Update with your actual Windows file paths
input_file = r"C:\Users\Tanush Lad\Desktop\input.pdf"
output_file = r"C:\Users\Tanush Lad\Desktop\split_output_fixed.pdf"

auto_split_long_pdf(input_file, output_file, PAGE_HEIGHT_IN_POINTS)
