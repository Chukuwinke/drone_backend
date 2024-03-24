FROM python:3.10

# Set the working directory
WORKDIR /usr/src/application

# Copy the Pipfile and Pipfile.lock to the working directory
COPY Pipfile Pipfile.lock /usr/src/application/

# Install pipenv
RUN pip install pipenv

# Install dependencies from Pipfile.lock
RUN pipenv install --deploy --ignore-pipfile

# Copy the rest of your application code to the container
COPY . /usr/src/application/
#COPY mavproxy.py /usr/src/application/
# Set the entrypoint
CMD ["pipenv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
