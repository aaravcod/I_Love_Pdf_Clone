import sys
from pypdf import PdfReader, PdfWriter

def compress_pdf(input_pdf, output_pdf):
    try:
        reader = PdfReader(input_pdf)
        writer = PdfWriter()

        for page in reader.pages:
            writer.add_page(page)  # Add page first
            writer.pages[-1].compress_content_streams()  # Compress the last added page

        with open(output_pdf, "wb") as f:
            writer.write(f)

        print(f"Compression successful: {output_pdf}")

    except Exception as e:
        print(f"Error compressing PDF: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python compresspdf.py <input.pdf> <output.pdf>")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_pdf = sys.argv[2]

    compress_pdf(input_pdf, output_pdf)
