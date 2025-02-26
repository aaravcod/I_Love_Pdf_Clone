import sys
import os
import comtypes.client

def excel_to_pdf(input_path, output_path):
    excel = comtypes.client.CreateObject("Excel.Application")
    excel.Visible = False  # Run Excel in the background
    wb = excel.Workbooks.Open(os.path.abspath(input_path))
    wb.ExportAsFixedFormat(0, os.path.abspath(output_path))  # 0 = PDF format
    wb.Close(False)
    excel.Quit()

if __name__ == "__main__":
    input_xlsx = sys.argv[1]
    output_pdf = sys.argv[2]
    excel_to_pdf(input_xlsx, output_pdf)
    print(f"Converted {input_xlsx} to {output_pdf}")
