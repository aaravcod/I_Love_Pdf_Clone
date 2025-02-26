import sys
import pdfplumber
import pandas as pd

def convert_pdf_to_xlsx(input_pdf, output_xlsx):
    try:
        with pdfplumber.open(input_pdf) as pdf:
            all_data = []
            for page in pdf.pages:
                table = page.extract_table()
                if table:
                    df = pd.DataFrame(table)
                    all_data.append(df)

            if all_data:
                final_df = pd.concat(all_data, ignore_index=True)
                final_df.to_excel(output_xlsx, index=False)
                print(f"Conversion successful: {output_xlsx}")
            else:
                print("No table data found in the PDF.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_pdf_to_excel.py <input.pdf> <output.xlsx>")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_xlsx = sys.argv[2]
    
    convert_pdf_to_xlsx(input_pdf, output_xlsx)
