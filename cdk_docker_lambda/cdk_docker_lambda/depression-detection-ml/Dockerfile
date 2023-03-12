FROM amazon/aws-lambda-python:latest

LABEL maintainer="Oguzhan Yangoz"
# Installs python, removes cache file to make things smaller
RUN yum update -y && \
    yum install -y python3 python3-dev python3-pip gcc && \
    rm -Rf /var/cache/yum

# Copies requirements.txt file into the container
COPY requirements.txt ./

COPY BertClassifier.py ./
# Installs dependencies found in your requirements.txt file
RUN pip install -r requirements.txt


# Be sure to copy over the function itself!
# Goes last to take advantage of Docker caching.

COPY depression-detection-ml.py ./

# Points to the handler function of your lambda function
CMD ["depression-detection-ml.handler"]