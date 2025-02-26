import sys
import os
from pypdf import PdfReader, PdfWriter

def encrypt_pdf(input_pdf, output_pdf, password):
    try:
        reader = PdfReader(input_pdf)
        writer = PdfWriter()

        for page in reader.pages:
            writer.add_page(page)

        # Encrypt with password
        writer.encrypt(password)

        with open(output_pdf, "wb") as f:
            writer.write(f)

        print(f"Encrypted PDF saved at: {output_pdf}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python encrypt_pdf.py <input.pdf> <output.pdf> <password>")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_pdf = sys.argv[2]
    password = sys.argv[3]

    if not os.path.exists(input_pdf):
        print("Error: Input file not found!")
        sys.exit(1)

    encrypt_pdf(input_pdf, output_pdf, password)
