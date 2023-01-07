from fastapi import FastAPI, File, UploadFile
from PIL import Image
import os.path
import pathlib
from predict import *

app = FastAPI()
test_image_path = '../alzheimer-diagnosis-pred-service/images/'

@app.post("/upload-mri-file/")
async def create_upload_file(file: UploadFile):
    completeName = get_saving_path(file)
    try:
        await write_image_to_directory(file, completeName)
        predResult = predictClass(test_image_path, file.filename)
        return predResult
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()

    #show_saved_image(completeName)

    return {"message": f"Successfully uploaded {file.filename}"}

def get_saving_path(file):
    save_path = pathlib.Path().resolve()

    if not os.path.exists('images'):
        os.makedirs('images')

    completeName = os.path.join(save_path, "images", file.filename)

    return completeName

async def write_image_to_directory(file, completeName):

    contents = file.file.read()
    with open(completeName, 'wb') as f:
        f.write(contents)

def show_saved_image(completeName):
    image = Image.open(completeName)