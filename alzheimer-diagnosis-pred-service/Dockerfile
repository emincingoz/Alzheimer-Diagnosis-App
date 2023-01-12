#FROM python:3.10-slim

# Install the required libraries
#RUN pip install -r requirements.txt
#COPY requirements.txt /tmp/requirements.txt
#RUN python3 -m pip install -r /tmp/requirements.txt

# Copy the source code to the container
#COPY . /app
#WORKDIR /app

# Expose the port on which the app will run
#EXPOSE 80

# Define environment variable
#ENV NAME World

#ENV PORT 8000

# Run the app when the container is started
#CMD ["python", "main.py"]
#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
#CMD ["uvicorn", "main:app"]
#CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]

FROM python:3.10.0

#
WORKDIR /code

#
COPY ./requirements.txt /code/requirements.txt

#
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Problem and answer
# https://stackoverflow.com/questions/55313610/importerror-libgl-so-1-cannot-open-shared-object-file-no-such-file-or-directo
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y

#RUN apt-get update && apt-get install -y wget

#RUN apt-get install gdown

# Download deep learnin model from drive and copy to model folder
#https://drive.google.com/uc?id=1-25Zjx9fOZigbO4Xks4bOFmKYYC-0LjY&export=download
#RUN gdown https://drive.google.com/uc?id=1-25Zjx9fOZigbO4Xks4bOFmKYYC-0LjY&export=download

#RUN mkdir -p /code/model
#COPY prototype_model.h5 /code/model

#
COPY . /code

#
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]