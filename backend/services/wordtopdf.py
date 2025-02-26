import sys
import os
import comtypes.client

def docx_to_pdf(input_path, output_path):
    word = comtypes.client.CreateObject("Word.Application")
    doc = word.Documents.Open(os.path.abspath(input_path))
    doc.SaveAs(os.path.abspath(output_path), FileFormat=17)  # 17 = PDF format
    doc.Close()
    word.Quit()

if __name__ == "__main__":
    input_docx = sys.argv[1]
    output_pdf = sys.argv[2]
    docx_to_pdf(input_docx, output_pdf)
    print(f"Converted {input_docx} to {output_pdf}")
