import fitz    # <-- PyMuPDF
import sys
import json

# for line in sys.stdin:
#     contract = line[:-1]
#     print(line[:-1])


lines = sys.stdin.readlines()


data = json.loads(lines[0])


contract = data["contract"]
signature_path = data["signature_path"]
print()

# open the PDF
doc = fitz.open("./"+contract)

# where to put image: use upper left corner
rect = fitz.Rect(10, 15, 25, 30)

p = 0
x = 0
y = 0

if contract == "TUWAMIF_AND_EMPLOYEE _ON_SUBSISTENCE_ALLOWANCE.pdf":
    p = 4
    x = 375
    y = 145
if contract == "TUWAMIF_AND_EMPLOYEE_ON_FIXED_DEPOSIT_ALLOWANCE.pdf":
    p = 3
    x = 395
    y = 473
if contract == "TUWAMIF_AND_EMPLOYEE_CHILD_SUPPORT_ALLOWANCE.pdf":
    p = 3
    x = 400
    y = 646
if contract == "TUWAMIF_AND_EMPLOYEE _ON_EDUCATION_ALLOWANCE.pdf":
    p = 4
    x = 105
    y = 357

m = fitz.Matrix(1, 1, 1, 1, x, y)
rect.transform(m)

# 80
doc[p].insertImage(rect, filename="./"+signature_path)

# for page in doc:
#     if page == "page 4 of TUWAMIF_AND_EMPLOYEE_ON_FIXED_DEPOSIT_ALLOWANCE.pdf" :
#        print(page)
#        page.insertImage(rect, filename="pnisher.png")

doc.saveIncr()  # do an incremental save
