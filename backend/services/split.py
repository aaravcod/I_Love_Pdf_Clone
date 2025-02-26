import sys
import os
from PyPDF2 import PdfReader, PdfWriter

def split_pdf(input_path, pages, output_path):
    try:
        reader = PdfReader(input_path)
        writer = PdfWriter()
        
        selected_pages = [int(p) for p in pages.strip("[]").split(",")]

        for page_num in selected_pages:
            writer.add_page(reader.pages[page_num])
        
        with open(output_path, "wb") as output_pdf:
            writer.write(output_pdf)

        print(f"Successfully created {output_path}")

    except Exception as e:
        print(f"Error during PDF split: {e}")

if __name__ == "__main__":
    input_file = sys.argv[1]
    pages = sys.argv[2]
    output_file = os.path.join(os.path.dirname(input_file), "split.pdf")  # Save in same folder as input

    print(f"Input file: {input_file}")
    print(f"Selected pages to extract: {pages}")
    print(f"Total pages in the document: {len(PdfReader(input_file).pages)}")

    split_pdf(input_file, pages, output_file)
