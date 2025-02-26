import sys
from PyPDF2 import PdfMerger

def merge_pdfs(input_files, output_file):
    merger = PdfMerger()
    for pdf in input_files:
        merger.append(pdf)
    
    merger.write(output_file)
    merger.close()

if __name__ == "__main__":
    input_pdfs = sys.argv[1:-1]  
    output_pdf = sys.argv[-1]    
    merge_pdfs(input_pdfs, output_pdf)
