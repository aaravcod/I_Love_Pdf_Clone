import sys
import os
import comtypes.client

def ppt_to_pdf(input_path, output_path):
    powerpoint = comtypes.client.CreateObject("PowerPoint.Application")
    powerpoint.Visible = 1  # Run PowerPoint in the background
    presentation = powerpoint.Presentations.Open(os.path.abspath(input_path))
    presentation.SaveAs(os.path.abspath(output_path), 32)  # 32 = PDF format
    presentation.Close()
    powerpoint.Quit()

if __name__ == "__main__":
    input_pptx = sys.argv[1]
    output_pdf = sys.argv[2]
    ppt_to_pdf(input_pptx, output_pdf)
    print(f"Converted {input_pptx} to {output_pdf}")
