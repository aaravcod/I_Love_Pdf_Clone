import sys
from pdf2docx import Converter

def convert_pdf_to_word(input_pdf, output_docx):
    try:
        cv = Converter(input_pdf)
        cv.convert(output_docx, start=0, end=None)  # Convert all pages
        cv.close()
        print("PDF successfully converted to Word.")
        sys.exit(0)
    except Exception as e:
        print(f"Error converting PDF: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python pdftoword.py <input_pdf> <output_docx>", file=sys.stderr)
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_docx = sys.argv[2]

    convert_pdf_to_word(input_pdf, output_docx)
