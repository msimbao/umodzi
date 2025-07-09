import base64

filepath = "30.png"

binary_fc       = open(filepath, 'rb').read()  # fc aka file_content
base64_utf8_str = base64.b64encode(binary_fc).decode('utf-8')

ext     = filepath.split('.')[-1]
dataurl = f'data:image/{ext};base64,{base64_utf8_str}'


with open("output.txt", "w") as file:
    file.write(dataurl)