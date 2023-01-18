FROM maven:3.8.6-openjdk-18-slim

# Set the working directory
WORKDIR /app

# Copy the pom and src code
COPY pom.xml .
COPY src/ src/

# Build the application
RUN mvn clean install

# Copy the jar file from target
COPY target/*.jar app.jar

# Run the jar file
ENTRYPOINT ["java","-jar","/app.jar"]


