import sys
import PyPDF2

def unlock_pdf(input_file, output_file, password):
    try:
        with open(input_file, "rb") as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)

            if reader.is_encrypted:
                if not reader.decrypt(password):
                    print("Error: Incorrect password", file=sys.stderr)
                    sys.exit(1)

            writer = PyPDF2.PdfWriter()
            for page in reader.pages:
                writer.add_page(page)

            with open(output_file, "wb") as output_pdf:
                writer.write(output_pdf)

        print("PDF unlocked successfully")
        sys.exit(0)

    except Exception as e:
        print(f"Error unlocking PDF: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python unlock.py <input_file> <output_file> <password>", file=sys.stderr)
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    password = sys.argv[3]

    unlock_pdf(input_file, output_file, password)
